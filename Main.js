import React, { useState } from "react"
import Header from "./Header"
import axios from "axios"
import Content from "./Content"
import WeatherSearch from "./WeatherSearch"
import WeatherData from "./WeatherData"
import Context from "../Context"
import Error from "./Error"
import DateTime from "./DateTime"
import TagLine from "./TagLine"
import Footer from "./Footer"

const Main= () =>
{
    const [weather,setweather]=useState()
    const [city,setcity]=useState()
    const [error,seterror]=useState()
    const api_call = async e =>
    {
        console.log(e.target.elements);
        
        e.preventDefault()
        const location = e.target.elements.location.value
        if(!location)
        return seterror("enter proper city name"),setweather(null)
        const API_KEY="73491a30c4f32e5c4b01fedce1bd13ef"
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
        const request=axios.get(url)
        const response= await request
            
        setweather(response.data.main)
        setcity(response.data.name)
        seterror(null)
        
    }

    // weather && console.log(weather);
    
    return (
        <div className="main">
            <Header />
            <Content>
            <DateTime />
            <TagLine />
            <Context.Provider value={{api_call,weather,city}}>

            <WeatherSearch />
         {  weather && <WeatherData /> }
                {error && <Error error={error} />}
         
            </Context.Provider>
            <Footer />
            </Content>
        </div>
    )
}
export default Main