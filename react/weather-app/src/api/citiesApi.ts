interface ListResponseData {
    latitude: string,
    longitude: string,
    name: string,
    country: string,
}

export class CitiesApi {
    private static baseUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities'

    private static options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '', // вставить сюда ключ
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    }

    static async list(prefix: string): Promise<ListResponseData[]> {
        const response = await fetch(
            `${this.baseUrl}?namePrefix=${prefix}&minPopulation=100000`,
            this.options,
        )

        const json = await response.json()

        return json.data
    }
}