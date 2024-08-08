export type optionType = {
    properties: {name:string, coordinates:{latitude:string, longitude:string}}
}

export type weatherInfoType = {
    time: string[],
    temp: number[],
    wCode: number[],
    wind: number[],
    uv: number[]
}
