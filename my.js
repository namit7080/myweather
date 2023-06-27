// function run when submit button click
function handleinput() {
  // fetch the city name
  const cityName = document.getElementById("city").value;
  // api private key
  const apiKey = "26b61213cbc147b4b37174553232606";

  // if city name is not there
  if (cityName.length <= 0) {
    console.log("Invalid");
    return;
  }

  // pass api key and city name
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=1&aqi=yes&alerts=yes`;

  // declare some varaible
  let temp = "";
  let windspeed = "";
  let country = "";
  let time = "";

  // fetch variable to display information
  const countrytag = document.getElementById("country");
  const windtag = document.getElementById("wind");
  const temptag = document.getElementById("temp");
  const timetag = document.getElementById("time");
  const head = document.getElementById("datahead");
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        // if there is some error
        console.log("Bad Request");

        head.innerHTML = "Data is not valid by You";
        countrytag.innerHTML = "Not Valid";
        windtag.innerHTML = "Not Valid";
        temptag.innerHTML = "Not Valid";
        timetag.innerHTML = "Not Valid";
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // store the data in our variable
      country = data.location.country;
      windspeed = data.current.wind_kph;
      temp = data.current.temp_c;
      time = data.location.localtime;
      head.innerHTML = "Weather App";
      countrytag.innerHTML = country;
      windtag.innerHTML = windspeed;
      temptag.innerHTML = temp + " Deg Celcius";
      timetag.innerHTML = time;
      console.log(country + " " + windspeed + " " + temp);
    })
    .catch((error) => {
      // if url not working
      head.innerHTML = "Server Error";
      console.error(error);
    });
}
