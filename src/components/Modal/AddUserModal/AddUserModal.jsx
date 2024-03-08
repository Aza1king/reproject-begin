import React, { useState } from "react";
import Modal from "../Modal"; // Импорт компонента модального окна
import { useDispatch } from "react-redux";
import { addUser } from "../../../redux/reducers/userSlice";
import "./AddUserModal.css";

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
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="add-user-modal-content">
        <div className="add-user-modal-header">
          <h2>Add New User</h2>
          <button className="add-user-modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="add-user-modal-body">
          <form onSubmit={handleAddUser} className="add-user-form">
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="add-user-modal-input"
              />
            </label>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="add-user-modal-input"
              />
            </label>
            <label>
              Street:
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
                className="add-user-modal-input"
              />
            </label>
            <label>
              City:
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="add-user-modal-input"
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="add-user-modal-input"
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="add-user-modal-input"
              />
            </label>
            <label>
              Photo:
              <input
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="add-user-modal-input"
              />
            </label>
            <div className="add-user-modal-footer">
              <button type="submit" className="add-user-modal-save-button">
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddUserModal;