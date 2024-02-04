
const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const locationNotFound = document.querySelector('.not-found');
const locationHide = document.querySelector('.location-hide');


document.querySelector('.search-box input').addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === "Enter") {
        searchButton.click();
    }
});


searchButton.addEventListener('click', () => {
	
	const city = document.querySelector('.search-box input').value;
	console.log("User entered city : ", city);
	if(city.trim() === ''){
		container.style.height = '400px';
		weatherBox.classList.remove('active');
		weatherDetails.classList.remove('active');
		locationNotFound.classList.add('active');
		const image = locationNotFound.querySelector('img');
		const msg = locationNotFound.querySelector('p');
		image.src = './img/meme.gif';
		msg.innerHTML = ''

		document.body.style.backgroundImage = `url('./img/background.jpg')`;
		return;
	};

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ city: city })
	};
	
	fetch('/weather', options)
	.then(response => response.json() )
	.then(json => {
		console.log(json);
		locationHide.textContent = city;
		if(json.cod == '404'){
			// reduce box height of  display a little to make it look more dynamic
			container.style.height = '400px';
			weatherBox.classList.remove('active');
			weatherDetails.classList.remove('active');
			locationNotFound.classList.add('active');
			//since it might get overriden by meme we need to override the messafes again
			const image = locationNotFound.querySelector('img');
			const msg = locationNotFound.querySelector('p');
			image.src = './img/404.png';
			msg.innerHTML = "Oh no! Couldn't find the location! 😿Typo probably."

			document.body.style.backgroundImage = `url('./img/background.jpg')`;
			return;
		}

		// since location was a valid one set the location not found to inactive and others as active
		container.style.height = '555px';
		weatherBox.classList.add('active');
		weatherDetails.classList.add('active');
		locationNotFound.classList.remove('active');
			
		//update the background image
		fetchLocationImage(city, options);

		const image = document.querySelector('.weather-box img');
		const temperature = document.querySelector('.weather-box .temperature');
		const desription = document.querySelector('.weather-box .description');
		const humidity = document.querySelector('.weather-details .humidity span');
		const wind = document.querySelector('.weather-details .wind span');
		const pressure = document.querySelector('.weather-details .pressure span');
		const visibility = document.querySelector('.weather-details .visibility span');

		switch (json.weather[0].main) {
			case 'Clear':
				image.src ='./img/clear.png'
				break;
			case 'Rain':
				image.src ='./img/rain.png'
				break;
			case 'Snow':
				image.src ='./img/snow.png'
				break;
			case 'Clouds':
				image.src ='./img/cloud.png'
				break;
			case 'Mist':
				image.src ='./img/mist.png'
				break;
			case 'Haze':
				image.src ='./img/haze.png'
				break;
			default:
				image.src = './img/clear.png';
		}

		temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
		desription.innerHTML = `${json.weather[0].description}`;
		humidity.innerHTML = `${json.main.humidity}%`
		wind.innerHTML = `${parseFloat(json.wind.speed)}km/h`;
		pressure.innerHTML = `${json.main.pressure}hPa`;
		visibility.innerHTML = `${json.visibility}m`;
	});
})


//TODO : Background image changer
async function fetchLocationImage(location, options){
	try {
		const response = await fetch('/image', options);
		if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
		const imageresult = await response.json();
		//randomly select from top 5 list of images which should be most relevant
		const ind = Math.floor(Math.random() * 5);
		const newImageUrl = imageresult.result[ind].image;
		console.log("index : ",ind,"location : ", location, "url : ", newImageUrl);
		
		document.body.style.backgroundImage = `url('${newImageUrl}')`;

	} catch (error) {
		console.error("Error fetching image :",error);
	}
}
