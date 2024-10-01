const apiKey = '23c209edfc86a59f6f0dd5c93c7535d1';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const cityCoordinates = {
    "Bangkok": { lat: 13.7509, lon: 100.5431 },
    "Berlin": { lat: 52.5118, lon: 13.4082 },
    "Tokyo": { lat: 35.6762, lon: 139.6503 },
    "Sydney": { lat: -33.8688, lon: 151.2093 },
    "New York": { lat: 40.7112, lon: -74.0373 }
};

async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('กรุณาเลือกเมือง');
        return;
    }

    const { lat, lon } = cityCoordinates[city];
    
    try {
        
        const weatherResponse = await fetch(`${apiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        const weatherData = await weatherResponse.json();
        
        if (weatherData.cod !== 200) {
            document.getElementById('weather-info').innerText = `ข้อผิดพลาด: ${weatherData.message}`;
            return;
        }

        const { main, wind } = weatherData;
        document.getElementById('weather-info').innerHTML = `
            <h2>สภาพอากาศใน ${city}</h2>
            <p>อุณหภูมิ: ${main.temp} °C</p>
            <p>ความชื้น: ${main.humidity} %</p>
            <p>ความเร็วลม: ${wind.speed} m/s</p>
        `;
    } catch (error) {
        document.getElementById('weather-info').innerText = `ข้อผิดพลาด: ${error.message}`;
    }
}
