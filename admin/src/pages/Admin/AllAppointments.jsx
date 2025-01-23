import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl mx-auto p-5 bg-gray-50 rounded-lg shadow-md">
      <p className="mb-5 text-2xl font-semibold text-gray-800">All Appointments</p>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b bg-gray-100 text-gray-700 font-medium">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Appointments */}
        {appointments.map((item, index) => (
          <div
            className="flex flex-wrap sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-50 transition-colors duration-150"
            key={index}
          >
            <p className="max-sm:hidden font-semibold">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img className="w-8 h-8 rounded-full border border-gray-300" src={item.userData.image} alt="Patient" />
              <p className="truncate">{item.userData.name}</p>
            </div>
            <p>{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <img className="w-8 h-8 rounded-full border border-gray-300" src={item.docData.image} alt="Doctor" />
              <p className="truncate">{item.docData.name}</p>
            </div>
            <p className="font-medium">{currency}{item.amount}</p>
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
  );
};

export default AllAppointments;
