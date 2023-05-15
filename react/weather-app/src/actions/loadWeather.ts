import { WeatherApi } from "../api/weatherApi"

export interface WeatherData {
    weather: string,
    feelsLike: number,
    temperature: number,
    minTemperature: number,
    maxTemperature: number,
}

export async function loadWeather(latitude: string, longitude: string): Promise<WeatherData> {
    const data = await WeatherApi.weather(latitude, longitude)

    return {
        weather: data.weather[0].main,
        feelsLike: data.main.feels_like,
        temperature: data.main.temp,
        minTemperature: data.main.temp_min,
        maxTemperature: data.main.temp_max,
    }
}