import React, { useState } from "react"
import axios from "axios"

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState("")

  const APIKey = "9ec2562f2debd78e06327a5e2aa0908c"
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${APIKey}`

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation("")
    }
  }

  return (
    <main className="app w-full min-h-screen relative bg-[rgba(0,0,0,0.4)] text-white">
      <div className="text-center pt-10 pb-4">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={searchLocation}
          placeholder="Search city"
          type="text"
          className=" border-2 border-white bg-[rgba(255,255,255,0.2)] rounded-3xl py-3 px-6 text-2xl"
        />
      </div>

      <div className="max-w-[700px] h-[700px] m-auto px-4 relative top-[10%] pt-[70px] flex flex-col  justify-between">
        {/* Top */}

        <div className="w-full my-4 mx-auto">
          <div>
            <p className="text-2xl">{data.name}</p>
            <div>
              {data.main ? (
                <h1 className="text-8xl">{data.main.temp.toFixed()}°F</h1>
              ) : null}
            </div>
            <div className="description relative right-[-40%]">
              {data.weather ? (
                <p className="text-2xl text-center">{data.weather[0].main}</p>
              ) : null}
              {data.weather ? (
                <p className="text-2xl text-center">
                  {data.weather[0].description}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {/* Bottom */}
        {data.name != undefined && (
          <div className="flex items-center justify-evenly w-full my-4 mx-auto p-4 rounded-xl bg-[rgba(255,255,255,0.2)]">
            <div>
              {data.main ? (
                <p className="text-2xl font-bold text-center">
                  {data.main.feels_like.toFixed()}
                </p>
              ) : null}
              <p className="text-center">Feels like</p>
            </div>
            <div>
              {data.main ? (
                <p className="text-2xl font-bold text-center">
                  {data.main.humidity}%
                </p>
              ) : null}
              <p className="text-center">Humidity</p>
            </div>
            <div>
              {data.wind ? (
                <p className="text-2xl font-bold text-center">
                  {data.wind.speed.toFixed()} MpH
                </p>
              ) : null}
              <p className="text-center">Wind speed</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default App
