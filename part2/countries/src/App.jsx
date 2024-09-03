import { useState, useEffect } from 'react';
import countriesService from './services/countries';
import weatherService from './services/weather';

function WeatherData({ capital }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService
      .getWeather(capital)
      .then(setWeather)
      .catch((error) => console.error('Error fetching weather:', error));
  }, [capital]);

  if (!weather) return <p>Loading weather data...</p>;

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Wind: {weather.wind.speed} m/s</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
    </div>
  );
}

function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countriesService
      .getAll()
      .then(setCountries)
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  const filteredCountries = countriesService.filterCountries(countries, search);

  const renderCountryDetails = (country) => (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area} km²</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        style={{ width: '150px' }}
      />
      <WeatherData capital={country.capital[0]} />
    </div>
  );

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a country"
      />
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        renderCountryDetails(filteredCountries[0])
      ) : (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => handleShowCountry(country)}>Show</button>
            </li>
          ))}
        </ul>
      )}
      {selectedCountry && renderCountryDetails(selectedCountry)}
    </div>
  );
}

export default App;
