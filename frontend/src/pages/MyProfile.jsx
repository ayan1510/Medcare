import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import {assets} from '../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  
  const {userData,setUserData, token, backendUrl, loadUserProfileData} = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false);
  const [image,setImage] = useState(false)

  const updateUserProfileData = async ()=> {
    try {
      
      const formData = new FormData()

      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)

      image && formData.append('image',image)

      const {data} = await axios.post(backendUrl + '/api/user/update-profile',formData,{headers:{token}})

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
        
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  return userData &&  (
    <div className="p-6 max-w-md mx-auto border rounded-md shadow-md">
      {/* Profile Picture */}
      {
        isEdit
        ? <label htmlFor="image">
          <div className='inline-block relative cursor-pointer'>
            <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden/>
        </label>
        : <img className='w-36 rounded' src={userData.image} alt=''/>
      }
      

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
        {
          isEdit
          ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={updateUserProfileData}>Save Information</button>
          : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={()=>setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  );
};

export default MyProfile;
