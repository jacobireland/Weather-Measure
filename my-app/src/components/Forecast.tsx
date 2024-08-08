import { fetchWeatherApi } from "openmeteo";
import { useLocation } from "react-router-dom";
import { weatherInfoType } from "../types";
import { time } from "console";
import { useEffect, useState } from "react";

const url = "https://api.open-meteo.com/v1/forecast";

// fetch weather data from API using user-selected location
// code for this function was taken from OpenMeteo Weather Forecast API docs
async function getWeatherData(lat:Number, long:Number):Promise<any> {
    const params = {
        "latitude": lat,
        "longitude": long,
        "hourly": ["temperature_2m", "weather_code", "wind_speed_10m", 
            "uv_index"],
        "temperature_unit": "fahrenheit",
        "wind_speed_unit": "mph",
        "precipitation_unit": "inch",
        "timezone":"auto",
        "past_hours": 1,
        "forecast_hours": 24
    };

    let weatherData

	try {
		const responses = await fetchWeatherApi(url, params);
        const response = responses[0]

		// Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const hourly = response.hourly()!;

		if (!hourly) {
			throw new Error("Hourly data is missing in the response");
		}

		// Helper function to form time ranges
        const range = (start: number, stop: number, step: number) =>
            Array.from({ length: (stop - start) / step }, (_, i) => start + i * 
                       step);

		// Note: The order of weather variables in the URL query and the
        // indices below need to match!
        weatherData = {
            hourly: {
                time: Array.from(range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                    (t) => new Date((t + utcOffsetSeconds) * 1000).getHours()
                )),
                temperature2m: Array.from(hourly.variables(0)!.valuesArray()!), // Convert Float32Array to Array
                weatherCode: Array.from(hourly.variables(1)!.valuesArray()!),
                windSpeed10m: Array.from(hourly.variables(2)!.valuesArray()!),
                uvIndex: Array.from(hourly.variables(3)!.valuesArray()!)
            },

        };

	} catch (error) {
		console.error("Error fetching weather data:", error);
	}

    return(weatherData)
};

const Forecast = () : JSX.Element => {
    // backup values in case routed to page with no location entered
    let name = 'New York City'
    let lat = 40.7127492
    let long = -74.0059945

    // most of time, use inputted location for values
    const loc = useLocation()
    if (loc.state) {
        name = loc.state.location.properties.name
        lat = loc.state.location.properties.coordinates.latitude
        long = loc.state.location.properties.coordinates.longitude
    }

    // State for storing weather data
    const [weatherData, setWeatherData] = useState<any>(null);

    // Fetch weather data when component mounts
    useEffect(() => {
        const fetchData = async () => {
            const data = await getWeatherData(lat, long);
            setWeatherData(data);
        };

        fetchData();
    }, [lat, long]);

    console.log(weatherData)

    return (
        <div>
            <h1>Weather for {name}</h1>
            <h1>Located at: {lat}, {long}</h1>
            <h1>Data is: 
                {weatherData ? 
                    <ul className="flex overflow-x-auto bg-nonerounded-b-md w-[30vh]">
                        {weatherData['hourly']['temperature2m'].map((temp: number, index: number) => (
                            <li key={index} className="text-left text-sm w-full 
                            cursor-pointer hover:text-white 
                            hover:bg-slate-500 px-2 py-1" >
                                {Math.round(temp)}°F
                            </li>
                        ))}
                    </ul>                
            : <p>No data</p>}
            </h1>
        </div>
    )
}
export default Forecast;