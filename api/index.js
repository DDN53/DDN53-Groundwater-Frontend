import axios from "axios";

const config = () => {
  return {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
};

const API = axios.create({
  //baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:5000",
  baseURL: "http://localhost:5000",
  //baseURL: "http://10.0.19.207:5000",
});
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getEmployee = async (data) => {
  const response = await API.get("api/users/getemployee");
  return response.data;
};

const signin = async (loginData) => {
  console.log(loginData);
  const response = await API.post("api/users/login", loginData);
  return response.data;
};

const signup = async (data) => {
  const response = await API.post("api/users/register", data);
  return response.data;
};

const sendVerificationCode = async (data) => {
  const response = await API.post(
    "api/users/sendVerificationCode",
    data,
    config()
  );
  return response.data;
};

const submitVerficationCode = async (data) => {
  const response = await API.post(
    "api/users/submitVerificationCode",
    data,
    config()
  );
  return response.data;
};

const changePassword = async (data) => {
  const response = await API.post("api/users/resetPassword", data);
  return response.data;
};

const getProfile = async () => {
  const response = await API.get("api/users/profile");
  return response.data;
};
const viewallwells = async () => {
  const response = await API.get("api/users/viewallwells");
  return response.data;
};

const viewwell = async (newWellNo) => {
  const response = await API.get(
    `api/users/viewwell?newWellNo=${newWellNo}`,
    config()
  );
  return response.data;
};

const addwell = async (data) => {
  const response = await API.post("api/users/addwell", data);
  return response.data;
};

const editwell = async (data) => {
  const response = await API.post("api/users/editwell", data);
  return response.data;
};

const removewell = async (data) => {
  const response = await API.post("api/users/removewell", data);
  return response.data;
};

const viewallusers = async () => {
  const response = await API.get("api/users/viewallusers");
  return response.data;
};
const edituser = async (data) => {
  const response = await API.post("api/users/edituser", data);
  return response.data;
};

const deleteuser = async (userName) => {
  const response = await API.post(`api/users/deleteuser/${userName}`);
  return response.data;
};

const addmonthlydata = async (data) => {
  const response = await API.post("api/users/addmonthlydata", data);
  return response.data;
};

const viewallmonthlydata = async () => {
  const response = await API.get("api/users/viewallmonthlydata");
  return response.data;
};

const viewmonthlydata = async (mid) => {
  const response = await API.get(
    `api/users/viewmonthlydata?mid=${mid}`,
    config()
  );
  return response.data;
};

const editmonthlydata = async (data) => {
  const response = await API.post("api/users/editmonthlydata", data);
  return response.data;
};

const removemonthlydata = async (data) => {
  const response = await API.post(
    "api/users/removemonthlydata",
    data,
    config()
  );
  return response.data;
};
const contactusdata = async (data) => {
  
  const response = await API.post("api/users/contact", data);
  return response.data;

};
const adddrill = async (data) => {
  const response = await API.post("api/users/saveDrillLogs", data);
  return response.data;
};
const viewdrills = async () => 
  API.get("api/users/viewdrilllogs")
    .then((response) => response.data || { error: "No data found" })
    .catch(() => ({ error: "Failed to fetch drill logs" }));


const viewdrill = async (Did) => {
      try {
        return (await API.get(`/api/users/drill/${Did}`, config())).data;
      } catch (error) {
        console.error('Error fetching drill details:', error);
        throw new Error('Could not fetch drill details.');
      }
    };

const api = {
  signin,
  signup,
  submitVerficationCode,
  sendVerificationCode,
  changePassword,
  viewallwells,
  addwell,
  viewwell,
  removewell,
  editwell,
  viewallusers,
  edituser,
  addmonthlydata,
  removemonthlydata,
  editmonthlydata,
  viewmonthlydata,
  viewallmonthlydata,
  deleteuser,
  contactusdata,
  adddrill,
  viewdrills,
  viewdrill
};
export default api;
