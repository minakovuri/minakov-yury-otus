interface StoreWeatherData {
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

const STORAGE_BASE_ITEM_NAME = 'weather-app'

function getItemKey(value: string): string {
    return `${STORAGE_BASE_ITEM_NAME}.${value}`
}

function isDataExpired(date: number) {
    const currentDate = Date.now()

    // если данные были запрошены день назад - данные устарели
    return Math.floor(Math.abs(currentDate - date) / (1000 * 60 * 60 * 24)) > 0
}

export function saveCityWeatherData(city: string, data: StoreWeatherData) {
    const serializedData = JSON.stringify({
        date: Date.now(),
        ...data,
    })

    localStorage.setItem(getItemKey(city), serializedData)
}

export function getCityWeatherData(city: string): StoreWeatherData|null {
    const serializedData = localStorage.getItem(getItemKey(city))

    if (!serializedData) {
        return null
    }

    const {date, ...data} = JSON.parse(serializedData)

    if (isDataExpired(date)) {
        // если данные устарели - очищаем хранилище
        localStorage.removeItem(getItemKey(city))
        return null
    }

    return data
}