import React from 'react'

import './WeatherWidget.css'

interface WeatherWidgetProps {
    city: string,
    weather: string,
    feelsLike: number,
    temperature: number,
    maxTemperature: number,
    minTemperature: number,
}

export default function WeatherWidget(props: WeatherWidgetProps) {
    const {
        city,
        weather,
        feelsLike,
        temperature,
        minTemperature,
        maxTemperature,
    } = props

    return (
        <div className='weather-widget'>
            <div className='place'>{city}</div>
            <div className='header'>Current:</div>
            <div className='current-weather'>
                <div>Weather: {weather}</div>
                <div>Temperature: {Math.floor(temperature)} °C</div>
                <div>Feels like: {Math.floor(feelsLike)} °C</div>
                <div>Max temperature: {Math.floor(maxTemperature)} °C</div>
                <div>Min temperature: {Math.floor(minTemperature)}°C</div>
            </div>
        </div>
    )
}