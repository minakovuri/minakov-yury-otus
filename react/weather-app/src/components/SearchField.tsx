import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AsyncPaginate } from 'react-select-async-paginate'
import { CitiesApi } from '../api/citiesApi'

import './SearchField.css'

const SEARCH_DEBOUNCE = 1000

async function loadOptions(value: string) {
  const apiData = await CitiesApi.list(value)
  return {
    options: apiData.map(item => ({
      value: `${item.name}, ${item.latitude}, ${item.longitude}`,
      label: `${item.name}, ${item.country}`,
    }))
  }
}

export default function SearchField() {
  const navigate = useNavigate()

  const onChange = useCallback(
    (data: {value: string, label: string}|null) => {
      if (!data) {
        return
      }

      const {value} = data
      const [city, latitude, longitude] = value.split(',')

      navigate(`/weather?city=${city}&lat=${latitude}&lon=${longitude}`)
    },
    [navigate],
  )

  return (
    <AsyncPaginate
      className="search-field"
      debounceTimeout={SEARCH_DEBOUNCE}
      placeholder="Search city"
      loadOptions={loadOptions}
      onChange={onChange}
    />
  )
}