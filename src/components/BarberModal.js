import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import ExpandIcon from '../assets/expand.svg';
import NavPrevIcon from '../assets/nav_prev.svg';
import NavNextIcon from '../assets/nav_next.svg';

const Modal = styled.Modal``;

const ModalArea = styled.View`
  flex: 1;
  background-color: rgb(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

const ModalBody = styled.View`
  background-color: #83d6e3;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  min-height: 300px;
  // padding: 10px 20px 40px, 20px;
  padding-top: 10px;
  padding-left: 20px;
  padding-bottom: 40px;
  padding-right: 20px;
`;

const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`;

const ModalItem = styled.View`
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 10px;
`;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 20px;
  margin-right: 15px;
`;

const UserName = styled.Text`
  color: #000000;
  font-size: 18px;
  font-weight: bold;
`;

const ServiceInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ServiceName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000000;
`;

const ServicePrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000000;
`;

const FinishButton= styled.TouchableOpacity`
  background-color: #268596;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const FinishButtonText= styled.Text`
  color: #ffffff;
  font-size: 17px;
  font-weight: bold;
`;

const DateInfo= styled.View`
  flex-direction: row;
`;

const DatePrevArea= styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;

const DateTitleArea= styled.View`
  width: 140px;
  justify-content: center;
  align-items: center;
`;

const DateTitle= styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #000000;
`;

const DateNextArea= styled.TouchableOpacity`
  flex: 1;
  align-items: flex-start;
`;


const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 
  'August', 'September', 'October', 'November', 'December'
];

const days = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

export default ({show, setShow, user, service}) => {
  const navigation = useNavigation();

  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState(null);
  const [listDays, setListDays] = useState([]);
  const [listHours, setListHours] = useState([]);


  useEffect(() => {
    let today = new Date();
    setSelectedYear( today.getFullYear() );
    setSelectedMonth( today.getMonth() );
    setSelectedDay( today.getDate() );
  }, []);

  const handleCloseButton = () => {
    setShow(false);
  }

  const handleFinishClick = () => {
    // setShow(false);
  }

  const handleLeftDateClick = () => {
    let mountDate = new Date(selectedYear, selectedMonth, 1);
    mountDate.setMonth( mountDate.getMonth() - 1);
    setSelectedYear( mountDate.getFullYear() );
    setSelectedMonth( mountDate.getMonth() );
    setSelectedDay(1);
  }

  const handleRightDateClick = () => {
    let mountDate = new Date(selectedYear, selectedMonth, 1)
    mountDate.setMonth( mountDate.getMonth() + 1);
    setSelectedYear( mountDate.getFullYear() );
    setSelectedMonth( mountDate.getMonth() );
    setSelectedDay(1);
  }

  return (
    <Modal transparent={true} visible={show} animationType="slide" >
      <ModalArea>
        <ModalBody>
          <CloseButton onPress={handleCloseButton}>
            <ExpandIcon width="40" height="40" fill="#000000" />
          </CloseButton>

          <ModalItem>
            <UserInfo>
              <UserAvatar source={{uri: user.avatar}} />
              <UserName>{user.name}</UserName>
            </UserInfo>
          </ModalItem>

          {service !== null && 
            <ModalItem>
              <ServiceInfo>
                <ServiceName>{user.services[service].name}</ServiceName>
                <ServicePrice>$ {user.services[service].price.toFixed(2)}</ServicePrice>
              </ServiceInfo>
            </ModalItem>
          }

          <ModalItem>
            <DateInfo>
              <DatePrevArea onPress={handleLeftDateClick}>
                <NavPrevIcon width="35" height="35" fill="#000000" />
              </DatePrevArea>

              <DateTitleArea>
                <DateTitle>{months[selectedMonth]} {selectedYear}</DateTitle>
              </DateTitleArea>

              <DateNextArea onPress={handleRightDateClick}>
                <NavNextIcon width="35" height="35" fill="#000000" />
              </DateNextArea>
            </DateInfo>
          </ModalItem>

          <FinishButton onPress={handleFinishClick}>
            <FinishButtonText>Finish scheduling</FinishButtonText>
          </FinishButton>

        </ModalBody>
      </ModalArea>

    </Modal>
  )
}