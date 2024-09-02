import { WiDaySunny, WiDaySunnyOvercast, WiDayCloudy, WiCloudy, WiFog, 
    WiDayRainMix, WiRainMix, WiDayHail, WiHail, WiDayRain, WiRain, WiDaySnow, 
    WiSnow, WiSnowWind, WiDayShowers, WiShowers, WiStormShowers, 
    WiThunderstorm } from "weather-icons-react";

import { BiCloudLightRain } from "react-icons/bi";

let weekDays = new Map<number, string>([
    [0, 'Sunday'],
    [1, 'Monday'],
    [2, 'Tuesday'],
    [3, 'Wednesday'],
    [4, 'Thursday'],
    [5, 'Friday'],
    [6, 'Saturday']
])

let months = new Map<number, string>([
    [1, 'January'],
    [2, 'February'],
    [3, 'March'],
    [4, 'April'],
    [5, 'May'],
    [6, 'June'],
    [7, 'July'],
    [8, 'August'],
    [9, 'September'],
    [10, 'October'],
    [11, 'November'],
    [12, 'December']
])

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

// convert wCode to string
export function getWeatherString(code:number):string {
    return `${weatherCodeMap.get(code)}`
}

export function specifiedDate(day:number):string {
    let date = new Date()
    let d = `${weekDays.get(date.getDay())}`
    let m = `${months.get(date.getMonth())}`
    let dt = `${date.getDate()}`
    if (day === 1) {
        let tomorrow = new Date(date)
        tomorrow.setDate(date.getDate() + 1)
        d = `${weekDays.get(tomorrow.getDay())}`
        m = `${months.get(tomorrow.getMonth())}`
        dt = `${tomorrow.getDate()}`
    }
    return `${d}, ${m} ${dt}`
}

let commonViewBox = "7 3 15 23"

export function getWeatherIcon(code:number, wSize:number): JSX.Element {
    let weatherIconMap = new Map<number, JSX.Element>([
        [0, <WiDaySunny size={wSize} viewBox={commonViewBox}/>],
        [1, <WiDaySunnyOvercast size={wSize} viewBox="9 0 12 25"/>],
        [2, <WiDayCloudy size={wSize} viewBox="9 -1 12 28"/>],
        [3, <WiCloudy size={wSize} viewBox={commonViewBox}/>],
        [45, <WiFog size={wSize} viewBox={commonViewBox}/>],
        [48, <WiFog size={wSize} viewBox={commonViewBox}/>],
        [51, <WiDayRainMix size={wSize} viewBox={commonViewBox}/>],
        [53, <WiDayRain size={wSize} viewBox={commonViewBox}/>],
        [55, <WiDayRain size={wSize} viewBox={commonViewBox}/>],
        [56, <WiDayHail size={wSize} viewBox={commonViewBox}/>],
        [57, <WiHail size={wSize} viewBox={commonViewBox}/>],
        [61, <WiRainMix size={wSize} viewBox={commonViewBox}/>],
        [63, <BiCloudLightRain size={wSize} viewBox={commonViewBox}/>],
        [65, <WiRain size={wSize} viewBox={commonViewBox}/>],
        [66, <WiDayHail size={wSize} viewBox={commonViewBox}/>],
        [67, <WiHail size={wSize} viewBox={commonViewBox}/>],
        [71, <WiDaySnow size={wSize} viewBox={commonViewBox}/>],
        [73, <WiSnow size={wSize} viewBox={commonViewBox}/>],
        [75, <WiSnowWind size={wSize} viewBox={commonViewBox}/>],
        [77, <WiDaySnow size={wSize} viewBox={commonViewBox}/>],
        [80, <WiDayShowers size={wSize} viewBox={commonViewBox}/>],
        [81, <WiShowers size={wSize} viewBox={commonViewBox}/>],
        [82, <WiStormShowers size={wSize} viewBox={commonViewBox}/>],
        [85, <WiDaySnow size={wSize} viewBox={commonViewBox}/>],
        [86, <WiSnow size={wSize} viewBox={commonViewBox}/>],
        [95, <WiThunderstorm size={wSize} viewBox={commonViewBox}/>],
        [96, <WiThunderstorm size={wSize} viewBox={commonViewBox}/>],
        [99, <WiThunderstorm size={wSize} viewBox={commonViewBox}/>]
    ]);

    return weatherIconMap.get(code) || <WiDaySunny size={wSize}/>;
}

//convert wind degrees direction to compass direction
export function getWindDirection(wind:number):string {
    let i = Math.round((wind%360)/(22.5))
    return windDir[i]
}