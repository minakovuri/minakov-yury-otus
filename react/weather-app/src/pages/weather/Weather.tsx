import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import SearchField from '../../components/SearchField'
import WeatherWidget from '../../components/WeatherWidget'
import {loadWeather, WeatherData} from '../../actions/loadWeather'
import ForecastWidget from '../../components/ForecastWidget'

import './Weather.css'

export default function Weather() {
    const {cityName} = useParams()

    const [city, setCity] = useState<string>('')
    const [data, setData] = useState<WeatherData|null>(null)

    useEffect(() => {
        const verifiedCityName = cityName || ''

        loadWeather(verifiedCityName)
            .then(data => {
                setData(data)
                setCity(verifiedCityName)
            })
    }, [cityName])

    return (
        <div className='weather'>
            <SearchField></SearchField>
            {data && <WeatherWidget
                city={city}
                feelsLike={data.weather.feelsLike}
                temperature={data.weather.temperature}
                minTemperature={data.weather.minTemperature}
                maxTemperature={data.weather.maxTemperature}
                weather={data.weather.weather}
            ></WeatherWidget>}
            {data && <ForecastWidget forecast={data.forecast}></ForecastWidget>}
        </div>
    )
}