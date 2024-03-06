import React, { useEffect, useState } from "react";
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
    setEditName("");
    setEditUsername("");
    setEditStreet("");
    setEditCity("");
    setEditPhone("");
  };

  const handleCancelEdit = () => {
    setEditedUser(null);
    setEditName("");
    setEditUsername("");
    setEditStreet("");
    setEditCity("");
    setEditPhone("");
  };

  const handleSaveUser = () => {
    const updatedUserData = {
      id: editedUser.id,
      name: editName,
      username: editUsername,
      address: {
        street: editStreet,
        city: editCity,
      },
      phone: editPhone,
    };
    dispatch(updateUserById({ userId: editedUser.id, updatedUserData }));
    setEditedUser(null);
    setEditName("");
    setEditUsername("");
    setEditStreet("");
    setEditCity("");
    setEditPhone("");
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
                {user.name}
              </div>
              <div className="user-info">{user.username}</div>
              <div className="user-info">
                {user.address.street}, {user.address.city}
              </div>
              <div className="user-phone">{user.phone}</div>

              <div className="user-edit">
                {editedUser && editedUser.id === user.id ? (
                  <>
                    <br />
                    <input
                      className="edit-input"
                      type="text"
                      placeholder="Имя"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                    <input
                      className="edit-input"
                      placeholder="Имя пользователя"
                      type="text"
                      value={editUsername}
                      onChange={(e) => setEditUsername(e.target.value)}
                    />
                    <input
                      className="edit-input"
                      placeholder="Улица"
                      type="text"
                      value={editStreet}
                      onChange={(e) => setEditStreet(e.target.value)}
                    />
                    <input
                      className="edit-input"
                      placeholder="Город"
                      type="text"
                      value={editCity}
                      onChange={(e) => setEditCity(e.target.value)}
                    />
                    <input
                      className="edit-input"
                      placeholder="Телефон"
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                    />
                    <button className="button" onClick={handleSaveUser}>
                      Сохранить
                    </button>
                    <button className="button" onClick={handleCancelEdit}>
                      Отмена
                    </button>
                  </>
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
