import { WeatherApi } from "../api/weatherApi"

export type WeatherData = {
    weather: string,
    feelsLike: number,
    temperature: number,
    minTemperature: number,
    maxTemperature: number,
}

export type ForecastData = Array<{date: Date} & WeatherData>

export async function loadWeather(city: string): Promise<WeatherData> {
    const data = await WeatherApi.weather(city)

    return {
        weather: data.weather[0].main,
        feelsLike: data.main.feels_like,
        temperature: data.main.temp,
        minTemperature: data.main.temp_min,
        maxTemperature: data.main.temp_max,
    }
}

export async function loadForecast(city: string): Promise<ForecastData> {
    const data = await WeatherApi.forecast(city)

    const dailyForecast = data.list.filter(item => item.dt_txt.includes('00:00:00'))

    return dailyForecast.map(item => ({
        date: new Date(item.dt_txt),
        weather: item.weather[0].main,
        feelsLike: item.main.feels_like,
        temperature: item.main.temp,
        minTemperature: item.main.temp_min,
        maxTemperature: item.main.temp_max,
    }))
}