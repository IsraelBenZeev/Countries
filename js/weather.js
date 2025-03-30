const getUrlByCity = (_city) => {
    const api = "a35360f4684fdabfd878fcea54e54abb";
    return `https://api.openweathermap.org/data/2.5/weather?q=${_city}&appid=${api}&units=metric`
}
const requestWether = async (_url) => { // הוספנו async
    try {
        const response = await fetch(_url);
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const data = await response.json();
        console.log("temp: "+data.main.temp);
        console.log("feels like: "+data.main.feels_like);
        console.log("description: "+data.weather[0].description);
        console.log("icon: "+data.weather[0].icon);
        console.log("speed: "+data.wind.speed);
        
        // console.log(`data: ${JSON.stringify(data, null, 2)}`); // לבדיקה
        return {
            temp: data.main.temp,
            fells_like: data.main.feels_like,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            speed: data.wind.speed
        };
    } catch (err) {
        console.error(`Error: ${err}`);
        return null;
    }
}
export {requestWether, getUrlByCity};   


// data: {
//     "coord": {
//       "lon": -3.7396,
//       "lat": 5.2038
//     },
//     "weather": [
//       {
//         "id": 803,
//         "main": "Clouds",
//         "description": "broken clouds",
//         "icon": "04n"
//       }
//     ],
//     "base": "stations",
//     "main": {
//       "temp": 27.99,
//       "feels_like": 33.03,
//       "temp_min": 27.99,
//       "temp_max": 27.99,
//       "pressure": 1010,
//       "humidity": 86,
//       "sea_level": 1010,
//       "grnd_level": 1009
//     },
//     "visibility": 10000,
//     "wind": {
//       "speed": 3.38,
//       "deg": 235,
//       "gust": 5.56
//     },
//     "clouds": {
//       "all": 72
//     },
//     "dt": 1743291556,
//     "sys": {
//       "type": 1,
//       "id": 1162,
//       "country": "CI",
//       "sunrise": 1743228898,
//       "sunset": 1743272650
//     },
//     "timezone": 0,
//     "id": 2288873,
//     "name": "France",
//     "cod": 200
//   }