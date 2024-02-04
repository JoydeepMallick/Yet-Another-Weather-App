const express = require("express");
const axios = require("axios");
require("dotenv").config()

const app = express();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const IMAGE_API_KEY = process.env.IMAGE_API_KEY;
const port = 3000

app.use(express.static("public"));
app.use(express.json());

app.listen(port, () => console.log(`Listening at port ${port}`));

app.post('/weather', async (req, res) => {
  const city = req.body.city;
  console.log('City:', city);
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`);
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    const statusCode = error.response ? error.response.status : 500;
    console.log(statusCode)
    res.status(statusCode).json({ cod: statusCode, error: 'An error occurred while fetching weather data.' });
  } 
})




	


app.post('/image', async (req, res) => {
  const location = req.body.city;
  const options = {
		method: 'POST',
    url : 'https://google-api31.p.rapidapi.com/imagesearch',
		headers: {
			'content-type': 'application/json',
			'X-RapidAPI-Key': IMAGE_API_KEY,
			'X-RapidAPI-Host': 'google-api31.p.rapidapi.com'
		},
		data: {
			text: location.toUpperCase() + " location sightseeing landmarks",
			safesearch: 'on',
			region: 'wt-wt',
			color: '',
			size: 'Wallpaper',
			type_image: 'photo',
			layout: 'Wide',
			max_results: 5
		}
	};
  try {
    const response = await axios.request(options);
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    const statusCode = error.response ? error.response.status : 500;
    console.log(statusCode)
    res.status(statusCode).json({ cod: statusCode, error: 'An error occurred while fetching image.' });
  }
})

