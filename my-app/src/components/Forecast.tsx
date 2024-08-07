import { fetchWeatherApi } from "openmeteo";
import { useLocation } from "react-router-dom";

const url = "https://api.open-meteo.com/v1/forecast";

async function getWeatherData(lat:Number, long:Number) {
    const params = {
        "latitude": lat,
        "longitude": long,
        "hourly": "temperature_2m",
        "temperature_unit": "fahrenheit",
        "wind_speed_unit": "mph",
        "precipitation_unit": "inch",
        "forecast_days": 1
    };
	try {
		const responses = await fetchWeatherApi(url, params);

        const response = responses[0]

		// Attributes for timezone and location
		const utcOffsetSeconds = response.utcOffsetSeconds();
		const timezone = response.timezone();
		const timezoneAbbreviation = response.timezoneAbbreviation();
		const latitude = response.latitude();
		const longitude = response.longitude();

		const hourly = response.hourly();

		if (!hourly) {
			throw new Error("Hourly data is missing in the response");
		}

		// Helper function to form time ranges
        const range = (start: number, stop: number, step: number) =>
            Array.from({ length: (stop - start) / step }, (_, i) => start + i * 
                       step);

		// Note: The order of weather variables in the URL query and the indices
        // below need to match!
		const weatherData = {
			hourly: {
				time: range(Number(hourly.time()), Number(hourly.timeEnd()), 
                hourly.interval()).map(
					(t) => new Date((t + utcOffsetSeconds) * 1000)
				),
				temperature2m: hourly.variables(0)?.valuesArray() || [],
			},
		};

		// `weatherData` now contains a simple structure with arrays for 
        // datetime and weather data
		for (let i = 0; i < weatherData.hourly.time.length; i++) {
			console.log(
				weatherData.hourly.time[i].toISOString(),
				weatherData.hourly.temperature2m[i]
			);
		}

	} catch (error) {
		console.error("Error fetching weather data:", error);
	}
};

const Forecast = () : JSX.Element => {
    
    const loc = useLocation()
    const name = loc.state.location.properties.name
    const lat = loc.state.location.properties.coordinates.latitude
    const long = loc.state.location.properties.coordinates.longitude
    getWeatherData(lat, long)

    return (
        <div>
            <h1>Weather for {loc.state.location.properties.name}</h1>
            <h1>Located at: {lat}, {long}</h1>
        </div>
    )
}
export default Forecast;