import React, { useState } from "react";
import axios from "axios";
import "./UploadForm.css";

const UploadForm = ({ setUpdateUI }) => {
  const [formData, setFormData] = useState({
    userName: localStorage.getItem('decodedId'),
    photoTitle: "",
    photoDescription: "",
    forSale: false, // Initialize forSale as false
    price: 0, // Initialize price as null or a default value
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { userName, photoTitle, photoDescription, forSale, price, file } = formData;
  
    // Check if any required fields are missing
    if (!userName || !photoTitle || !file) {
      alert("Please fill in all required fields (User Name, Photo Title, and File)");
      return; 
    }
  
    const form = new FormData();
    form.append("phototitle", photoTitle);
    form.append("user", userName);
    form.append("photo", file);
    form.append("photoDescription", photoDescription);
    form.append("forSale", forSale);
    form.append("price", price);
  
    try {
      const res = await axios.post("http://localhost:5000/api/save", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log(res.data);
  
      // Call setUpdateUI after the request is complete
      setUpdateUI(res.data._id);
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className="formContainer">
    <form onSubmit={handleSubmit} className="uploadForm">
      {/* <div>
        <label> User Name:</label>
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
        />
      </div> */}
      <div>
        <label> Photo Title:</label>
        <input
          type="text"
          name="photoTitle"
          value={formData.photoTitle}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label> Photo Description:</label>
        <textarea
          name="photoDescription"
          value={formData.photoDescription}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div>
        <label> For Sale:</label>
        <input
          type="checkbox"
          name="forSale"
          checked={formData.forSale}
          onChange={() => setFormData({ ...formData, forSale: !formData.forSale })}
        />
      </div>
      {formData.forSale && (
        <div>
          <label> Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
      )}
      <div>
        <label> Attach Photo:</label>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
        />
      </div>
      <button type="submit">Upload Photo</button>
    </form>
    </div>
  );
};

export default UploadForm;