interface ForecastResponse {
    list: Array<{
        dt_txt: string,
        main: { 
            feels_like: number,
            temp: number,
            temp_max: number,
            temp_min: number
        },
        weather: Array<{
            main: string,
        }>
    }>
}

export class WeatherApi {
    private static baseUrl = 'https://api.openweathermap.org/data/2.5'

    private static options = {
        apiKey: '17222db223dd9d8145433cdcdf51e27e',
    }

    static async weather(city: string) {
        const response = await fetch(`${this.baseUrl}/weather?q=${city}&appid=${this.options.apiKey}&units=metric`)

        const json = await response.json()

        return json
    }

    static async forecast(city: string): Promise<ForecastResponse> {
        const response = await fetch(`${this.baseUrl}/forecast?q=${city}&appid=${this.options.apiKey}&units=metric`)

        const json = await response.json()

        return json
    }
}