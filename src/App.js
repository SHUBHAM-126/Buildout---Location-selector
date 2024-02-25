import { useState, useEffect } from 'react'

function App() {

  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])

  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")

  //FETCHING COUNTRIES
  useEffect(() => {

    const fetchCountries = async () => {
      try {

        const res = await fetch('https://crio-location-selector.onrender.com/countries')
        const data = await res.json()
        setCountries(data)

      }
      catch (err) {
        console.log(err)
      }
    }

    fetchCountries()

  }, [])

  //FETCHING STATES
  useEffect(() => {

    if (selectedCountry != "") {
      const fetchStates = async () => {

        setSelectedCity("")
        setCities([])
        setSelectedState("")
        setStates([])

        try {
          const res = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
          const data = await res.json()
          setStates(data)
          setCities([])
        }
        catch (err) {
          console.log(err)
        }
      }

      fetchStates()
    }

  }, [selectedCountry])

  //FETCHING CITIES
  useEffect(() => {

    if (selectedState != "" && selectedCountry != "") {

      setSelectedCity("")
      setCities([])

      const fetchCities = async () => {
        try {
          const res = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
          const data = await res.json()
          setCities(data)
        }
        catch (err) {
          console.log(err)
        }
      }

      fetchCities()
    }

  }, [selectedState])

  return (
    <div className='location-wrapper'>
      <h1>Select Location</h1>

      <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
        <option value="" disabled>Select Country</option>
        {countries && (countries.map(country => (
          <option value={country} key={country}>{country}</option>
        )))}
      </select>

      <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} disabled={states.length > 0 ? false : true}>
        <option value="" disabled>Select State</option>
        {states && (states.map(state => (
          <option value={state} key={state}>{state}</option>
        )))}
      </select>

      <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={cities.length > 0 ? false : true}>
        <option value="" disabled>Select City</option>
        {cities && (cities.map(city => (
          <option value={city} key={city}>{city}</option>
        )))}
      </select>

      {selectedCity && (
        <h4>You selected
          <span className='highlight'> {selectedCity}</span>,
          <span className='normal'>{` ${selectedState}, ${selectedCountry}`}</span>
        </h4>
      )}

    </div>
  );
}

export default App;