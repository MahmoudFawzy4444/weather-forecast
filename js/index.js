//--------------------Current Date-------------------------///
const dayName = (date, locale) =>
  date.toLocaleDateString(locale, { weekday: "long" });
var currentDay = dayName(new Date());
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

var secondDay = dayName(tomorrow);
var nextTomorrow = new Date();
nextTomorrow.setDate(tomorrow.getDate() + 1);
console.log(nextTomorrow);
console.log(tomorrow);
var thirdDay = dayName(nextTomorrow);

var currentMonth = new Date().toLocaleString("default", { month: "long" });
document.getElementById("monthTxt").textContent =
  new Date().getDay() + " " + currentMonth;
document.getElementById("firstDay").textContent = currentDay;
document.getElementById("secondDay").textContent = secondDay;
document.getElementById("thirdDay").textContent = thirdDay;

//---------------------end of current date--------------------------////

//------------------------Show Data-----------------------------//
async function showWeatherData() {
  var firstDayBlock = document.querySelector("div.first-day");
  var nextDay = document.getElementById("nextDay");
  var nextDayDiv = document.getElementById("nextDayDiv");
  var thirdDayData = document.getElementById("thirdDayData");
  var thirdDayDiv = document.getElementById("thirdDayDiv");
  var response = await getWeatherData(this.value);
  var data = await response.json();
  if (response.ok) {
    //----------Current Day---------------------------//
    firstDayBlock.firstElementChild.textContent = data.location.name;
    firstDayBlock.querySelector("img").src = data.current.condition.icon;
    document.getElementById(
      "weatherNum"
    ).textContent = `${data.current.temp_c}°C`;
    firstDayBlock.querySelector("p").textContent = data.current.condition.text;
    //----------Next Day---------------------------//
    nextDay.textContent = `${data.forecast.forecastday[1].day.maxtemp_c}°C`;
    nextDay.nextElementSibling.textContent = `${data.forecast.forecastday[1].day.mintemp_c}°C`;
    nextDay.nextElementSibling.nextElementSibling.textContent =
      data.forecast.forecastday[1].day.condition.text;
    nextDayDiv.querySelector("img").src =
      data.forecast.forecastday[1].day.condition.icon;
    //----------Third Day---------------------------//
    thirdDayData.textContent = `${data.forecast.forecastday[2].day.maxtemp_c}°C`;
    thirdDayData.nextElementSibling.textContent = `${data.forecast.forecastday[2].day.mintemp_c}°C`;
    thirdDayData.nextElementSibling.nextElementSibling.textContent =
      data.forecast.forecastday[2].day.condition.text;
    console.log(data.forecast.forecastday[2].day.condition.text);
    thirdDayDiv.querySelector("img").src =
      data.forecast.forecastday[2].day.condition.icon;
  }
  console.log(data);
}

//-------------------------Current Location ------------------///

var myLocationLat = 0;
var myLocationLong = 0;
if ("geolocation" in navigator) {
  // get current position
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  console.log("Geolocation is not supported by this browser.");
}
function showPosition(position) {
  //   log latitude and longitude

  myLocationLat = position.coords.latitude;
  myLocationLong = position.coords.longitude;
  showWeatherData();
}

//-------------------------Toggle input Change------------------///

var locationInput = document.getElementById("location");
locationInput.addEventListener("input", showWeatherData);

//------------------API Calling

async function getWeatherData(city, lat, long) {
  lat = myLocationLat || 0;
  long = myLocationLong || 0;
  if (lat != 0 && long != 0) {
    var response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=9ed43c3b6ec24b0babf130807241110&q=${
        (lat, long)
      }&days=3&aqi=no&alerts=no`
    );
    myLocationLat = 0;
    myLocationLong = 0;
    return response;
  }
  var response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=9ed43c3b6ec24b0babf130807241110&q=${city}&days=3&aqi=no&alerts=no`
  );
  return response;
}
