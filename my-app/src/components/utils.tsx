import { WiDaySunny, WiDaySunnyOvercast, WiDayCloudy, WiCloudy, WiFog, 
    WiDayRainMix, WiRainMix, WiHail, WiDayRain, WiRain, WiDayHail, WiDaySnow, 
    WiSnow, WiSnowWind, WiDayShowers, WiShowers, WiStormShowers, 
    WiThunderstorm } from "weather-icons-react";

import { BiCloudLightRain, BiCloudDrizzle } from "react-icons/bi";
import { FiWind } from "react-icons/fi"
import { useState } from "react";

let wSize = 100

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

let weatherIconMap = new Map<number, JSX.Element>([
    [0, <WiDaySunny size={wSize}/>],
    [1, <WiDaySunnyOvercast size={wSize}/>]
]);

const windDir = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S",
    "SSW","SW","WSW","W","WNW","NW","NNW","N"]

// convert wCode to string
export function getWeatherString(code:number):string {
    return `${weatherCodeMap.get(code)}`
}

export function getWeatherIcon(code:number, size:number): JSX.Element {
    let weatherIconMap = new Map<number, JSX.Element>([
        [0, <WiDaySunny size={size}/>],
        [1, <WiDaySunnyOvercast size={size} viewbox="0 0 0 0"/>]
    ]);

    console.log(code)
    wSize = size
    return weatherIconMap.get(code) || <WiDaySunny size={size}/>;
}

//convert wind degrees direction to compass direction
export function getWindDirection(wind:number):string {
    let i = Math.floor(wind/(22.5) + .5)
    return windDir[i]
}