import { weatherDataType } from "../types";
import { getWeatherIcon, getWeatherString, getWindDirection } from "./utils";
import { WiRaindrops, WiStrongWind } from "weather-icons-react";


const Forecast_Current: React.FC<{ weatherData: weatherDataType }> = 
    ({ weatherData }) => {
    
    return (
        <div className="flex flex-col items-center sm:items-left sm:flex-row 
        justify-center w-full mt-7 mb-7 gap-[1rem] md:gap-[6rem] lg:gap-[7rem] 
        font-light">
            <div className="flex flex-col align-center w-fit">
                <div className="flex flex-row w-full justify-center">
                    <div className="text-6xl md:text-8xl lg:text-9xl font-[400]"
                    >
                        {weatherData ? 
                            <div className="pb-3">
                                {Math.round(weatherData['hourly']
                                ['temperature2m'][0])}
                                °
                            </div>
                        : <h1>no data</h1>
                        }
                    </div>
                </div>
                <div className="flex text-1xl md:text-4xl lg:text-5xl w-full 
                whitespace-nowrap">
                    {weatherData ? getWeatherString(weatherData['hourly']
                        ['weatherCode'][0])
                    : <h1>no data</h1>
                    }
                </div>
            </div>
            <div className="flex flex-row gap-12 md:gap-[6rem]
            lg:gap-[7rem] text-sm md:text-xl lg:text-2xl">
                <div className="flex flex-col w-fit pt-6 sm:pt-4 gap-1 
                sm:gap-2">
                    <div className="flex flex-row">
                        Feels Like:
                        <div className="ml-2">
                            {weatherData ? 
                                <div className="font-medium sm:font-normal">
                                    {Math.round(weatherData['hourly']
                                    ['apparentTemperature'][0])}
                                    °
                                </div>
                            : <h1>no data</h1>
                            }
                        </div>
                    </div>
                    <div className="flex flex-row">
                        Humidity: 
                        <div className="ml-2 font-medium sm:font-normal">
                            {weatherData ? 
                                <h1>{Math.round(weatherData['hourly']
                                ['relativeHumidity2m'][0])}%</h1>
                            : <h1>no data</h1>
                            }
                        </div>
                    </div>
                    <div className="flex flex-row">
                        UV Index:
                        <div className="ml-2 font-medium sm:font-normal">
                            {weatherData ? Math.round(weatherData['hourly']
                                ['uvIndex'][0])
                            : <h1>no data</h1>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-fit justify-start pt-6 sm:pt-4 
                gap-1 sm:gap-2">
                    <div className="flex flex-row">
                        <WiRaindrops size={30} viewBox="10 7.5 10 11.5"/>
                        <div className="flex items-center ml-2">
                            {weatherData ? 
                                <div className="font-medium sm:font-normal">
                                    {Math.round(weatherData['hourly']
                                    ['precipitationProbability'][0])}
                                    %
                                </div>
                            : <h1>no data</h1>
                            }
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <WiStrongWind size={30} viewBox="2.1 11 25 9"/>
                        <div className="">
                            {weatherData ? 
                                <div className="flex flex-row w-full 
                                items-center ml-2 gap-2 font-medium 
                                sm:font-normal">
                                        <h1>
                                            {getWindDirection(weatherData
                                            ['hourly']['windDirection10m'][0])}
                                        </h1>
                                        <h1>
                                            {Math.round(weatherData['hourly']
                                            ['windSpeed10m'][0])}
                                        </h1>
                                        mph
                                </div>
                            : <h1>no data</h1>
                            }
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    )
}
  
export default Forecast_Current;