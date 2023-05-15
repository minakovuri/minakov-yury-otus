export class WeatherApi {
    private static baseUrl = 'https://api.openweathermap.org/data/2.5'

    private static options = {
        apiKey: '17222db223dd9d8145433cdcdf51e27e',
    }

    static async weather(latitude: string, longitude: string) {
        const formatLatitude = parseFloat(latitude).toFixed(2)
        const formatLongitude = parseFloat(longitude).toFixed(2)

        const response = await fetch(`${this.baseUrl}/weather?lat=${formatLatitude}&lon=${formatLongitude}&appid=${this.options.apiKey}&units=metric`)

        const json = await response.json()

        return json
    }

    // static async forecast() {

    // }
}