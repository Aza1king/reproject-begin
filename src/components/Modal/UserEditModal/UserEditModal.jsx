import React, { useState } from "react";
import Modal from "../Modal";
import "./UserEditModal.css";

const UserEditModal = ({ user, onSave, onCancel }) => {
  const [editName, setEditName] = useState(user.name);
  const [editUsername, setEditUsername] = useState(user.username);
  const [editStreet, setEditStreet] = useState(user.address.street);
  const [editCity, setEditCity] = useState(user.address.city);
  const [editPhone, setEditPhone] = useState(user.phone);
  const [editPhoto, setEditPhoto] = useState(user.photo);

  const handleSave = () => {
    onSave({
      id: user.id,
      name: editName,
      username: editUsername,
      address: {
        street: editStreet,
        city: editCity,
      },
      phone: editPhone,
      photo: editPhoto,
    });
  };

  return (
    <Modal onCancel={onCancel} className="user-edit-modal-container">
      <div className="user-edit-modal-content">
        <div className="user-edit-modal-header">
          <h2>Edit User</h2>
          <button className="user-edit-modal-close-button" onClick={onCancel}>
            &times;
          </button>
        </div>
        <div className="user-edit-modal-body">
          <label>
            
            Name:
            <input
              type="text"
              placeholder="Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="user-edit-modal-input"
            />
          </label>
          <label>
            
            Username:
            <input
              type="text"
              placeholder="Username"
              value={editUsername}
              onChange={(e) => setEditUsername(e.target.value)}
              className="user-edit-modal-input"
            />
          </label>
          <label>
         
            Street:
            <input
              type="text"
              placeholder="Street"
              value={editStreet}
              onChange={(e) => setEditStreet(e.target.value)}
              className="user-edit-modal-input"
            />
          </label>
          <label>
            
            City:
            <input
              type="text"
              placeholder="City"
              value={editCity}
              onChange={(e) => setEditCity(e.target.value)}
              className="user-edit-modal-input"
            />
          </label>
          <label>
           
            Phone:
            <input
              type="text"
              placeholder="Phone"
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
              className="user-edit-modal-input"
            />
          </label>
          <label>
            
            Photo:
            <input
              type="text"
              placeholder="Photo"
              value={editPhoto}
              onChange={(e) => setEditPhoto(e.target.value)}
              className="user-edit-modal-input"
            />
          </label>
        </div>
        <div className="user-edit-modal-footer">
         
          <button className="user-edit-modal-save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserEditModal;
