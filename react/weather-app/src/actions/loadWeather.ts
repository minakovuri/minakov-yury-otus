import { WeatherApi } from "../api/weatherApi"
import { getCityWeatherData, saveCityWeatherData } from "../store"

export type WeatherData = {
    weather: {
        weather: string,
        feelsLike: number,
        temperature: number,
        minTemperature: number,
        maxTemperature: number,
    },
    forecast: Array<{
        date: number,
        weather: string,
        feelsLike: number,
        temperature: number,
        minTemperature: number,
        maxTemperature: number,
    }>
}

export async function loadWeather(city: string): Promise<WeatherData> {
    const storageData = getCityWeatherData(city)

    if (storageData) {
        return storageData
    }

    const [weather, forecast] = await Promise.all([
        WeatherApi.weather(city),
        WeatherApi.forecast(city),
    ])

    const dailyForecast = forecast.list.filter(item => item.dt_txt.includes('00:00:00'))

    const data = {
        weather: {
            weather: weather.weather[0].main,
            feelsLike: weather.main.feels_like,
            temperature: weather.main.temp,
            minTemperature: weather.main.temp_min,
            maxTemperature: weather.main.temp_max,
        },
        forecast: dailyForecast.map(item => ({
            date: new Date(item.dt_txt).getTime(),
            weather: item.weather[0].main,
            feelsLike: item.main.feels_like,
            temperature: item.main.temp,
            minTemperature: item.main.temp_min,
            maxTemperature: item.main.temp_max,
        }))
    }

    saveCityWeatherData(city, data)

    return data
}