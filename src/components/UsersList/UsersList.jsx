import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  searchUserByName,
  deleteUserById,
  updateUserById,
} from "../../redux/reducers/userSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom"; 
import "./UsersList.css";
import UserEditModal from "../Modal/UserEditModal";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [searchName, setSearchName] = useState("");
  const [editedUser, setEditedUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editStreet, setEditStreet] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editPhone, setEditPhone] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSearch = () => {
    if (searchName.trim() !== "") {
      dispatch(searchUserByName(searchName.trim()));
    } else {
      dispatch(fetchUsers());
    }
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUserById(userId));
  };

  const handleEditUser = (user) => {
    setEditedUser(user);
    setEditName(user.name);
    setEditUsername(user.username);
    setEditStreet(user.address.street);
    setEditCity(user.address.city);
    setEditPhone(user.phone);
  };

  const handleSaveUser = (updatedUserData) => {
    dispatch(updateUserById({ userId: updatedUserData.id, updatedUserData }));
    setEditedUser(null);
  };

  const handleCancelEdit = () => {
    setEditedUser(null);
  };

  return (
    <div className="users-list-container">
      <div className="search-container">
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Поиск по имени..."
          className="search-input"
        />
        <button onClick={handleSearch} className="button">
          Поиск
        </button>
      </div>
      <div className="category">
        <h3>Photo</h3>
        <h3>Name</h3>
        <h3>UerName</h3>
        <h3>Адрес</h3>
        <h3 className="cp">Phone</h3>
        <h3></h3>
      </div>
      <div className="user-list-container">
        {loading && <p className="loading">Загрузка...</p>}
        {error && <p className="error">Ошибка: {error}</p>}
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-item">
              <div className="user-info">
                <img src={user.photo} alt={user.name} className="user-photo" />
              </div>
              <div className="user-info">
                {user.name}
              </div>
              <div className="user-info">{user.username}</div>
              <div className="user-info">
                {user.address.street}, {user.address.city}
              </div>
              <div className="user-phone">{user.phone}</div>

              <div className="user-edit">
                {editedUser && editedUser.id === user.id ? (
                  <UserEditModal
                    user={editedUser}
                    onSave={handleSaveUser}
                    onCancel={handleCancelEdit}
                  />
                ) : (
                  <>
                    <button
                      className="button"
                      onClick={() => handleEditUser(user)}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    
                    <button
                      className="button"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                    
                    <Link to={`/user/${user.id}`} className="button button-link">
                      <FontAwesomeIcon icon={faCircleInfo} />
                    </Link>
                  </>
                )}
              </div>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UsersList;
