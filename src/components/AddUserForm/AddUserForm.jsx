import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, searchUserByName } from "../../redux/reducers/userSlice";
import "./AddUserForm.css";

const AddUserForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");

  const handleAddUser = (e) => {
    e.preventDefault();
    dispatch(
      addUser({
        username,
        name,
        address: { street, city },
        phone,
        description,
        photo,
      })
    );
    setUsername("");
    setName("");
    setStreet("");
    setCity("");
    setPhone("");
    setDescription("");
    setPhoto("");
  };

  const handleSearchUser = (e) => {
    e.preventDefault();
    dispatch(searchUserByName(name));
    setName("");
  };

  return (
    <div className="add-user-form-container">
      <form onSubmit={handleAddUser} className="add-user-form">
        <div className="form-row">
          <label className="form-label">
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
            />
          </label>
  
          <label className="form-label">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </label>
        </div>

        <div className="form-row">
          <label className="form-label">
            Street:
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="form-input"
            />
          </label>
  
          <label className="form-label">
            City:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="form-input"
            />
          </label>
        </div>

        <div className="form-row">
          <label className="form-label">
            Phone:
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
            />
          </label>
          
          <label className="form-label">
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input"
            />
          </label>
        </div>

        <div className="form-row">
          <label className="form-label">
            Photo:
            <input
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="form-input"
            />
          </label>
        </div>
        
        <button type="submit" className="submit-button">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
