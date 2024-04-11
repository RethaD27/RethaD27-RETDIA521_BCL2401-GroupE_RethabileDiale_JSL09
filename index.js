// Fetch a random landscape-oriented nature photo from Unsplash API
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        // Set the background image of the document body to the fetched image
        document.body.style.backgroundImage = `url(${data.urls.regular})`;
        // Set the author name in the HTML element with id "author"
        document.getElementById("author").textContent = `By: ${data.user.name}`; 
    })
    .catch(err => {
        // If an error occurs, use a default background image and author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080)`;
        document.getElementById("author").textContent = `By: Rethabile Diale`;
     }) 
    
// Fetch Dogecoin data from CoinGecko API     
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
         if (!res.ok) {
             throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        // Display Dogecoin data in the HTML
        document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `     
    document.getElementById ("crypto").innerHTML += `
        <p>🎯: $${data.market_data.current_price.usd}</p>
        <p>👆: $${data.market_data.high_24h.usd}</p>
        <p>👇: $${data.market_data.low_24h.usd}</p>  
    `         
 })
 .catch(err => console.error(err));
 
 // Function to update the current time every second
function getCurrentTime() { 
const date = new Date()
document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

// Set an interval to update it every second
setInterval(getCurrentTime, 1000)
 
// Fetch weather data based on current geolocation
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
         .then(res => {
            if (!res.ok) {
               throw Error("Weather data not available")
             }
             return res.json()
         })
         .then(data => {
            // Display weather data in the HTML
             const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
             document.getElementById("weather").innerHTML = `
                 <img src=${iconUrl} />
                 <p class="weather-temp">${Math.round(data.main.temp)}°</p>
                 <p class="weather-city">${data.name}</p>
               `
           })
           .catch(err => console.error(err))
 });
 