import React, { useState } from "react";
import { NavLink, useLoaderData } from "react-router-dom";

const Users = () => {
  const loadusers = useLoaderData();
  console.log(loadusers);
  const [users, setUsers] = useState(loadusers);

  const handleDeleteUser = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          alert("User deleted successfully");
          const remainingUsers = users.filter((user) => user._id !== id);
          setUsers(remainingUsers);
        }
      });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        {users.length} Users Found
      </h1>

      {users.map((user) => (
        <div
          key={user._id}
          style={{
            background: "#f9f9f9",
            padding: "15px 20px",
            borderRadius: "10px",
            marginBottom: "15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          {/* User Info */}
          <div>
            <h3 style={{ margin: "0", fontSize: "18px", fontWeight: "600" }}>
              {user.name}
            </h3>
            <p style={{ margin: "3px 0 0", color: "#666" }}>{user.email}</p>
          </div>

          {/* Buttons */}
          <div>
            <button
              style={{
                marginRight: "10px",
                padding: "6px 12px",
                background: "#4caf50",
                color: "white",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              <NavLink to={`/update/${user._id}`}>
              Update
              </NavLink>
            </button>

            <button
              onClick={() => handleDeleteUser(user._id)}
              style={{
                padding: "6px 12px",
                background: "#f44336",
                color: "white",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
