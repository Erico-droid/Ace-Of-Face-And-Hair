import source from './proxy.json'
import axios from 'axios'

function generateSessionId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }


  const handleUserSession = async () => {
    let sessionId = localStorage.getItem('sessionID');
    const url =  `${source.proxy}/general_setting/handle_user_session/`

    if (!sessionId) {
        sessionId = generateSessionId(16); 
        localStorage.setItem('sessionID', sessionId);			
    }
    
    try {
        const response = await axios.get(`${source.proxy}/general_setting/get_csrf_token/`);
        const token = response.data.csrfToken;
        const data = {
            user_session: sessionId,
            dark_mode: false
        }
        const headers = {
            'X-CSRFToken': token,
            'Content-Type': 'application/json',
        };		
        let resp = await axios.post(url, data, { headers });
        const receivedData = JSON.parse(resp.data)
        
        return receivedData;
    }
    catch(error) {
        console.error(error)
    }
}
  

  export default handleUserSession