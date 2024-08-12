import { weatherDataType } from "../types";

const Forecast_Hourly: React.FC<{ weatherData: weatherDataType }> = 
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
            <h1>
                {weatherData ? 
                    <ul className="flex-col overflow-y-auto bg-none rounded-b-md 
                    h-[30vh]">
                        {weatherData['hourly']['time'].map((time: number, 
                        index: number) => (
                            <li key={index} className="flextext-left text-sm 
                            w-full pr-5 py-1 cursor-default" >
                                <div className="flex flex-row space-x-3">
                                    <h1>{time}:00</h1>
                                    <h1>{Math.round(weatherData.hourly.
                                        temperature2m[index])}°</h1>
                                    <h1>{getWeatherString(weatherData['hourly']
                                        ['weatherCode'][index])}</h1>
                                    <h1>{Math.round(weatherData.hourly.uvIndex
                                        [index])}</h1>
                                    <h1>{Math.round(weatherData['hourly']
                                        ['precipitationProbability'][index])}
                                        %</h1>
                                    <h1>{getWindDirection(weatherData['hourly']
                                        ['windDirection10m'][index])}</h1>
                                    <h1>{Math.round(weatherData['hourly']
                                        ['windSpeed10m'][index])} mph</h1>
                                </div>
                            </li>
                        ))}
                    </ul>                
            : <p>No data</p>}
            </h1>
        </div>
    )
}
  
export default Forecast_Hourly;