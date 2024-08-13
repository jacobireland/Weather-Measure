import { weatherDataType } from "../types";
import { getWeatherIcon, getWeatherString, getWindDirection } from "./utils";
import { WiRaindrops, WiStrongWind } from "weather-icons-react";


const Forecast_Current: React.FC<{ weatherData: weatherDataType }> = 
    ({ weatherData }) => {
    
    return (
        <div className="flex flex-row justify-center w-full mt-10 gap-[1rem]
        md:gap-[4rem] lg:gap-[5rem]">
            <div className="flex flex-col w-fit">
                <div className="flex flex-row w-full">
                    <div className="text-9xl md:text-8xl lg:text-9xl font-[400]">
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
                <div className="flex text-5xl md:text-4xl lg:text-5xl w-full whitespace-nowrap">
                    {weatherData ? getWeatherString(weatherData['hourly']
                        ['weatherCode'][0])
                    : <h1>no data</h1>
                    }
                </div>
            </div>
            <div className="flex flex-col w-fit text-2xl md:text-xl lg:text-2xl pt-4 gap-1">
                <div className="flex flex-row">
                    Feels Like:
                    <div className="ml-2">
                        {weatherData ? 
                            <div>
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
                    <div className="ml-2">
                        {weatherData ? 
                            <h1>{Math.round(weatherData['hourly']
                            ['relativeHumidity2m'][0])}%</h1>
                        : <h1>no data</h1>
                        }
                    </div>
                </div>
                <div className="flex flex-row">
                    UV Index:
                    <div className="ml-2">
                        {weatherData ? Math.round(weatherData['hourly']
                            ['uvIndex'][0])
                        : <h1>no data</h1>
                        }
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-fit text-2xl md:text-xl lg:text-2xl justify-start pt-4">
                <div className="flex flex-row">
                    <WiRaindrops size={30} viewBox="10 7.5 10 11.5"/>
                    <div className="flex items-center ml-2">
                        {weatherData ? 
                            <div>
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
                            <div className="flex flex-row w-full items-center
                            ml-2 gap-2">
                                    <h1>
                                        {getWindDirection(weatherData['hourly']
                                        ['windDirection10m'][0])}
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