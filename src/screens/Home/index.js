import React, {useState, useEffect} from 'react';
import { useNavigation } from "@react-navigation/native";
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import { Platform, RefreshControl } from 'react-native';
import { Container, Scroller, HeaderArea, HeaderTitle, SearchButton,
  LocationArea, LocationInput, LocationFinder, LoadingIcon,
  ListArea } from './styles';
import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';
import Api from '../../Api';
import BarberItem from '../../components/BarberItem';



export default () => {
  const navigation = useNavigation();

  const [locationText, setLocationText] = useState('');
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleLocationFinder = async () => {
    setCoords(null);
    let result = await request(
      Platform.OS === 'ios' ? 
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE 
        :
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );

    if(result === 'granted'){
      setLoading(true);
      setLocationText();
      setList([]);

      Geolocation.getCurrentPosition(info => {
        setCoords(info.coords);
        getBarbers();
      });
    }
  }

  const getBarbers = async () => {
    setLoading(true);
    setList([]);
    
    let lat = null;
    let long = null;

    if(coords){
      lat = coords.latitude;
      long = coords.longitude;
    }

    let barbers = await Api.getBarbers(lat, long, locationText);
    // console.log(barbers);
    if(barbers.error) {
      alert(`Error: ${barbers.error}`);
    }else{
      if(barbers.loc) {
        setLocationText(barbers.loc);
      }
      setList(barbers.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    getBarbers();
  }, []);

  const onRefresh = () => {
    setRefreshing(false);
    getBarbers();
  }

  const handleLocationSearch = () => {
    setCoords({})
    getBarbers();
  }

  return (
    <Container>
      <Scroller refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>

        <HeaderArea>
          <HeaderTitle numberOfLines={2} >Find your favorite Barber Shop</HeaderTitle>
          <SearchButton onPress={() => navigation.navigate('Search')}>
            <SearchIcon width="26" height="26" fill="#ffffff" />
          </SearchButton>
        </HeaderArea>

        <LocationArea>
          <LocationInput placeholder="Where are you ?"
            placeholderTextColor="#ffffff" value={locationText} 
            onChangeText={t => setLocationText(t)} 
            onEndEditing={handleLocationSearch}/>
          
          <LocationFinder onPress={handleLocationFinder}>
            <MyLocationIcon width="24" height="24" fill="#ffffff" />
          </LocationFinder>
        </LocationArea>

        { loading && <LoadingIcon size="large" color="#ffffff" /> }

        <ListArea>
          { list?.map((item, i) => (
              <BarberItem key={i} data={item} />
            ) 
          )}
        </ListArea>

      </Scroller>
    </Container> 
  );
}