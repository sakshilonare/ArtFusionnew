import {GoogleLogout} from '@leecheuk/react-google-login';
import { useNavigate } from 'react-router-dom';

const  CLIENT_ID='965232707450-80aq2nftg7ea2iusqjo2kqqv0q6pl57k.apps.googleusercontent.com';

function Glogout(){
    const navigate = useNavigate();
   const onsuccess=(res)=>{
    localStorage.removeItem('artToken');
    localStorage.removeItem('decodedId');
    localStorage.removeItem('OAuth token');
    console.log("Log out success");
    navigate("/");
    window.location.reload();


   }
   
  
   return(
    <div id="GsignoutBtn">
        <GoogleLogout
        clientId={CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={onsuccess}
        
        />

    </div>
   )
}

export default Glogout