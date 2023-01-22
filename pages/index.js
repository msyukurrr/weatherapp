import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});
  const [weather, setWeather] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  var apiKey = "b96c04a9bbed25883f0189d4638238c9";
  var lang = "eng";
  var units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang=${lang}`

  const searchLocation = (event) => {
    if(event.key === "Enter"){
      axios.get(url)
      .then((response) => {
        console.clear();
        setData(response.data)
        console.log(response.data);
        setWeather(response.data.weather);
        setErrorMessage("")
      }).catch(err => {
        console.log(err);
        setErrorMessage("Please enter another location");
        setData({});
        setWeather();
      })
      setLocation('')
    }
  }

  return (
    <>
      <Head>
        <title>Current Weather</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.app}>
        
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyDown={searchLocation}
          type='text'
          className={styles.inputbox}
        />

        {
          weather && weather.map((w, index) => {
            return(
              <div className={styles.weatherbox} key={index}>
                {(typeof w.main != "undefined") ? (
                <div className={styles.word}>
                  <div className={styles.city}>{data.name}, {data.sys.country}</div>
                  <div className={styles.description}>{w.description}</div>
                  <div className={styles.weather}>{w.main}</div>
               <div className={styles.tempbox}>
                 <div className={styles.box1}>
                    <div className={styles.maintemp}>Temperature</div>
                    <div className={styles.temp}>{Math.round(data.main.temp)}°C</div>
                  </div>
                  <div className={styles.box2}>
                    <div className={styles.feeltext}>Feels Like</div>
                    <div className={styles.feelslike}>{Math.round(data.main.feels_like)}°C</div>
                  </div>
              </div>
                  <div className={styles.box3}>
                    <div className={styles.wind}>Wind Speed</div>
                    <div className={styles.speed}>{data.wind.speed}m/s</div>
                  </div>
              </div>
                ) : ('')}
               
      
              </div>
            )
          })
        }
      </main>

    </>
  )
}
