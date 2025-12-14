import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateDetailes = () => {
  const loadedUser = useLoaderData();
  const navigate = useNavigate();
  console.log(loadedUser);

  const handelUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log(name, email);

    const updatedUser = { name, email };

    fetch(`http://localhost:5000/users/${loadedUser._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          alert("User updated successfully");
          navigate("/users");
        }
      });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-base-200 via-base-100 to-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-base-100 rounded-2xl shadow-2xl border border-base-300 overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-info to-primary p-6 text-center">
            <h1 className="text-2xl font-bold text-white">Update User</h1>
            <p className="text-white/80 mt-1">Edit user information</p>
          </div>

          {/* Form */}
          <form onSubmit={handelUpdate} className="p-6 pt-4 space-y-5">
            {/* Name Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-info"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Full Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={loadedUser?.name}
                placeholder="Enter your name"
                className="input input-bordered w-full focus:input-info transition-all duration-300 bg-base-200/50 hover:bg-base-200"
                required
              />
            </div>

            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-info"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Email Address
                </span>
              </label>
              <input
                type="email"
                name="email"
                defaultValue={loadedUser?.email}
                placeholder="Enter your email"
                className="input input-bordered w-full focus:input-info transition-all duration-300 bg-base-200/50 hover:bg-base-200"
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => navigate("/users")}
                className="btn btn-outline flex-1 gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-info flex-1 gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Update
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="px-6 pb-6">
            <div className="divider text-xs text-base-content/50">
              <p title={`${loadedUser?._id}`}>Editing User ID: ...{loadedUser?._id?.slice(-6)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDetailes;
