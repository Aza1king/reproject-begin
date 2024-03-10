import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "../../redux/reducers/userSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTrashAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { AddUserModal, UserEditModal, Loader } from "../../components/Modal";

import "./UsersList.css";

const UsersList = () => {
  const dispatch = useDispatch();
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const { users, loading, error } = useSelector((state) => state.users);
  const [searchName, setSearchName] = useState("");
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    dispatch(userActions.fetchUsers());
  }, [dispatch]);

  const filteredUsers = searchName
    ? users.filter((user) =>
        user.name.toLowerCase().includes(searchName.toLowerCase())
      )
    : users;

  const handleDeleteUser = (userId) => {
    dispatch(userActions.deleteUserById(userId));
  };

  const handleEditUser = (user) => {
    setEditedUser(user);
  };

  const handleSaveUser = (updatedUserData) => {
    dispatch(
      userActions.updateUserById({
        userId: updatedUserData.id,
        updatedUserData,
      })
    );
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
          placeholder="Search by name..."
          className="search-input"
        />
        
        <button className="button" onClick={() => setShowAddUserModal(true)}>
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Username</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <>
              
            </>
          )}
          {error && (
            <tr>
              <td colSpan="6" className="error">
                Error: {error}
              </td>
            </tr>
          )}
          {filteredUsers.map((user) => (
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
      
      {/* Показываем Loader, если данные загружаются */}
      {loading && <Loader />}
      
      {/* Отображаем модальное окно добавления пользователя */}
      {showAddUserModal && (
        <AddUserModal onClose={() => setShowAddUserModal(false)} />
      )}
    </div>
  );
};

export default UsersList;
