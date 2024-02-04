## How to start

This is a **client-side project** involves **running code in the user's browser (client)**.
    
	
Technologies like HTML, CSS, and JavaScript are used to create the user interface and handle user interactions directly in the browser.
    
Client-side projects often make API requests to fetch data from servers but do not handle the business logic or data processing on the client. The server provides data, and the client-side code displays it.

### Note :-
In such projects, you're limited in terms of hiding sensitive information like API keys because the client-side code is visible to users.


If using VS Code install the rapid API extension.

**_We will use the open weather API to fetch weather data in real time_**


Reference video : https://www.youtube.com/watch?v=QMwyNnjAils

The video had been of great help in learning the basics.

### How to run

1. **(❗Important)** Save your API keys at `api-key.js` file.
	Get the api keys here for [weather](https://openweathermap.org/api) and [image](https://rapidapi.com/rphrp1985/api/google-api31/pricing)
2. Set up this project in VS Code and run live server
3. Your browser will open up with the project running.



## New features added apart from video

<h3> 1. Enter key when pressed will act as click for search button</h3> 

    code block for reference

```javascript    
document.querySelector('.search-box input').addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === "Enter") {
        searchButton.click();
    }
});
    
```





<h3> 2. A simple addition to the search icon to make the user aware that he can press enter also to send the input.</h3> 

    Basic use of title attribute

```html
...
...
<button class="bx bx-search-alt" title="Click me or Press Enter"></button>
...
...
```

<h3> 3. Display of meme when user forcefully enters just spaces and searches😑</h3>  

```javascript
...
...
if(city.trim() === ''){
		// if someone searches for a blank spaces flank him/her with a meme after making location not found active
		container.style.height = '400px';
		weatherBox.classList.remove('active');
		weatherDetails.classList.remove('active');
		locationNotFound.classList.add('active');
		const image = locationNotFound.querySelector('img');
		const msg = locationNotFound.querySelector('p');
		image.src = './img/meme.gif';
		msg.innerHTML = ''
		return;
	};

	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

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
			return;
		}
...
...
```

<h3> 4. Added two more elements Pressure and Humidity</h3>

```html
...
...
<div class="pressure">
<i class="bx bx-vertical-bottom"></i>
<div class="text">
    <div class="info-pressure">
    <span>- hPa</span>
    </div>
    <p>Pressure</p>
</div>
</div>

<div class="visibility">
<i class="bx bxs-low-vision"></i>
<div class="text">
    <div class="info-visibility">
    <span>- m</span>
    </div>
    <p>Visibility</p>
</div>
</div>
...
...
```

<h3> 5. Location when valid the background image will change to some image of that location else revert to default dull image. </h3>







### NOTE :-

Learn to hide api keys by coding server side project using nodejs and using dotenv:-

[Click me](https://www.youtube.com/watch?v=4hkDPrl49KI)