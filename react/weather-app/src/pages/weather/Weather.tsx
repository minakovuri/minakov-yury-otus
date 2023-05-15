import React, { useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchField from '../../components/SearchField'
import WeatherWidget from '../../components/WeatherWidget'
import {loadWeather, WeatherData} from '../../actions/loadWeather'

import './Weather.css'

export default function Weather() {
    const [searchParams] = useSearchParams()
    const [city, setCity] = useState<string>('')
    const [weather, setWeather] = useState<WeatherData|null>(null)

    useEffect(() => {
        const city = searchParams.get('city') || ''
        const latitude = searchParams.get('lat') || ''
        const longitude = searchParams.get('lon') || ''

        loadWeather(latitude, longitude)
            .then(data => {
                setWeather(data)
                setCity(city)
            })
    }, [searchParams])

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
        </div>
    )
}