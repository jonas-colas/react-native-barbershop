import React, { useState, useContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { UserContext } from "../../contexts/UserContext";
import { Container, InputArea, CustomButton, CustomButtonText,
  SignMessageButton, SignMessageButtonText, 
  SignMessageButtonTextBold } from "./styles";
import BarberLogo from "../../assets/barber.svg";
import SignInput from "../../components/SignInput";
import EmailIcon from "../../assets/email.svg";
import LockIcon from "../../assets/lock.svg";
import { useNavigation } from "@react-navigation/native";
import Api from "../../Api";



export default () => {
  const {dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();

  // email: suporte@b7web.com.br
  // password: 1234

  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleLogin = async () => {
    if(emailField === '' || passwordField === ''){
      alert('Please enter your email address and password');
    }else{
      let user = await Api.signIn(emailField, passwordField);
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
        alert('Incorrect email or password');
      }
    }
  }
  
  const goToSignUp = () => {
    navigation.reset({
      routes: [{name: 'SignUp'}]
    });
  }

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        <SignInput IconSvg={EmailIcon} placeholder="Enter your email"
          value={emailField} onChangeText={t => setEmailField(t)} />

        <SignInput password={true} IconSvg={LockIcon} placeholder="Enter your password"
          value={passwordField} onChangeText={t => setPasswordField(t)} />
        
        <CustomButton onPress={handleLogin} >
          <CustomButtonText>LOGIN</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={goToSignUp} >
        <SignMessageButtonText>Don't have an account?</SignMessageButtonText>
        <SignMessageButtonTextBold>Register</SignMessageButtonTextBold>
      </SignMessageButton>
      
    </Container>
  )
}
