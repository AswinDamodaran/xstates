import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity,setSelectedCity]=useState("")

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          "https://crio-location-selector.onrender.com/countries"
        );
        setCountry(res.data);
      } catch (err) {
        console.log("could not fetch data", err);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      
        try {
          const res = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
          setState(res.data)
        } catch (err) {
          console.log("could not fetch states",err)
        }
    };
    if (selectedCountry) {
      fetchStates()
    }
  }, [selectedCountry]);

  useEffect(()=>{
    const fetchCities=async ()=>{
      try{
        const res=await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        setCity(res.data)
      }catch(err){
        console.log("could not fetch cities",err)
      }
    }
    if(selectedCountry && selectedState){
      fetchCities()
    }
  },[selectedCountry,selectedState])

  return (
    <div className="App">
      <h1>Select Location</h1>
      <select
        className="dropdownbox"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option style={{ color: "#EBEBE4 " }} value="" disabled>
          Select Country
        </option>
        {country.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <select
        className="dropdownbox"
        disabled={!selectedCountry}
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
      >
        <option style={{ color: "#EBEBE4 " }} value="" disabled>
          Select State
        </option>
        {state.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      <select
        className="dropdownbox"
        value={selectedCity}
        disabled={!selectedState}
        onChange={(e)=> setSelectedCity(e.target.value)}
        
      >
        <option style={{ color: "#EBEBE4 " }} value="" disabled>
          Select City
        </option>
        {city.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      {selectedCity && (
        <div>
          <h2>You Selected <span style={{fontSize:30}} >{selectedCountry}</span>, <span style={{color:"#808080"}}>{selectedState},{selectedCity}</span></h2>
        </div>
      )}
    </div>
  );
}

export default App;
