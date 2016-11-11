$(document).ready(function() {
  ASQ()
  .then(function getIpInfo (done) {
    $.get("http://ipinfo.io", function successIp(ipInfo) {
      var coord = ipInfo.loc.split(",");
      coord[0] = Math.floor(coord[0]);
      coord[1] = Math.floor(coord[1]);
      done(coord);
    }, "jsonp");
  })
  .then(function getWeatherInfo(done, msg) {
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + msg[0] + "&lon=" + msg[1] + "&units=imperial&appid=5988ce438f59f323b9dae89d30886c85";
    $.get(url, function successWeather(weatherInfo) {
      done(weatherInfo);
    }, "jsonp")
  })
  .then(function(done, msg) {
    var weatherFeed = {};

    weatherFeed.city = msg.name;
    weatherFeed.country = msg.sys.country;
    weatherFeed.temp = msg.main.temp;
    weatherFeed.conditions = msg.weather[0].main;
    weatherFeed.iconUrl = "http://openweathermap.org/img/w/" + msg.weather[0].icon + ".png";
    $("#weather-feed > h2").html(weatherFeed.city + ", " + weatherFeed.country);
    $("#weather-feed > h3").html(weatherFeed.temp + " and " + weatherFeed.conditions)
    .append("<img src=" + weatherFeed.iconUrl + " >");
  });
});