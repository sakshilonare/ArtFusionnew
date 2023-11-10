import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import axios from "axios";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UploadForm from "./components/UploadForm"; // Import the UploadForm component
import Dashboard from "./components/Dashboard"; 
import Tutorials from "./components/Tutorials";
import UserHomePage from './components/UserHomePage';
import ServerTutorials from "./components/ServerTutorials";
import { Doodle } from './components/Doodle';
import Paint2 from './components/Paint2';
import UserProfile from './components/UserProfile';

function App() {
  const [photos, setPhotos] = useState([]);
  const [updateUI, setUpdateUI] = useState("");
  //const [isUploadFormVisible, setUploadFormVisibility] = useState(false);

  useEffect(() => {
    // Fetch photos data when the component mounts or when updateUI changes
    axios
      .get("http://localhost:5000/api/get")
      .then((res) => {
        console.log(res.data);
        setPhotos(res.data);
      })
      .catch((err) => console.log(err));
  }, [updateUI]); // Only update photos when updateUI changes

  // const toggleFormVisibility = () => {
  //   setUploadFormVisibility(!isUploadFormVisible);
  // };

  const handleUploadSuccess = (newPhotoData) => {
    // Update the photos state with the newly uploaded photo data
    setPhotos([...photos, newPhotoData]);

    // You can also update the UI by changing updateUI if needed
    setUpdateUI(newPhotoData);
  };

  const userIsLoggedIn = !!localStorage.getItem('artToken');
  console.log("userLoggedin:",userIsLoggedIn);
  useEffect(() => {
    const userIsLoggedIn = !!localStorage.getItem('artToken');
    
  },[]);

  return (
    <>
    <Routes>
        {userIsLoggedIn?(<Route
            exact path="/"
            element={<UserHomePage />} // Show Login component when the user is not logged in
          />): (<Route exact path="/" element={
            <>
              <Header /> 
              <Home />
            </>
          } />) }
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tutorial" element={<><Header /> <Tutorials /></>} />
        <Route path="/serverTut" element={<><Header /> <ServerTutorials/> </>} />
        <Route path="/UserHomePage" element={<UserHomePage  />} />
        {userIsLoggedIn ? (
        <Route
          path="/dashboard"
          element={<Dashboard photos={photos} handleUploadSuccess={handleUploadSuccess} />}
        />

      ) : (
        <Route
          path="/dashboard"
          element={<Login />} 
        />
      )}
      {userIsLoggedIn ? (
        <Route
          path="/doodle"
          element={<Doodle />}
        />
        
      ) : (
        <Route
          path="/doodle"
          element={<Login />} 
        />
      )}
      {/* {userIsLoggedIn ? (
        <Route
          path="/userProf"
          element={<UserProfile />}
        />

      ) : (
        <Route
          path="/userProf"
          element={<Login />} 
        />
      )} */}
      <Route path="/profile/:userId" element={<UserProfile />} />
      <Route path="/paintboard" element={<Paint2  />} />
      </Routes>
      {/* <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tutorial" element={<Tutorials />} />
        <Route path="/serverTut" element={<ServerTutorials />} />
        <Route path="/dashboard" element={<Dashboard photos={photos} handleUploadSuccess={handleUploadSuccess}> </Dashboard>} />
        <Route path="/doodle" element={<Doodle/>} />
        <Route path="/paintboard" element={<Paint2/>} />

      </Routes> */}
      
    </>
  );
}

export default App;