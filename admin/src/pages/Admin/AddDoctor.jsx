import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const addDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!docImg) {
        return toast.error("Please upload a doctor image.");
    }

    // Add client-side password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; // At least 8 characters, 1 letter, 1 number, 1 special character
    if (!passwordRegex.test(password)) {
        return toast.error(
            "Password must be at least 8 characters long, include a letter, a number, and a special character."
        );
    }

    try {
        const formData = new FormData();
        formData.append("image", docImg);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("experience", experience);
        formData.append("fees", Number(fees));
        formData.append("about", about);
        formData.append("speciality", speciality);
        formData.append("degree", degree);
        formData.append(
            "address",
            JSON.stringify({ line1: address1, line2: address2 })
        );

        const { data } = await axios.post(
            `${backendUrl}/api/admin/add-doctor`,
            formData,
            { headers: { aToken } }
        );

        if (data.success) {
            toast.success(data.message);
            setDocImg(null);
            setName("");
            setPassword("");
            setEmail("");
            setAddress1("");
            setAddress2("");
            setDegree("");
            setAbout("");
            setFees("");
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Something went wrong");
    }
};


  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <p className="text-2xl font-semibold text-gray-800 mb-6">Add Doctor</p>

      <div className="flex flex-col gap-6">
        {/* Upload Section */}
        <div className="flex flex-col items-center gap-2">
          <label
            htmlFor="doc-img"
            className="cursor-pointer border-2 border-dashed border-gray-300 p-6 rounded-lg text-center hover:bg-gray-100"
          >
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Doctor"
              className="w-16 h-16 mx-auto mb-3"
            />
            <p className="text-gray-600">
              Upload doctor <br /> picture
            </p>
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
        </div>

        {/* Doctor Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 font-medium mb-1">Doctor Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              required
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <p className="text-gray-700 font-medium mb-1">Doctor Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              required
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <p className="text-gray-700 font-medium mb-1">Doctor Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <p className="text-gray-700 font-medium mb-1">Experience</p>
            <select
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              required
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option value={`${i + 1} Year`} key={i}>
                  {i + 1} Year
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="text-gray-700 font-medium mb-1">Fees</p>
            <input
              onChange={(e) => setFees(e.target.value)}
              value={fees}
              type="number"
              placeholder="Fees"
              required
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <p className="text-gray-700 font-medium mb-1">Speciality</p>
            <select
              onChange={(e) => setSpeciality(e.target.value)}
              value={speciality}
              required
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          <div>
            <p className="text-gray-700 font-medium mb-1">Degree</p>
            <input
              onChange={(e) => setDegree(e.target.value)}
              value={degree}
              type="text"
              placeholder="Education"
              required
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <p className="text-gray-700 font-medium mb-1">Address</p>
            <input
              onChange={(e) => setAddress1(e.target.value)}
              value={address1}
              type="text"
              placeholder="Address 1"
              required
              className="w-full border border-gray-300 p-2 rounded-md mb-2"
            />
            <input
              onChange={(e) => setAddress2(e.target.value)}
              value={address2}
              type="text"
              placeholder="Address 2"
              required
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
        </div>

        {/* About Doctor */}
        <div>
          <p className="text-gray-700 font-medium mb-1">About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            placeholder="Write about doctor"
            rows={5}
            required
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary text-white py-2 px-6 rounded-md text-lg font-semibold hover:bg-primary-dark"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default addDoctor;
