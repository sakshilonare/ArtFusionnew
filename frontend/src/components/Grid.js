import React, { useState, useEffect, useMemo } from "react";
import './Grid.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Grid = ({ photos }) => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [userName, setUserName] = useState("");
  const [userContact, setUserContact] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({  }); // Clone props to initialize the form fields

  const memoizedSelectedPhoto = useMemo(() => selectedPhoto, [selectedPhoto]);
  const enterEditMode = () => {
    setIsEditing(true);
    setEditedData({ ...memoizedSelectedPhoto }); // Initialize edited data with the selected photo
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

 

  const cancelEditing = () => {
    setIsEditing(false);
    // Reset edited data to the original props when canceling
    setEditedData({ ...selectedPhoto });
  };

  const saveChanges = async () => {
    try {
      // Send a PUT request to update the photo details
      const response = await fetch(`/api/update/${selectedPhoto._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData), // Send the updated data
      });
  
      if (response.status === 200) {
        console.log('Photo details updated successfully');
        // You can add UI updates or notifications for success
      } else {
        console.error('Error updating photo details');
        // Handle errors or show error notifications
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network or other errors
    }
    setIsEditing(false);

    window.location.reload();
  };




  // Function to fetch user details by userId
  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`/userdetails/${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUserName(data.name); 
      setUserContact(data.email);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const deletePic = async (photoId) => {
    try {
      const response = await fetch(`/api/delete/${photoId}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        // Photo deleted successfully
        console.log('Photo deleted successfully');
        window.location.reload();
      } else if (response.status === 404) {
        // Photo not found
        console.log('Photo not found');
      } else {
        // Handle other error cases
        console.log('Error deleting photo');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    if (selectedPhoto) {
      // Fetch user details when the modal is shown
      fetchUserDetails(selectedPhoto.user);
    }
  }, [selectedPhoto]);

  useEffect(() => {
    // Update userName when the selectedPhoto changes
    if (selectedPhoto) {
      fetchUserDetails(selectedPhoto.user);
    }
  }, [selectedPhoto]);

  function MyVerticallyCenteredModal(props) {
    if (!props.photo) {
      return null;
    }

    const saveImageToDrive = async (photoId) => {
      try {
        const response = await fetch(`/api/save-to-drive/${photoId}`, {
          method: 'POST',
        });
  
        if (response.status === 200) {
          console.log('Image saved to Google Drive');
          window.alert('Image saved to Google Drive!!');
          // You can add additional handling or UI updates here
        } else {
          console.error('Error saving image to Google Drive');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };


    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header >
        <Button onClick={props.onHide} id="backbtn">Back</Button>
        </Modal.Header>
        <Modal.Body className="ModalBody">
          <div className="Modalimg">
            <img
              src={`/uploads/${props.photo}`}
              alt="grid_image"
              className="grid__image" 
            />
            <p id="savebtn">
              <button onClick={() => saveImageToDrive(props._id)}>Save to Google Drive</button>
            </p>
          </div>
          <div className="Modalinfo">
          <p id="ptitle">
            {isEditing ? (
              <input
                type="text"
                name="phototitle"
                value={editedData.phototitle}
                onChange={handleFieldChange}
              />
            ) : (
              selectedPhoto.phototitle
            )}
          </p>
          <p id="creator"> -By {userName}</p>
          <p id="desc">
            {isEditing ? (
              <input
                type="text"
                name="photoDescription"
                value={editedData.photoDescription}
                onChange={handleFieldChange}
              />
            ) : (
              `Description: ${selectedPhoto.photoDescription}`
            )}
          </p>
            <p id="desc">Contact: {userContact}</p>
            
            <p id="price">
            {props.forSale ? (
              isEditing ? (
                <input
                  type="text"
                  name="price"
                  value={editedData.price}
                  onChange={handleFieldChange}
                />
              ) : (
                `Price: ${selectedPhoto.price}`
              )
            ) : (
              <p>Not for Sale</p>
            )}
          </p>
          <p id="delbtn">
            {props.user === localStorage.getItem('decodedId') ? (
              <>
              <button onClick={() => deletePic(props._id)}>Delete</button>
              <button onClick={enterEditMode}>Update</button>
            {isEditing && (
              <button onClick={saveChanges}>Save</button>
            )}
            {isEditing && (
              <button onClick={cancelEditing}>Cancel</button>
            )}
            </>
            ) : (
              <button>Cant Delete</button>
            )}
            
          </p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <h1 className="heading"><br />Where Artistic Visions Converge: The Gallery Awaits</h1>
      <p id="headingtext">Explore a diverse tapestry of creations that spark conversations, 
        kindle emotions, and celebrate the essence of artistic collaboration.
         We invite you to immerse yourself in this gallery of dreams, where each masterpiece is a 
         testament to the power of shared inspiration and creative fusion</p>
      <br />
      <div className="grid">
        {photos.map(({ photo, _id, phototitle, photoDescription, forSale, price, user }) => (
          <div key={_id} className="grid__item">
            <Button className="custom-button" onClick={() => {
              setSelectedPhoto({
                _id,
                photo,
                phototitle,
                photoDescription,
                forSale,
                price,
                user
              });
              setModalShow(true);
            }}>
              <img
                src={`/uploads/${photo}`}
                alt="grid_image"
                className="grid__image" 
              />
              <div id="pictitle1">
                {phototitle}
                {forSale && (
                  <p id="sale">For Sale</p>
                  )}
              </div>
            </Button>
          </div>
        ))}
      </div>
      <MyVerticallyCenteredModal
        {...selectedPhoto}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default Grid;