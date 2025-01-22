import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-blue-700 mb-6">All Doctors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105 hover:bg-gray-50 hover:border-l-4 hover:border-blue-500"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-md mb-4 transition-transform transform hover:scale-110"
            />
            <div className="flex flex-col">
              <p className="text-xl font-medium text-gray-800 mb-2">{item.name}</p>
              <p className="text-sm text-gray-500 mb-4">{item.speciality}</p>
              <div className="flex items-center space-x-2">
                <input
                  onChange={()=>changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                  className="h-5 w-5 text-blue-500 transition-colors duration-200 hover:bg-blue-100"
                />
                <p className="text-sm text-gray-600">Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorList
