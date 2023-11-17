import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideNavBar from "./Header/SideNavBar";
import TopNavBar from "./TopNavBar";
import './UserProfile.css';
import  {jwtDecode}  from 'jwt-decode';
import axios from "axios";

const UserProfile = () => {
  const token = localStorage.getItem('artToken');
  const decoded = jwtDecode(token);
  const [userName, setUserName] = useState('');
    const { userId } = useParams();
    const storedProfilePicture = localStorage.getItem(`profilePicture_${userId}`); // Check if a profile picture is stored in localStorage
    const originalPic='https://www.nailseatowncouncil.gov.uk/wp-content/uploads/blank-profile-picture-973460_1280.jpg';
   
  
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [profilePicture, setProfilePicture] = useState(storedProfilePicture || originalPic);
  const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});

  console.log("userId from useParams:", userId);
 

  useEffect(() => {
    // Fetch user data using your API endpoint
   fetch(`/userdetails/${userId}`, {
          method: 'GET',
        })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  }, []);

  
  
  useEffect(() => {
    // Fetch photos data when the component mounts or when updateUI changes
    axios
      .get("http://localhost:5000/api/get")
      .then((res) => {
        console.log(res.data);
        setPhotos(res.data);
      })
      .catch((err) => console.log(err));
  }, []); 

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result);
        localStorage.setItem(`profilePicture_${userId}`, reader.result); // Store the image data in local storage
      };
      reader.readAsDataURL(file);
    }
  };
  const updateProfile = () => {
    axios.put(`http://localhost:5000/api/updateUser/${userId}`, editedUser)
    .then((response) => {
      // Handle a successful response here
      console.log('User information updated:', response.data);
      window.alert('Updated');
      setIsEditing(false); // Exit editing mode
      setUser(response.data);
    })
    .catch((error) => {
      // Handle errors
      console.error('Error updating user information:', error);
      // You might want to provide some user feedback about the error
    });
};
const handleInputChange = (e) => {
  // Update the editedUser with the changed field
  const { name, value } = e.target;
  setEditedUser({ ...editedUser, [name]: value });
};
  console.log("profile user",user);
  const filteredPhotos = photos.filter(photo => photo.user === userId);
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
    <div className="header-container">
      <img
        src="https://img.freepik.com/free-photo/vibrant-colors-flow-abstract-wave-pattern-generated-by-ai_188544-9781.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699142400&semt=ais"
        alt=""
        className="header-image"
      />
      <div className="header">
        <h1 id='headname' className="main-heading ">{user.name}</h1>
      </div>
    </div>
  <div className="body">
      <img
        src={profilePicture}
        alt="Hugh Jackman"
        className="body-image"
      />
      <div className="body-action-button u-flex-center">
        <label htmlFor="profilePictureInput">
          <svg
            fill="#ffffff"
            height="28"
            viewBox="2 0 20 20"
            width="28"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </label>
        <input
          type="file"
          id="profilePictureInput"
          accept="image/*"
          onChange={handleProfilePictureChange}
          style={{ display: 'none' }}
        />
      </div>
      <div className="u-clearfix"></div>
      <div className="body-info">
      <form>
                        <p>
                            <label>Name:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={editedUser.name}
                                    onChange={handleInputChange}
                                />
                            ) : (
                              <input
                              type="text"
                              name="name"
                              value={user.name}
                          />
                            )}
                        </p>
                        <p>
                            <label>Email:</label>
                            
                              <input
                              type="text"
                              name="mail"
                              value={user.email}
                          />
                            
                           
                        </p>
                        <p>
                            <label>Phone number:</label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    name="Phone_no"
                                    value={editedUser.Phone_no}
                                    onChange={handleInputChange}
                                />
                            ) : (
                              <input
                              type="tel"
                              name="Phone_no"
                              value={user.Phone_no}
                          />
                            )}
                        </p>
                        <p>About Me:{user.User_desc}</p>
                        
                    </form>
                    <div className="btn-container">
                        {userId === localStorage.getItem('decodedId') && (
                        <div>
                            {isEditing ? (
                                <button onClick={updateProfile} className="sbtn" >Save</button> 
                            ) : (
                                <button onClick={() => setIsEditing(true)} className="sbtn">Edit</button>
                            )}
                        </div>

                    )}
                    </div>
                    
                </div>
      <div className="Posts">
      <div className="card u-clearfix">
          <span className="card-heading">My Master Pieces:</span>
          <div className="grid">
        {filteredPhotos.map(({ photo, _id, phototitle, photoDescription, forSale, price, user }) => (
          <div key={_id} className="grid__item1">
            
              <img
                src={`/uploads/${photo}`}
                alt="grid_image"
                className="grid__image" 
              />
              <div id="pictitle">
                {phototitle}
              </div>
        
          </div>
        ))}
      </div>
          
        </div>
        </div>
      
    </div>
  </div>
      
      

  );
};

export default UserProfile;