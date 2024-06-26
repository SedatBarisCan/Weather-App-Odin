const apiKey = "982e38fb7542466bb0c145147242406";

async function getWeatherData(location) {
    try {
        // Fetch data from WeatherAPI
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`, {mode: 'cors'})

        // Check if response is okay
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Extract the desired weather information
        const temperature = data.current.temp_c;
        const condition = data.current.condition.text;
        const country = data.location.country;
        const city = data.location.name;
        const humidity = data.current.humidity;

        // Return an object with all the weather information
        return {
            country: country,
            city: city,
            temperature: temperature,
            condition: condition,
            humidity: humidity
        };

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

///////////////////////////////////////


//DOM elements
const country = document.getElementById('location');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const humidity = document.getElementById('humidity');

const locationInput = document.getElementById('location-input');

const getWeatherBtn = document.getElementById('getWeather');
getWeatherBtn.addEventListener('click', () => {
    getWeatherData(locationInput.value).then((data) => {
        // Use the data to show on webpage
        country.textContent = `${data.country}, ${data.city}`;
        temperature.textContent = `${data.temperature}°C`;
        condition.textContent = data.condition;
        humidity.textContent =`${data.humidity}%`;
    })
});