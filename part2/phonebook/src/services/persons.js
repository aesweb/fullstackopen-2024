import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = async () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = async (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data);
};

const remove = async (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

export default { getAll, create, update, remove };
