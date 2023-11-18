import React from "react";
// import "./PhotoDetailsModal.css"; 

const PhotoDetailsModal = ({ photo, onClose }) => {
  return (
    <div className="photo-details-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Photo Details</h2>
        <div>
          <img
            src={`https://artfusionbackend.onrender.com/uploads/${photo.photo}`}
            alt="grid_image"
          />
        </div>
        <p>Photo Title: {photo.photoTitle}</p> 
        <p>User Name: {photo.userName}</p> 
        <p>Photo Description: {photo.photoDescription}</p>
        <p>For Sale: {photo.forSale ? "Yes" : "No"}</p>
        {photo.forSale && <p>Price: ${photo.price}</p>}
      </div>
    </div>
  );
};

export default PhotoDetailsModal;