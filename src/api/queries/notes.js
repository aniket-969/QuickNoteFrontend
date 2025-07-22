import api from "../axiosClient";

const BASE = "note";
 
export const fetchNotes = async (params = {}) => {
  console.log("fetchNotes params:", params);
  const response = await api.get(`${BASE}`, { params }); 
  console.log(response)
  return response?.data; 
};

export const fetchNote = (id) =>
  api.get(`${BASE}/${id}`);


export const createNote = (data) =>
  api.post(`${BASE}`, data);


export const updateNote = (id, data) =>
  api.patch(`${BASE}/${id}`, data);


export const deleteNote = (id) =>
  api.delete(`${BASE}/${id}`);
