import { GoogleLogin } from '@leecheuk/react-google-login';
import { useNavigate } from 'react-router-dom';

const  CLIENT_ID='965232707450-80aq2nftg7ea2iusqjo2kqqv0q6pl57k.apps.googleusercontent.com';

function Glogin() {
  const navigate = useNavigate();

  const onGoogleLoginSuccess = async (res) => {
    const idToken = res.tokenId;
    localStorage.setItem('OAuth token',idToken);

    try {
      const response = await fetch('https://artfusionbackend.onrender.com/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('artToken', data.token);
        navigate('/UserHomePage');
      } else {
        console.error('Google login failed but why?');
      }
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  }

  const onGoogleLoginFailure = (res) => {
    console.error('Google login failed:', res.error);
  }

  return (
    <div id="GsigninBtn">
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={onGoogleLoginSuccess}
        onFailure={onGoogleLoginFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
}

export default Glogin;