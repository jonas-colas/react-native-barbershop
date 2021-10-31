import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Api from '../../Api';
import Swiper from 'react-native-swiper';
import { Container, Scroller, SwipeItem, SwipeImage, 
  SwipeDot, SwipeDotActive, FakeSwiper, PageBody, 
  UserInfoArea, UserAvatar, UserInfo, UserInfoName,
  UserFavButton, LoadingIcon, ServiceArea, 
  ServicesTitle, ServiceItem, ServiceInfo,
  ServiceName, ServicePrice, ServiceChooseButton,
  ServiceChooseBtnText, TestimonialArea, 
 TestimonialItem, TestimonialInfo, TestimonialName,
 TestimonialBody, BackButton } from './styles';
import Stars from '../../components/Stars'
import FavoriteIcon from '../../assets/favorite.svg';
import FavoriteFullIcon from '../../assets/favorite_full.svg';
import BackIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';


export default () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [userInfo, setUserInfo] = useState({
    id: route.params.id,
    avatar: route.params.avatar,
    name: route.params.name,
    stars: route.params.stars
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const getBarberInfo = async () => {
    setIsLoading(true);
    let json = await Api.getBarber(userInfo.id);
    if(json.error !== "") {
      alert("Error: " + json.error);
    }else{
      setUserInfo(json.data);
      setIsFavorited(json.data.favorited);
    }
    setIsLoading(false);
  }

  const handleBackButton = () => {
    navigation.goBack();
  }

  const handleFavClick = () => {
    setIsFavorited(!isFavorited);
    Api.setFavorite(userInfo.id);
  }

  useEffect(() => {
    getBarberInfo();
  }, []);

  return (
    <Container>
      <Scroller>
       
        {userInfo.photos && userInfo.photos.length > 0 ?
          <Swiper style={{height: 240}} dot={<SwipeDot />}
            activeDot={<SwipeDotActive />} autoplay={true}
            paginationStyle={{top: 15, right: 15, bottom: null, left: null}}
          >
           { userInfo.photos.map((item, i) => (
             <SwipeItem key={i}>
               <SwipeImage source={{uri: item.url}} resizeMode="cover" />
             </SwipeItem>
            ))
           } 
          </Swiper>
          :
          <FakeSwiper></FakeSwiper>
        }
        <PageBody>
          
          <UserInfoArea>
            <UserAvatar source={{uri: userInfo.avatar}} />
            <UserInfo>
              <UserInfoName>{userInfo.name}</UserInfoName>
              <Stars stars={userInfo.stars} showNumber={true} />
            </UserInfo>
            <UserFavButton onPress={handleFavClick}>
              {isFavorited ? 
                  <FavoriteFullIcon width="24" height="24" fill="#ff0000" />
                : 
                  <FavoriteIcon width="24" height="24" fill="#ff0000" />
              }
            </UserFavButton>
          </UserInfoArea>
          
          {isLoading && <LoadingIcon size="large" color="#000000" />}

          {userInfo.services &&
            <ServiceArea>
              <ServicesTitle>List of Services</ServicesTitle>

              { userInfo.services.map((serv, i) => (
                  <ServiceItem key={i}>
                    <ServiceInfo key={i}>
                      <ServiceName>{serv.name}</ServiceName>
                      <ServicePrice>$ {serv.price}</ServicePrice>
                    </ServiceInfo>
                    <ServiceChooseButton>
                      <ServiceChooseBtnText>Schedule</ServiceChooseBtnText>
                    </ServiceChooseButton>
                  </ServiceItem>
                ))
              }
            </ServiceArea>
          }

          { userInfo.testimonials && userInfo.testimonials.length > 0 && 
            <TestimonialArea>
              <Swiper style={{height: 110}} showsPagination={false} 
                showsButtons={true} 
                prevButton={<NavPrevIcon width="35" height="35" fill="#000000" />} 
                nextButton={<NavNextIcon width="35" height="35" fill="#000000" />}
              >
                { userInfo.testimonials.map((item, i) => (
                    <TestimonialItem key={i}>
                      <TestimonialInfo>
                        <TestimonialName>{item.name}</TestimonialName>
                        <Stars stars={item.rate} showNumber={false} />
                      </TestimonialInfo>
                      <TestimonialBody>{item.body}</TestimonialBody>
                    </TestimonialItem>
                  ))
                }
              </Swiper>
            </TestimonialArea>
          }

        </PageBody>
      </Scroller>

      <BackButton onPress={handleBackButton}>
        <BackIcon width="44" height="44" fill="#ffffff" />
      </BackButton>
    </Container> 
  );
}