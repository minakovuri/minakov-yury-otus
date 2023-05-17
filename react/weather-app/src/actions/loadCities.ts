import { CitiesApi } from "../api/citiesApi"

type CitiesData = Array<{
    city: string,
    country: string,
}>

export async function loadCities(value: string): Promise<CitiesData> {
    const data = await CitiesApi.list(value)

    return data.map(item => ({
        city: item.name,
        country: item.country,
    }))
}