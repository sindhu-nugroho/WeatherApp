const API_KEY = '896f550c5a19df95e4918cb4d49b9169'; // Replace with your OpenWeatherMap API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('weather-form');
  const cityInput = document.getElementById('city-input');
  const weatherResult = document.getElementById('weather-result');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
      weatherResult.innerHTML = `<p class="error">Please enter a city name.</p>`;
      return;
    }

    try {
      const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      
      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      weatherResult.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
      `;
    } catch (error) {
      weatherResult.innerHTML = `<p class="error">${error.message}</p>`;
    }
  });
});
