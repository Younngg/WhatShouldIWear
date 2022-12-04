import React, { useEffect, useState } from 'react';
import { getGeoWeather } from './../../service/weatherAPI';
import useClothes from './../../hooks/useClothes';
import './todayWeather.css';

const TodayWeather = () => {
  const date = new Date();
  const [weather, setWeather] = useState({
    temp: 0,
    feels_like: 0,
    weather: '',
    place: '',
  });
  const clothes = useClothes(weather.temp);

  useEffect(() => {
    getGeoWeather((data: any) => {
      setWeather({
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        weather: data.weather[0].description,
        place: data.name,
      });
    });
  }, []);

  return (
    <div className='mb-5 today-weather d-flex'>
      <div className='left-box'>
        <div className='todays-date'>{date.toLocaleDateString('ko-kr')}</div>
        <div>
          <div>위치 : {weather.place}</div>
          <div className='d-flex weather'>
            <div className='temp'>{weather.temp}°</div>
            <div>
              <div>{weather.weather}</div>
              <div>체감 {weather.feels_like}°</div>
            </div>
          </div>
        </div>
      </div>
      <div className='align-self-start recommend-message-box'>
        <div className='recommend-message mb-2'>오늘 추천하는 옷은...</div>
        <div>{clothes}</div>
      </div>
      <span className='info-message'>
        * 날씨나 위치가 정확하지 않을 수 있습니다.
      </span>
    </div>
  );
};

export default TodayWeather;
