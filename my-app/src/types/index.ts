export type optionType = {
    properties: {
        name:string, full_address:string, 
        coordinates: {
            latitude:string, longitude:string
        }
    }
}

export type weatherDataType = {
    hourly: {
        time: number[],
        temperature2m: number[],
        relativeHumidity2m: number[],
        apparentTemperature: number[],
        precipitationProbability: number[],
        weatherCode: number[],
        windSpeed10m: number[],
        windDirection10m: number[],
        uvIndex: number[]
    }
}
