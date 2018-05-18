import React from 'react';

import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = "591466f240ccdef0581e14835732bc6d";   // App API key

class App extends React.Component {

  // Set default state of variables
  state = {
    city: undefined,
    country: undefined,
    temperature: undefined,
    wind: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  
  // Function to fetch weather from the OpenMap API
  getWeather = async (e) => {
    e.preventDefault();   // Prevent default behaviour of complete page refresh

    // Form variables
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    
    if(city && country) {

      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&unit=metric`);
      const data = await api_call.json();
      // console.log(data);
    
      // Set new state of the variables
      this.setState({
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        wind: data.wind.speed,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
        // Set new state of the variables
        this.setState({
          city: undefined,
          country: undefined,
          temperature: undefined,
          wind: undefined,
          humidity: undefined,
          description: undefined,
          error: "Please enter the values."
        });
      }
  }


  render() {
    return (
      <div>
        <Titles />

        <Form getWeather={this.getWeather}/>

        <Weather 
        city={this.state.city}
        country={this.state.country}
        temperature={this.state.temperature}
        temp_max={this.state.temp_max}
        temp_min={this.state.temp_min}
        wind={this.state.wind}
        humidity={this.state.humidity}
        description={this.state.description}
        error={this.state.error}
        />

      </div>
    );
  }
};

export default App;