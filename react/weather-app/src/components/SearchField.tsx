import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AsyncPaginate } from 'react-select-async-paginate'
import { loadCities } from '../actions/loadCities'

import './SearchField.css'

const SEARCH_DEBOUNCE = 1000

async function loadOptions(value: string) {
  const data = await loadCities(value)

  return {
    options: data.map(item => ({
      value: item.city,
      label: `${item.city}, ${item.country}`,
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

      navigate(`/weather/${value}`)
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