import { weatherDataType } from "../types";
import { getWeatherString, getWindDirection } from "./utils";
import { WiRaindrops, WiStrongWind } from "weather-icons-react";


const Forecast_Current: React.FC<{ weatherData: weatherDataType }> = 
    ({ weatherData }) => {
    
    return (
        <div className="flex flex-row items-center sm:items-left sm:flex-row 
        justify-center w-full mt-2 mb-5 gap-9 md:gap-[7rem] lg:gap-[10rem]
        font-light">
            <div className="flex flex-col align-center w-fit">
                <div className="flex flex-row w-full justify-center">
                    <div className="text-4xl md:text-4xl lg:text-5xl font-[400]"
                    >
                        {weatherData ? 
                            <div className="pb-1">
                                {Math.round(weatherData['hourly']
                                ['temperature2m'][0])}
                                °
                            </div>
                        : <h1>no data</h1>
                        }
                    </div>
                </div>
                <div className="flex text-1xl md:text-2xl lg:text-2xl w-full 
                whitespace-nowrap">
                    {weatherData ? getWeatherString(weatherData['hourly']
                        ['weatherCode'][0])
                    : <h1>no data</h1>
                    }
                </div>
            </div>
            <div className="flex flex-row text-sm lg:text-lg">
                <div className="flex flex-col w-fit sm:pt-4 gap-0">
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
            </div>
            <div className="flex flex-col w-fit justify-start sm:pt-4 
            gap-0 text-sm lg:text-lg">
                <div className="flex flex-row">
                    <WiRaindrops size={25} viewBox="10 7.5 10 11.5"/>
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
                    <WiStrongWind size={25} viewBox="2.1 11 25 9"/>
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
    )
}
  
export default Forecast_Current;