import { weatherDataType } from "../types";
import { getWeatherIcon, getWeatherString, getWindDirection, specifiedDate } 
    from "./utils";
import { WiRaindrops, WiStrongWind } from "weather-icons-react";
import { TbUvIndex } from "react-icons/tb"

const Forecast_Hourly: React.FC<{ weatherData: weatherDataType }> = 
    ({ weatherData }) => {
    
    let daySplit = 24-weatherData['hourly']['time'][0]

    return (
        <div className="flex justify-center">
            <h1>
                {weatherData ? 
                    <ul className="flex-col overflow-y-auto bg-none rounded-b-md 
                    h-full max-h-[350px]">
                        {weatherData['hourly']
                        ['time'].map((time: number, index: number) => (
                            <li key={index} className="flex flex-col text-[17px] sm:text-lg
                            w-full pr-5 pb-2 sm:pb-2 cursor-default rounded-md">
                                {index === 0 ?
                                    <div className="font-medium text-md 
                                    sm:text-xl mt-1 mb-2">
                                        {specifiedDate(0)}
                                    </div>
                                : index === daySplit ?
                                    <div className="font-medium mt-1 text-md 
                                    sm:text-xl mb-2">
                                        {specifiedDate(1)}
                                    </div>
                                : <div></div>
                                }
                                <div className="flex flex-row flex-wrap
                                 border-black border-opacity-10 border-2 
                                 rounded-md sm:border-none pl-1 pb-1 sm:p-0 
                                 gap-y-2 sm:gap-y-0 sm:space-x-3">
                                    <h1 className="font-bold sm:font-light w-[70px]
                                    sm:w-[60px] text-left ">
                                        {time}:00</h1>
                                    <div className="flex flex-row w-[80px] 
                                    sm:w-[140px]">
                                        <h1 className="font-semibold m-0">
                                            {Math.round(weatherData.hourly
                                            .temperature2m[index])}°</h1>
                                        <h1 className="font-light 
                                        text-white/70">
                                            / {Math.round(weatherData.hourly
                                            .apparentTemperature[index])}°</h1>
                                    </div>
                                    <div className="flex space-x-2 items-center
                                    mr-6">
                                        <h1>
                                            {getWeatherIcon(weatherData
                                            ['hourly']['weatherCode'][index], 
                                            25)}
                                        </h1>
                                        <h1 className="w-fit sm:w-[180px] 
                                        ml-2 mr-5 sm:m-0 text-left 
                                        whitespace-nowrap">
                                            {getWeatherString(weatherData
                                            ['hourly']['weatherCode'][index])}
                                        </h1>
                                    </div>
                                    <div className="flex items-center">
                                        <TbUvIndex size={25}/>
                                        <h1 className="w-[40px] sm:w-[80px] ml-1 text-left">
                                            {Math.round(
                                            weatherData.hourly.uvIndex
                                            [index])}</h1>
                                    </div>
                                    <div className="flex">
                                        <WiRaindrops size={25} 
                                        viewBox="10 7.5 10 11.5"/>
                                        <h1 className="ml-1 mr-8 text-left">
                                            {Math.round(weatherData['hourly']
                                            ['precipitationProbability']
                                            [index])}
                                            %</h1>
                                    </div>
                                    <div className="flex ml-0">
                                        <WiStrongWind size={25} 
                                        viewBox="2.1 11 25 9"/>
                                        <div className="flex flex-row gap-2 
                                        ml-2">
                                            <h1>{getWindDirection(weatherData
                                            ['hourly']['windDirection10m'][index])}
                                            </h1>
                                            <h1>{Math.round(weatherData['hourly']
                                            ['windSpeed10m'][index])} mph</h1>
                                        </div>
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