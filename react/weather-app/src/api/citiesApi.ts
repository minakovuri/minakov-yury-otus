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
            'X-RapidAPI-Key': '686cd21c5bmsh8aded534919ab28p1a1fb1jsn3f33870868ac',
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