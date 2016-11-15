$(document).ready(function loadApp() {
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
    function convertToC() {
      $("#temp").html(msg.temp + String.fromCharCode(176));
      $("#fahrenheit").css("color", "blue");
      $("#celsius").css("color", "black");
    }

    function convertToF() {
      var celsius = Math.round((msg.temp - 32) * (5/9));
      $("#temp").html(celsius + String.fromCharCode(176));
      $("#fahrenheit").css("color", "black");
      $("#celsius").css("color", "blue");
    }

    $("#location").html(msg.city + ", " + msg.country);
    $("#temp").html(msg.temp + String.fromCharCode(176))
    $("#weather-icon").attr("src", msg.iconUrl);
    $("#conditions").html(msg.conditions);
    $("#fahrenheit").click(convertToC);
    $("#celsius").click(convertToF);
  }

  var citiesArr = ["honolulu", "vancouver", "houston", "new-york"]

  ASQ()
  .then(getIpInfo)
  .then(getWeather)
  .val(updateFeed);
});
