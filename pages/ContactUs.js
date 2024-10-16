import React, { useEffect, useState } from "react";
import { getUserDataFromToken } from "../utils/userValidation";
import API from "../api/index";

const contactusdata = async (data) => {
  try {
    const response = await API.contactusdata();
    return response.data;
  } catch (error) {
    throw error;
  }
};

function ContactUs() {
  const userData = getUserDataFromToken()?.result || {};
  const [user, setUser] = useState(userData);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [message, setMessage] = useState("");

  // Handle file upload
  const handleDrop = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFiles([file]);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData()
    formData.append("name", name);
    formData.append("contactNumber", contactNumber);
    formData.append("message", message);

    if (files.length > 0) {
      formData.append("file", files[0]);
    }

    try {
      const data = await contactusdata(formData);
      console.log("Form submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.contactusdata()
        setUser(response.data);
        console.log("User data:", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="min-h-full" style={{ minHeight: "calc(100vh - 347px)" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        <div className="bg-white shadow-md rounded-lg p-6 w-[80%] mx-auto">
          <h2 className="text-3xl font-bold text-gray-600 mb-6 text-center">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md  focus:ring-opacity-55"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Contact Number</label>
              <input
                type="tel"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md  focus:ring-opacity-55"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md  focus:ring-opacity-55"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <div className="border border-gray-400 rounded-lg p-4 text-center cursor-pointer">
                <input
                  type="file"
                  onChange={handleDrop}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer text-gray-600">
                  Drag 'n' drop a file here, or click to select
                </label>
                {files.length > 0 && (
                  <p className="mt-2 text-sm text-gray-500">{files[0].name}</p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-opacity-65"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="w-[80%] mx-auto h-full">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15847.099711513616!2d79.88025908933126!3d6.7972157037928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae245312a967f25%3A0x5cb9723f77681897!2sNational%20Water%20Supply%20%26%20Drainage%20Board%2C%20Training%20Center%20%26%20Central%20Laboratory!5e0!3m2!1sen!2slk!4v1726592107409!5m2!1sen!2slk"
            width="100%"
            height="390"
            className="border-none"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
