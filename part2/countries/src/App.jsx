import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
	const [name, setName] = useState('')
	const [countries, setCountries] = useState(undefined)

	useEffect(() => {
		if (!!!countries) {
			axios
			.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
			.then(response => {
				console.log(response.data)
				setCountries(response.data)
			})
		}
	}, [countries])

	const filteredCountries = name
		? countries?.filter(country =>
			country.name.common.toLowerCase().includes(name.toLowerCase())
			)
		: [];


	return (
		<div>
			<div>
				find countries <input onChange={(event) => setName(event.target.value)} value={name}/>
			</div>
			<div>
				{filteredCountries && filteredCountries.length > 10 && (
					<p>Too many matches, specify another filter</p>
				)}

				{filteredCountries && filteredCountries.length > 1 && filteredCountries.length <= 10 && (
					filteredCountries.map(country => (
						<p key={country.ccn3}>{country.name.common}</p>
					))
				)}

				{filteredCountries && filteredCountries.length === 1 && (
					filteredCountries.map(country => (
						<div key={country.ccn3}>
							<h2>{country.name.common}</h2>
							<p>Capital: {country.capital?.[0]}</p>
							<p>Area: {country.area} km²</p>
							<h3>Languages</h3>
							<ul>
								{Object.entries(country.languages || {}).map(([code, name]) => <li key={code}>{name}</li>)}
							</ul>
							<img src={country.flags?.png} alt={`Flag of ${country.name.common}`} width="150" />
						</div>
					))
				)}
			</div>
		</div>
	)
}

export default App