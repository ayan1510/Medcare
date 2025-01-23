import React, { useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { aToken, getDashData, dashData, cancelAppointment } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="w-full max-w-6xl mx-auto p-5 bg-gray-50 rounded-lg shadow-md">
        <p className="text-2xl font-semibold text-gray-800 mb-5">Dashboard</p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Doctors Card */}
          <div className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-150">
            <img className="w-12 h-12 mr-4" src={assets.doctor_icon} alt="Doctors Icon" />
            <div>
              <p className="text-3xl font-bold text-blue-600">{dashData.doctors}</p>
              <p className="text-gray-600">Doctors</p>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-150">
            <img className="w-12 h-12 mr-4" src={assets.appointments_icon} alt="Appointments Icon" />
            <div>
              <p className="text-3xl font-bold text-green-600">{dashData.appointments}</p>
              <p className="text-gray-600">Appointments</p>
            </div>
          </div>

          {/* Patients Card */}
          <div className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-150">
            <img className="w-12 h-12 mr-4" src={assets.patients_icon} alt="Patients Icon" />
            <div>
              <p className="text-3xl font-bold text-purple-600">{dashData.patients}</p>
              <p className="text-gray-600">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings Section */}
        <div className="mt-8">
          <div className="flex items-center mb-5">
            <img className="w-8 h-8 mr-3" src={assets.list_icon} alt="Latest Bookings Icon" />
            <p className="text-lg font-semibold text-gray-800">Latest Bookings</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-100">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img className="w-12 h-12 rounded-full" src={item.docData.image} alt="Doctor" />
                  <div>
                    <p className="font-medium text-gray-800">{item.docData.name}</p>
                    <p className="text-sm text-gray-500">{item.slotDate}</p>
                  </div>
                </div>
                {item.cancelled ? (
                  <p className="text-red-500 font-medium">Cancelled</p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    src={assets.cancel_icon}
                    alt="Cancel"
                    className="cursor-pointer w-6 h-6 transition-transform duration-150 transform hover:scale-110"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
