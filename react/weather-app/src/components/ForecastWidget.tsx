import React, { useMemo } from 'react'

import './ForecastWidget.css'

const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

interface DailyWeatherProps {
    date: Date,
    weather: string,
    feelsLike: number,
    temperature: number,
    maxTemperature: number,
    minTemperature: number,
}

function DailyWeather(props: DailyWeatherProps) {
    const {
        date,
        weather,
        feelsLike,
        temperature,
        minTemperature,
        maxTemperature,
    } = props

    const weekDay = WEEK_DAYS[date.getDay()]

    return (
        <div className='daily-weather'>
            <div className='day'>{weekDay}</div>
            <div>
                <div>Weather: {weather}</div>
                <div>Temperature: {Math.floor(temperature)} °C</div>
                <div>Feels like: {Math.floor(feelsLike)} °C</div>
                <div>Max temperature: {Math.floor(maxTemperature)} °C</div>
                <div>Min temperature: {Math.floor(minTemperature)} °C</div>
            </div>
        </div>
    )
}

interface ForecastWidgetProps {
    forecast: Array<{
        date: Date,
        weather: string,
        feelsLike: number,
        temperature: number,
        maxTemperature: number,
        minTemperature: number,
    }>
}

export default function ForecastWidget(props: ForecastWidgetProps) {
    // const forecastDays = useMemo(() => {
    //     const currentDay = new Date().getDay();
    //     return WEEK_DAYS.slice(currentDay, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, currentDay))
    // }, [])
    const {forecast} = props

    return (
        <div className='forecast-widget'>
            <div className='header'>Forecast:</div>
            <div className='forecast-list'>
                {forecast.map(item => <DailyWeather
                    key={item.date.getDate()}
                    date={item.date}
                    weather={item.weather}
                    feelsLike={item.feelsLike}
                    temperature={item.temperature}
                    minTemperature={item.minTemperature}
                    maxTemperature={item.maxTemperature}
                ></DailyWeather>)}
            </div>
        </div>
    )
}