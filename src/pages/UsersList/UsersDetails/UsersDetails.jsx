import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserById } from "../../../api/api";

import "./UsersDetails.css";
import { Loader } from "../../../components/Modal";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserById(id);
        setUser(user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <Loader loading={loading} />;
  }

  if (!user) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>Failed to fetch user data</p>
        <Link to="/users" className="back-button">
          Назад
        </Link>
      </div>
    );
  }

  return (
    <div className="user-details-container">
      <h2>User Details</h2>
      <Link to="/users" className="back-button">
        Назад
      </Link>
      <div className="user-details-info">
        <img src={user.photo} alt={user.name} className="user-details-photo" />
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Street:</strong> {user.address.street}
        </p>
        <p>
          <strong>City:</strong> {user.address.city}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Description:</strong> {user.description}
        </p>
      </div>
    </div>
  );
};

export default UserDetails;
