import React, { useEffect, useContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { UserContext } from "../../contexts/UserContext";
import { Container, LoadingIcon } from "./styles";
import BarberLogo from "../../assets/barber.svg";
import { useNavigation } from "@react-navigation/native";
import Api from "../../Api";

export default () => {
  const {dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if(token) {
      //validate token
      let user = await Api.checkToken(token);
      if(user.token){
        await AsyncStorage.setItem('token', user.token);
        userDispatch({
          type: 'setAvatar',
          payload: {
            avatar: user.data.avatar,
          }
        });

        navigation.reset({
          routes: [{name: 'MainTab'}]
        });
      }else{
        navigation.navigate('SignIn');  
      }
    }else{
      navigation.navigate('SignIn');
    }
  }
  
  useEffect(() => {
    checkToken();
  }, []);

  return(
    <Container>
      <BarberLogo width="100%" height="160" />
      <LoadingIcon size="large" color="#FFFFFF" />
    </Container>
  );
}