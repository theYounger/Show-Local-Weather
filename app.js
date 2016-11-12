function getIpInfo (done) {
  $.get("http://ipinfo.io", function successIp(ipInfo) {
    var ipCoord = ipInfo.loc.split(",");
    done(ipCoord);
  }, "jsonp");
}

function getWeather(done, msg) {
  function successWeather(data) {
    var weather = {};
    weather.city = data.name;
    weather.country = data.sys.country;
    weather.temp = Math.round(data.main.temp);
    weather.conditions = data.weather[0].main;
    weather.iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    done(weather);
  }
  var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + msg[0] + "&lon=" + msg[1] + "&units=imperial&appid=5988ce438f59f323b9dae89d30886c85";

  $.get(url, successWeather, "jsonp")
}
function updateFeed(msg) {
  $("#weather-feed > h2").html(msg.city + ", " + msg.country);
  $("#weather-feed > h3").html(msg.temp + String.fromCharCode(176)  + " and " + msg.conditions)
  .append("<img src=" + msg.iconUrl + " >");
}

function preweather(coord) {
  ASQ(coord)
    .then(getWeather)
    .val(updateFeed);
}
// function checkWeatherCode

// $(document).ready(function() {
//   ASQ()
//   .then(getIpInfo)
//   .then(getWeather)
//   .val(updateFeed);
// });