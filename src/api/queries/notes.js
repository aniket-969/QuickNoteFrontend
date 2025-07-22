import api from "../axiosClient";

const BASE = "note";
 
export const fetchNotes = async (params = {}) => {
  console.log("fetchNotes params:", params);
  const response = await api.get(`${BASE}`, { params }); 
  console.log(response)
  return response?.data; 
};

export const fetchNote = async (id) => {
  const { data } = await api.get(`${BASE}/${id}`);
  return data;
};


export const createNote = (data) =>{
  console.log(data)
  
  return api.post(`${BASE}`, data);
}

export const updateNote = (id, data)=> {
   console.log(id,data)
  return api.patch(`${BASE}/${id}`, data);
}

export const deleteNote = (id) =>{
   console.log(id)
  return api.delete(`${BASE}/${id}`);
}