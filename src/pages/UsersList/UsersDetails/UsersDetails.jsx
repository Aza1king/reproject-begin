import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./UsersDetails.css";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return (
      <div className="loading-container">
        <div className="loader"></div> 
        Loading...
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
