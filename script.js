const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found'); // Fixed selector
const weather_body = document.querySelector('.weather-body'); // Fixed selector

async function checkWeather(city) {
    const api_key = "0ffc6909c6e4a841bb03c03058c7d1c5";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`; // Added units=metric for Celsius

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        if (weather_data.cod === "404") {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("Error: Location not found");
            return;
        }

        location_not_found.style.display = "none";
        weather_body.style.display = "flex";
        
        // Displaying weather data
        temperature.innerHTML = `${Math.round(weather_data.main.temp)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

        // Display appropriate weather image based on conditions
        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "cloud.png";
                break;
            case 'Clear':
                weather_img.src = "clear.png";
                break;
            case 'Mist':
                weather_img.src = "mist.png";
                break;
            case 'Rain':
                weather_img.src = "rain.png";
                break;
            case 'Snow':
                weather_img.src = "snow.png";
                break;
            default:
                weather_img.src = "default.png"; // Fallback image
                break;
        }

    } catch (error) {
        console.error("Error fetching weather data:", error);
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
