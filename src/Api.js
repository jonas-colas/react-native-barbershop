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
  
};