import { weatherDataType } from "../types";
import { getWeatherIcon, getWeatherString, getWindDirection, specifiedDate } 
    from "./utils";
import { WiRaindrops, WiStrongWind } from "weather-icons-react";
import { TbUvIndex } from "react-icons/tb"

const Forecast_Hourly: React.FC<{ weatherData: weatherDataType }> = 
    ({ weatherData }) => {
    
    let daySplit = 24-weatherData['hourly']['time'][0]

    // Function to slice the data
    function sliceWeatherData(data: weatherDataType, start: number, end: number)
    : weatherDataType {
        return {
            hourly: {
                time: data.hourly.time.slice(start, end),
                temperature2m: data.hourly.temperature2m.slice(start, end ),
                relativeHumidity2m: data.hourly.relativeHumidity2m.slice(start,
                     end ),
                apparentTemperature: data.hourly.apparentTemperature.slice(
                    start, end),
                precipitationProbability: data.hourly.precipitationProbability
                .slice(start, end),
                weatherCode: data.hourly.weatherCode.slice(start, end),
                windSpeed10m: data.hourly.windSpeed10m.slice(start, end ),
                windDirection10m: data.hourly.windDirection10m.slice(start, end
                    ),
                uvIndex: data.hourly.uvIndex.slice(start, end),
            }
        };
    }

    let date = new Date()

    return (
        <div className="flex justify-center">
            <h1>
                {weatherData ? 
                    <ul className="flex-col overflow-y-auto bg-none rounded-b-md 
                    h-[40vh]">
                        {weatherData['hourly']
                        ['time'].map((time: number, index: number) => (
                            <li key={index} className="flex flex-col text-xl
                            w-full pr-5 pb-6 cursor-default rounded-md">
                                {index === 0 ? 
                                    <div className="font-medium text-2xl mb-4">
                                        {specifiedDate(0)}
                                    </div>
                                : index === daySplit ?
                                    <div className="font-medium mt-3 text-2xl
                                    mb-4">
                                        {specifiedDate(1)}
                                    </div>
                                : <h1></h1>
                                }
                                <div className="flex flex-row space-x-3">
                                    <h1 className="font-light w-[60px]">
                                        {time}:00</h1>
                                    <div className="flex flex-row gap-1 
                                    w-[140px]">
                                        <h1 className="font-semibold m-0">
                                            {Math.round(weatherData.hourly.
                                            temperature2m[index])}°</h1>
                                        <h1 className="font-light 
                                        text-white/70">
                                            / {Math.round(weatherData.hourly.
                                            apparentTemperature[index])}°</h1>
                                    </div>
                                    <h1>{getWeatherIcon(weatherData['hourly']
                                        ['weatherCode'][index], 30)}</h1>
                                    <h1 className="w-[180px]">{getWeatherString(
                                        weatherData['hourly']
                                        ['weatherCode'][index])}</h1>
                                    <TbUvIndex size={25}/>
                                    <h1 className="w-[80px]">{Math.round(
                                        weatherData.hourly.uvIndex
                                        [index])}</h1>
                                    <WiRaindrops size={30} 
                                    viewBox="10 7.5 10 11.5"/>
                                    <h1 className="w-[70px]">{Math.round(
                                        weatherData['hourly']
                                        ['precipitationProbability'][index])}
                                        %</h1>
                                    <WiStrongWind size={30} 
                                    viewBox="2.1 11 25 9"/>
                                    <div className="flex flex-row gap-2">
                                        <h1>{getWindDirection(weatherData
                                        ['hourly'] ['windDirection10m'][index])}
                                        </h1>
                                        <h1>{Math.round(weatherData['hourly']
                                        ['windSpeed10m'][index])} mph</h1>
                                    </div>
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