import React, { useState } from "react";
import Modal from "../Modal";
import { useDispatch } from "react-redux";
import { addUser } from "../../../redux/reducers/userSlice";
import "./AddUserModal.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const AddUserModal = ({ onClose }) => {
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
    const defaultPhoto =
      "https://upload.wikimedia.org/wikipedia/commons/c/cc/Guy%2C_Ava_Lauren_at_XRCO_Awards_2007_1_%28cropped%29.jpg";

    const photoValue = photo ? photo : defaultPhoto;

    dispatch(
      addUser({
        username,
        name,
        address: { street, city },
        phone,
        description,
        photo: photoValue,
      })
    );
    setUsername("");
    setName("");
    setStreet("");
    setCity("");
    setPhone("");
    setDescription("");
    setPhoto("");
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="add-user-modal-content">
        <div className="add-user-modal-header">
          <h2>Add New Student</h2>
          <button className="add-user-modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="add-user-modal-body">
          <form onSubmit={handleAddUser} className="add-user-form">
            <label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="add-user-modal-input"
                placeholder="Name"
              />
            </label>
            <label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="add-user-modal-input"
                placeholder="UserName"
              />
            </label>
            <label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
                className="add-user-modal-input"
                placeholder="Street"
              />
            </label>
            <label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="add-user-modal-input"
                placeholder="City"
              />
            </label>
            <label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="add-user-modal-input"
                placeholder="Phone"
              />
            </label>
            <label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="add-user-modal-input"
                placeholder="Description"
                required
              />
            </label>
            <label>
              <input
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="add-user-modal-input"
                placeholder="Photo https://example.com"
              />
            </label>
            <div className="add-user-modal-footer">
              <button type="submit" className="add-user-modal-save-button">
                <FontAwesomeIcon icon={faUserPlus} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddUserModal;
