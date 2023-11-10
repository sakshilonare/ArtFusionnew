import { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import userProfileImage from '../imgs/userProfile1.png';
import  {jwtDecode}  from 'jwt-decode';
import Glogout from './Glogout';
import { useLocation, useRoutes } from 'react-router-dom';
import "./TopNavBar.css"

const TopNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [OAuthUser, setOAuthUser] = useState(false); 
  const handleLogout = () => {
    localStorage.removeItem('artToken');
    localStorage.removeItem('decodedId');
    localStorage.removeItem('profilePicture_${uId}');
    // Reload the page to ensure the route change takes effect
    window.location.reload();
  };

  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check if a token exists in localStorage
    const token = localStorage.getItem('artToken');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("decoded:", decoded);
        const uId = decoded.id;
        localStorage.setItem('decodedId',uId);
        console.log("uId", uId);
        fetch(`http://localhost:5000/userdetails/${uId}`, {
          method: 'GET',
        })
          .then(res => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.json();
          })
          .then(data => {
            console.log(data);
            console.log("username: ", data.name);
            setUserName(data.name);
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []); // Empty dependency array ensures this effect runs once after initial render


  // Use a separate useEffect to set alt and title attributes when userName changes
  useEffect(() => {
    // You can update the alt and title attributes here
    document.getElementById("profile-image").alt = userName;
    document.getElementById("profile-image").title = userName;
  }, [userName]);

  useEffect(() => {
    // Check if an OAuth token exists in localStorage
    
    if (!!localStorage.getItem('OAuth token')) {
      setOAuthUser(true); // Set to true if an OAuth token exists
      // The rest of your code remains unchanged
      // ...
    }
  }, []);

  return (
    <div id="topnav">
    <Navbar bg="light" className='navbar2'>
      <Navbar.Brand href="/UserHomePage">ArtFusion</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className='ml-auto'>
          <Nav.Link><NavLink to="/UserHomePage">Home</NavLink></Nav.Link>
          <Nav.Link><NavLink to="/about">About</NavLink></Nav.Link>
          {OAuthUser ? (
            // Render the GLogout component when OAuth token is present
            <Glogout />
          ) : (
            // Render the "Logout" button when OAuth token is not present
            <Nav.Link onClick={handleLogout}><NavLink to="/">Logout</NavLink></Nav.Link>
          )}
          {/* <Nav.Link><NavLink to="/tutorial">Tutorials</NavLink></Nav.Link>
          <Nav.Link><NavLink to="/serverTut">Tutorials 2</NavLink></Nav.Link> */}
          <Nav.Link> <NavLink to={`/profile/${localStorage.getItem('decodedId')}`}><img
            src={userProfileImage}
            id="profile-image"
            alt={userName || null}
            title={userName || null}
            height="30"
          /></NavLink></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
};

export default TopNavBar;
