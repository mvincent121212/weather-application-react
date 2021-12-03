import React from 'react';
import '../styles/weather.css';

const WeatherInfo = (props) => {
    const { temp, humidity, desc, city} = props.data;
    return (
        <React.Fragment>
            <h3>{desc}</h3>
            <section className='weather-data-flex'>
                <div className='header-description'>
                    <h4>City</h4>
                    <p className='description-value city-value'>{city}</p>
                </div>
                <div className='header-description'>
                    <h4>Temperature</h4>
                    <p className='description-value temp-value'>{temp}<span className='degree-symbol'>F</span></p>
                </div>
                <div className='header-description'>
                    <h4>Humidity</h4>
                    <p className='description-value hum-value'>{humidity}</p>
                </div>
            </section>

        </React.Fragment>

    );
}

export default WeatherInfo;