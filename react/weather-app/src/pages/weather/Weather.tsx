import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import SearchField from '../../components/SearchField'
import WeatherWidget from '../../components/WeatherWidget'
import {loadForecast, loadWeather, WeatherData, ForecastData} from '../../actions/loadWeather'
import ForecastWidget from '../../components/ForecastWidget'

import './Weather.css'

export default function Weather() {
    const {cityName} = useParams()

    const [city, setCity] = useState<string>('')
    const [weather, setWeather] = useState<WeatherData|null>(null)
    const [forecast, setForecast] = useState<ForecastData|null>(null)

    useEffect(() => {
        const verifiedCityName = cityName || ''

        Promise.all([
            loadWeather(verifiedCityName),
            loadForecast(verifiedCityName),
        ]).then(data => {
            setWeather(data[0])
            setForecast(data[1])
            setCity(verifiedCityName)
        })
    }, [cityName])

    return (
        <div className='weather'>
            <SearchField></SearchField>
            {weather && <WeatherWidget
                city={city}
                feelsLike={weather.feelsLike}
                temperature={weather.temperature}
                minTemperature={weather.minTemperature}
                maxTemperature={weather.maxTemperature}
                weather={weather.weather}
            ></WeatherWidget>}
            {forecast && <ForecastWidget
                forecast={forecast}
            ></ForecastWidget>}
        </div>
    )
}