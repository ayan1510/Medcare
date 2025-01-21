import React, { useState } from 'react';
import { assets } from '../assets/assets';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: 'Edward Vincent',
    image: assets.profile_pic,
    email: 'richardjameswap@gmail.com',
    phone: '+1 123 456 7890',
    address: {
      line1: '57th Cross, Richmond',
      line2: 'Circle, Church Road, London',
    },
    gender: 'Male',
    dob: '2000-01-20',
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="p-6 max-w-md mx-auto border rounded-md shadow-md">
      {/* Profile Picture */}
      <div className="flex flex-col items-center">
        <img
          className="rounded-full w-32 h-32 object-cover mb-4"
          src={userData.image}
          alt="Profile"
        />
      </div>

      {/* Name */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Name:</label>
        {isEdit ? (
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p>{userData.name}</p>
        )}
      </div>

      <hr className="my-4" />

      {/* Contact Information */}
      <div className="mb-4">
        <p className="font-semibold mb-2">Contact Information</p>
        <div>
          <p>Email:</p>
          <p>{userData.email}</p>

          <p className="mt-2">Phone:</p>
          {isEdit ? (
            <input
              type="text"
              className="border p-2 w-full rounded"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p>{userData.phone}</p>
          )}

          <p className="mt-2">Address:</p>
          {isEdit ? (
            <div>
              <input
                className="border p-2 w-full rounded mb-2"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userData.address.line1}
                type="text"
              />
              <input
                className="border p-2 w-full rounded"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={userData.address.line2}
                type="text"
              />
            </div>
          ) : (
            <p>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      <hr className="my-4" />

      {/* Basic Information */}
      <div className="mb-4">
        <p className="font-semibold mb-2">Basic Information</p>
        <div>
          <p>Gender:</p>
          {isEdit ? (
            <select
              className="border p-2 rounded"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}

          <p className="mt-2">Birthday:</p>
          {isEdit ? (
            <input
              className="border p-2 rounded"
              type="date"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              value={userData.dob}
            />
          ) : (
            <p>{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Edit/Save Button */}
      <div className="mt-4">
        <button
          className={`py-2 px-4 rounded text-white ${
            isEdit ? 'bg-green-500' : 'bg-blue-500'
          }`}
          onClick={() => setIsEdit((prev) => !prev)}
        >
          {isEdit ? 'Save Information' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
