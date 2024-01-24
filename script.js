// script.js

const api = "c33e0f56dbdb8ed0b16b203b84eae392";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherContainer = document.querySelector(".weather");
const errorContainer = document.querySelector(".error");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${api}`);
        if (!response.ok) {
            throw new Error(`Error fetching weather data. Status: ${response.status}`);
        }

        const data = await response.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        // Set weather icon based on weather conditions
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "/images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "/images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "/images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "/images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "/images/mist.png";
        }

        // Display the weather container and hide the error container
        weatherContainer.style.display = "block";
        errorContainer.style.display = "none";
    } catch (error) {
        console.error("Error:", error);

        // Handle the error - for now, you can clear the weather information and display the error container
        document.querySelector(".city").innerHTML = "";
        document.querySelector(".temp").innerHTML = "";
        document.querySelector(".humidity").innerHTML = "";
        document.querySelector(".wind").innerHTML = "";
        weatherIcon.src = "";

        // Display the error container and hide the weather container
        errorContainer.style.display = "block";
        weatherContainer.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Add an event listener for "keypress" event on the input
searchBox.addEventListener("keypress", (event) => {
    // Check if the pressed key is "Enter" (key code 13)
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
