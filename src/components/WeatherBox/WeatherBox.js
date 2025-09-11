import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback, useState } from 'react';

const WeatherBox = props => {

  const [weatherInfo, setWeatherInfo] = useState('');
  const [pending, setPending] = useState(false);
  const [error , setError] = useState(false);

  const checkWeather = useCallback((city) => {
    setPending(true)
    setError(false)
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e0779a4d6f940436328729b4b1201cae&units=metric`)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        setError(true)
      }
    })
    .then(data => {
      setPending(false);
      const weatherData = {
        city: data.name,
        temp: data.main.temp,
        icon: data.weather[0].icon,
        description: data.weather[0].main
      };
      setWeatherInfo(weatherData);
    })
    .catch(error => {
      console.log(error);
    });
}, []);

  return (
    <section>
      <PickCity checkWeather={checkWeather}/>
      {(!pending && weatherInfo) &&
      <WeatherSummary 
        name={weatherInfo.city}
        temp={weatherInfo.temp}
        icon={weatherInfo.icon}
        description={weatherInfo.description}
      />}
      { pending &&
      <Loader />}
      {error &&
      <ErrorBox />}
    </section>
  )
};

export default WeatherBox;