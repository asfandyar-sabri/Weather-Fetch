const { response } = require("express")
const express = require("express")
const https = require("https")

const app = express()

app.get("/", (req, res) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=a0d2d923b791f120eff3eeb01bc2e9ae&lat=33.565&lon=73.016914&units=metric"

    https.get(url, (response) => {
        console.log(response.statusCode)

        response.on("data", (data)=>{
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather.icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon +  "@2x.png"
            res.write("<h1>The temperature in Rawalpindi is currently " + temp + "</h1>")
            res.write("<p>The weather is currently " + weatherDescription + "</p>")
            res.write("<img src = " + imageURL + ">")
            res.send()
        })
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

