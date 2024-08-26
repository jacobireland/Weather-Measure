import { fetchWeatherApi } from "openmeteo";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ForecastCurrent from "./ForecastCurrent";
import { weatherDataType } from "../types";
import ForecastHourly from "./ForecastHourly";
import { getWeatherIcon } from "./utils";

const url = "https://api.open-meteo.com/v1/forecast";

// fetch weather data from API using user-selected location
// code for this function was taken from OpenMeteo Weather Forecast API docs

/*
                temperature2m: Array.from(hourly.variables(0)!.valuesArray()!), 
                // ^^ Convert Float32Array to Array
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
                */

async function getWeatherData(lat:Number, long:Number):Promise<any> {

    const url = "https://api.open-meteo.com/v1/forecast";

    const params = {
        "latitude": 40.7127492,
        "longitude": -74.0059945,
        "hourly": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation_probability", "weather_code", "wind_speed_10m", "wind_direction_10m", "uv_index"],
        "temperature_unit": "fahrenheit",
        "wind_speed_unit": "mph",
        "precipitation_unit": "inch",
        "timezone": "auto",
        "forecast_days": 1,
        "forecast_hours": 24
    }

    let weatherData

    try {
        const responses = await fetchWeatherApi(url, params);
        
        // Helper function to form time ranges
        const range = (start: number, stop: number, step: number) =>
            Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
        
        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];
                
        const hourly = response.hourly()!;

        console.log(hourly.time())
        console.log(hourly.timeEnd())
        
        // Note: The order of weather variables in the URL query and the indices below need to match!
        // Generate the weather data as before
        weatherData = {
            hourly: {
                time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                    (t) => new Date((t) * 1000).getHours()
                ),
                temperature2m: hourly.variables(0)!.valuesArray()!,
                relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
                apparentTemperature: hourly.variables(2)!.valuesArray()!,
                precipitationProbability: hourly.variables(3)!.valuesArray()!,
                weatherCode: hourly.variables(4)!.valuesArray()!,
                windSpeed10m: hourly.variables(5)!.valuesArray()!,
                windDirection10m: hourly.variables(6)!.valuesArray()!,
                uvIndex: hourly.variables(7)!.valuesArray()!,
            },
        };

    }
    catch {
        console.log('Error fetching weather data')
    }
    console.log('weatherData: ', weatherData)
    return(weatherData)
};

const Forecast = () : JSX.Element => {
    // backup values in case routed to page with no location entered
    let name = 'New York City'
    let lat = 40.7127492
    let long = -74.0059945
    let address = 'New York City'

    console.log(lat, long)

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
        <div className="relative flex flex-col w-full max-w-[1000px] h-full
        text-center sm:text-left text-white">
            <div className="flex-col w-full mb-5 mt-4 text-3xl md:text-4xl
             bg-black bg-opacity-15 px-4 pb-7 pt-2 rounded-lg">
                <div className="flex flex-row">
                    <div className="w-full">
                        <h1 className="font-light pb-2 sm:pb-0">Current Forecast
                        </h1>
                        <h1 className="font-medium ml-2 mt-2 mb-1 md:ml-4 
                        md:mt-4 md:mb-3">{name}</h1>
                        <h1 className="text-sm ml-2 md:ml-4 md:text-lg 
                        font-light">{address}</h1>
                    </div>
                    <div className="absolute mt-3 top-4 right-4 opacity-40">
                        {getWeatherIcon(weatherData['hourly']['weatherCode'][0],
                             150)}
                    </div>
                </div>
                <ForecastCurrent weatherData={weatherData}/>
            </div>
            <div className="flex flex-col w-full mb-10 text-3xl md:text-4xl
            pl-4 pr-4">
                <h1 className="font-light mb-5 sm:pb-0">Hourly Weather</h1>
                <ForecastHourly weatherData={weatherData}/>
            </div>
        </div>
    )
}
export default Forecast;