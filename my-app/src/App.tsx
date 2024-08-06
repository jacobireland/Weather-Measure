import Home from './components/Home'
import { fetchWeatherApi } from 'openmeteo';

const params = {
	"latitude": 52.52,
	"longitude": 13.41,
	"hourly": "temperature_2m",
	"temperature_unit": "fahrenheit",
	"wind_speed_unit": "mph",
	"precipitation_unit": "inch",
	"forecast_days": 1
};

const url = "https://api.open-meteo.com/v1/forecast";

async function getWeatherData() {
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
            Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

		// Note: The order of weather variables in the URL query and the indices below need to match!
		const weatherData = {
			hourly: {
				time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
					(t) => new Date((t + utcOffsetSeconds) * 1000)
				),
				temperature2m: hourly.variables(0)?.valuesArray() || [],
			},
		};

		// `weatherData` now contains a simple structure with arrays for datetime and weather data
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

const App = (): JSX.Element => {
  return (
    <main className="flex justify-center items-center h-[100vh] w-full 
	bg-gradient-to-br from-teal-400 via-sky-500 to-indigo-500">

        <Home/>
        
    </main>
  )
}

export default App;
