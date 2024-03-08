import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  searchUserByName,
  deleteUserById,
  updateUserById,
} from "../../redux/reducers/userSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { AddUserModal, UserEditModal } from "../../components/Modal";
import "./UsersList.css";

const UsersList = () => {
  const dispatch = useDispatch();
  const [showAddUserModal, setShowAddUserModal] = useState(false);

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
        <button className="button" onClick={() => setShowAddUserModal(true)}>
          Добавить пользователя
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>UserName</th>
            <th>Адрес</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan="6" className="loading">
                Загрузка...
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan="6" className="error">
                Ошибка: {error}
              </td>
            </tr>
          )}
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <img src={user.photo} alt={user.name} className="user-photo" />
              </td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>
                {user.address.street}, {user.address.city}
              </td>
              <td>{user.phone}</td>
              <td className="user-actions">
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
                    <Link
                      to={`/user/${user.id}`}
                      className="button button-link"
                    >
                      <FontAwesomeIcon icon={faCircleInfo} />
                    </Link>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddUserModal && (
        <AddUserModal onClose={() => setShowAddUserModal(false)} />
      )}
    </div>
  );
};

export default UsersList;
