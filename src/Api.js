import AsyncStorage from '@react-native-community/async-storage'
const BASE_API = 'https://api.b7web.com.br/devbarber/api';


export default {
  checkToken: async (token) => {
    const req = await fetch(`${BASE_API}/auth/refresh`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({token})
    });
    // const user = await req.json();
    return await req.json();
  },
  
  signIn: async (email, password) => {
    
    const req = await fetch(`${BASE_API}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({email, password})
    });
    // const user = await req.json();
    return await req.json();
  },

  signUp: async (name, email, password) => {
    const req = await fetch(`${BASE_API}/user`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    });
    // const user = await req.json();
    return await req.json();
  },

  logout: async () => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}/auth/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({token})
    });
    return await req.json();
  },
  
  getBarbers: async (lat=null, long=null, address=null) => {
    console.log(lat, long, address);
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${long}&address=${address}`);
    return await req.json();
  },

  getBarber: async (id) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}/barber/${id}?token=${token}`);
    const json = await req.json();
    return json;
  },
  
  setFavorite: async (barberId) => {
    const token = await AsyncStorage.getItem('token');
    
    const req = await fetch(`${BASE_API}/user/favorite`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({token, barber: barberId})
    });
    const json = await req.json();
    return json;
  },

  setAppointment: async (userId, 
    service, selectedYear, selectedMonth, selectedHour) => {
    const token = await AsyncStorage.getItem('token');
    
    const req = await fetch(`${BASE_API}/user/appointment`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({token, id: userId, 
        service, year: selectedYear, month: selectedMonth, 
        day: selectedDay, hour: selectedHour})
    });
    const json = await req.json();
    return json;
  } 
};