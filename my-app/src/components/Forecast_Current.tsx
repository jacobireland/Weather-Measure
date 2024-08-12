import { weatherDataType } from "../types";

const Forecast_Current: React.FC<{ weatherData: weatherDataType }> = 
    ({ weatherData }) => {

    const weatherCodeMap = new Map<number, string>([
        [0, "Clear sky"],
        [1, "Mostly clear"],
        [2, "Partly cloudy"],
        [3, "Overcast"],
        [45, "Fog"],
        [48, "Fog"],
        [51, "Light Drizzle"],
        [53, "Moderate Drizzle"],
        [55, "Heavy Drizzle"],
        [56, "Light Freezing Drizzle"],
        [57, "Heavy Freezing Drizzle"],
        [61, "Slight Rain"],
        [63, "Moderate Rain"],
        [65, "Heavy Rain"],
        [66, "Light Freezing Rain"],
        [67, "Heavy Freezing Rain"],
        [71, "Light Snow"],
        [73, "Moderate Snow"],
        [75, "Heavy Snow"],
        [77, "Snow grains"],
        [80, "Light Rain Showers"],
        [81, "Moderate Rain Showers"],
        [82, "Violent Rain Showers"],
        [85, "Light Snow Showers"],
        [86, "Heavy Snow Showers"],
        [95, "Thunderstorm"],
        [96, "Thunderstorm Slight Hail"],
        [99, "Thunderstorm Heavy Hail"]
    ]);
    
    const windDir = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S",
        "SSW","SW","WSW","W","WNW","NW","NNW","N"]

    const getWeatherString = (code:number):string => {
        return `${weatherCodeMap.get(code)}`
    }

    const getWindDirection = (wind:number):string => {
        let i = Math.floor(wind/(22.5) + .5)
        return windDir[i]
    }
    
    return (
        <div>
            <h1 className="">
                {weatherData ? 
                    <h1>{Math.round(weatherData['hourly']
                    ['temperature2m'][0])}°</h1>
                : <h1>no data</h1>
                }
            </h1>
            <h1 className="">
                {weatherData ? 
                    <h1>{Math.round(weatherData['hourly']
                        ['apparentTemperature'][0])}°</h1>
                : <h1>no data</h1>
                }
            </h1>
            <h1 className="">
                {weatherData ? getWeatherString(weatherData['hourly']
                    ['weatherCode'][0])
                : <h1>no data</h1>
                }
            </h1>
            <h1 className="">
                {weatherData ? 
                    <h1>{Math.round(weatherData['hourly']
                    ['precipitationProbability'][0])}%</h1>
                : <h1>no data</h1>
                }
            </h1>
            <h1 className="">
                {weatherData ? 
                    <h1>{Math.round(weatherData['hourly']
                    ['relativeHumidity2m'][0])}%</h1>
                : <h1>no data</h1>
                }
            </h1>
            <h1 className="">
                {weatherData ? 
                    <h1>{Math.round(weatherData['hourly']
                    ['windSpeed10m'][0])}mph</h1>
                : <h1>no data</h1>
                }
            </h1>
            <h1 className="">
                {weatherData ? getWindDirection(weatherData['hourly']
                    ['windDirection10m'][0])
                : <h1>no data</h1>
                }
            </h1>
            <h1 className="">
                {weatherData ? Math.round(weatherData['hourly']
                    ['uvIndex'][0])
                : <h1>no data</h1>
                }
            </h1>
        </div>
    )
}
  
export default Forecast_Current;