import axios from 'axios';

const baseUrl = 'https://restcountries.com/v3.1';

const getAll = async () => {
  try {
    const response = await axios.get(`${baseUrl}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

const filterCountries = (countries, search) => {
  return countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );
};

export default { getAll, filterCountries };
