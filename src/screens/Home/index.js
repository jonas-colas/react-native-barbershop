import React from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, SearchButton,
  LocationArea, LocationInput, LocationFinder} from './styles';
import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';


export default () => {


  return (
    <Container>
      <Scroller>

        <HeaderArea>
          <HeaderTitle>Find your Barber Shop</HeaderTitle>
          <SearchButton>
            <SearchIcon width="26" height="26" fill="#ffffff" />
          </SearchButton>
        </HeaderArea>

        <LocationArea>
          <LocationInput />
          <LocationFinder>
            <MyLocationIcon width="24" height="24" fill="#ffffff" />
          </LocationFinder>
        </LocationArea>


      </Scroller>
    </Container> 
  );
}