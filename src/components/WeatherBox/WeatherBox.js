import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = () => {

  const [cityWeather, setCityWeather] = useState('');
  const [pending, setPending] = useState(false);

  const handleCityChange = useCallback(city => {
    console.log('cityName', city)

    setPending(true);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5a933e87ff045951fe7684d7aa6b0815&units=metric`)
    .then(res => res.json())
    .then(data => {
      console.log(data);

    const weatherData = {
      city: data.name,
      temp: data.main.temp,
      icon: data.weather[0].icon,
      description: data.weather[0].main
};

setCityWeather(weatherData);
setPending(false);
    });
  }, []);



  return (
    <section>
      <PickCity action={handleCityChange} />
      {(cityWeather && !pending) ? <WeatherSummary {...cityWeather}/> : pending && <Loader />}
    </section>
  )
};

export default WeatherBox;