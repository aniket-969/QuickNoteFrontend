import api from "../axiosClient";

const BASE = "auth";

export const fetchSession = async () => {
  const response = await api.get(`/${BASE}/session`);
  console.log(response) 
  localStorage.setItem("session", JSON.stringify(response.data?.data));
  return response.data?.data;
};
 
export const register = (data) => {
  console.log(data)

  return api.post(`${BASE}/register`, data);
};

export const login = (data) => {
  console.log(data)
  return
  return api.post(`${BASE}/login`, data);
};

export const logOut = () => {
  return api.post(`${BASE}/logout`);
};
