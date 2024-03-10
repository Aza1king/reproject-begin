import React, { useState } from "react";
import Modal from "../Modal";
import "./UserEditModal.css";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserEditModal = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    address: {
      street: user.address.street,
      city: user.address.city
    },
    phone: user.phone,
    photo: user.photo,
    description: user.description
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value
      }
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave({
      id: user.id,
      ...formData
    });
    onCancel();
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
          <form onSubmit={handleSave} className="user-edit-form">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="user-edit-modal-input"
              />
            </label>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="user-edit-modal-input"
              />
            </label>
            <label>
              Street:
              <input
                type="text"
                name="street"
                value={formData.address.street}
                onChange={handleAddressChange}
                required
                className="user-edit-modal-input"
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={formData.address.city}
                onChange={handleAddressChange}
                required
                className="user-edit-modal-input"
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="user-edit-modal-input"
              />
            </label>
            <label>
              Photo:
              <input
                type="text"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
                className="user-edit-modal-input"
              />
            </label>
            <div className="user-edit-modal-footer">
              <button className="user-edit-modal-save-button">
                <FontAwesomeIcon icon={faUserPen} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default UserEditModal;
