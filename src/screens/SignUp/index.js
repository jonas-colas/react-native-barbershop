import React, { useState, useContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { UserContext } from "../../contexts/UserContext";
import { Container, InputArea, CustomButton, CustomButtonText,
  SignMessageButton, SignMessageButtonText, SignMessageButtonTextBold } from "./styles";
import BarberLogo from "../../assets/barber.svg";
import SignInput from "../../components/SignInput";
import PersonIcon from "../../assets/person.svg";
import EmailIcon from "../../assets/email.svg";
import LockIcon from "../../assets/lock.svg";
import { useNavigation } from "@react-navigation/native";
import Api from "../../Api";


export default () => {
  const {dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();

  const [nameField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleRegister = async () => {
    if(nameField === '' || emailField === '' || passwordField === ''){
      alert('Please fill the form');
    }else{
      let user = await Api.signUp(nameField, emailField, passwordField);
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
        alert(`Error: ${user.error}` );
      }
    }
  }
  
  const goToSignIn = () => {
    navigation.reset({
      routes: [{name: 'SignIn'}]
    });
  }

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        <SignInput IconSvg={PersonIcon} placeholder="Enter your full name"
          value={nameField} onChangeText={t => setNameField(t)} />

        <SignInput IconSvg={EmailIcon} placeholder="Enter your email"
          value={emailField} onChangeText={t => setEmailField(t)} />

        <SignInput password={true} IconSvg={LockIcon} placeholder="Enter your password"
          value={passwordField} onChangeText={t => setPasswordField(t)} />
        
        <CustomButton onPress={handleRegister} >
          <CustomButtonText>REGISTER</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={goToSignIn} >
        <SignMessageButtonText>Already have an account?</SignMessageButtonText>
        <SignMessageButtonTextBold>Login</SignMessageButtonTextBold>
      </SignMessageButton>
      
    </Container>
  )
}
