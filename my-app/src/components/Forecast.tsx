import { fetchWeatherApi } from "openmeteo";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ForecastCurrent from "./ForecastCurrent";
import { weatherDataType } from "../types";
import ForecastHourly from "./ForecastHourly";

const url = "https://api.open-meteo.com/v1/forecast";

// fetch weather data from API using user-selected location
// code for this function was taken from OpenMeteo Weather Forecast API docs
async function getWeatherData(lat:Number, long:Number):Promise<any> {
    const params = {
        "latitude": lat,
        "longitude": long,
        "hourly": ["temperature_2m", "relative_humidity_2m", 
            "apparent_temperature", "precipitation_probability", 
            "weather_code", "wind_speed_10m", "wind_direction_10m", "uv_index"],
        "temperature_unit": "fahrenheit",
        "wind_speed_unit": "mph",
        "precipitation_unit": "inch",
        "past_hours": 0,
        "forecast_hours": 25
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
                relativeHumidity2m: Array.from(hourly.variables(1)!
                    .valuesArray()!),
                apparentTemperature: Array.from(hourly.variables(2)!
                    .valuesArray()!),
                precipitationProbability: Array.from(hourly.variables(3)!
                    .valuesArray()!),
                weatherCode: Array.from(hourly.variables(4)!.valuesArray()!),
                windSpeed10m: Array.from(hourly.variables(5)!.valuesArray()!),
                windDirection10m: Array.from(hourly.variables(6)!
                    .valuesArray()!),
                uvIndex: Array.from(hourly.variables(7)!.valuesArray()!)
            },
        };

	} catch (error) {
		console.error("Error fetching weather data:", error);
	}
    console.log(weatherData)
    return(weatherData)
};

const Forecast = () : JSX.Element => {
    // backup values in case routed to page with no location entered
    let name = 'New York City'
    let lat = 40.7127492
    let long = -74.0059945
    let address = 'New York City'

    // most of time, use inputted location for values
    const loc = useLocation()
    if (loc.state) {
        name = loc.state.location.properties.name
        lat = loc.state.location.properties.coordinates.latitude
        long = loc.state.location.properties.coordinates.longitude
        address = loc.state.location.properties.full_address
    }

    // State for storing weather data
    const [weatherData, setWeatherData] = useState<weatherDataType>({hourly: {
        time: [],
        temperature2m: [],
        relativeHumidity2m: [],
        apparentTemperature: [],
        precipitationProbability: [],
        weatherCode: [],
        windSpeed10m: [],
        windDirection10m: [],
        uvIndex: []
    }});

    // Fetch weather data when component mounts
    useEffect(() => {
        const fetchData = async () => {
            const data = await getWeatherData(lat, long);
            setWeatherData(data);
        };

        fetchData();
    }, [lat, long]);

    return (
        <div className="flex flex-col w-full max-w-[1000px] h-screen p-[10px]
        items-center border">
            <div className="flex-col w-full mb-[10rem] text-3xl md:text-5xl">
                <h1 className="font-medium">Today's Forecast</h1>
                <h1 className="font-normal ml-2 mt-2 mb-1 md:ml-4 md:mt-4 md:mb-3">{name}</h1>
                <h1 className="text-sm ml-2 md:ml-4 md:text-lg font-light">{address}</h1>
                <ForecastCurrent weatherData={weatherData}/>
            </div>
            <ForecastHourly weatherData={weatherData}/>
        </div>
    )
}
export default Forecast;