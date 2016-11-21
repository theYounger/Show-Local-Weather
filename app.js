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

    $.get(url, successWeather, "jsonp");
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

  (function fillBtnBox() {
    var cityInfo = [["Honolulu", ["21.30694", "-157.858337"]], ["Vancouver", ["49.24966", "-123.119339"]], ["Houston", ["29.763281", "-95.363274"]], ["New York", ["40.7146", "-74.0071"]], ["Rio de Janeiro", ["-22.9122", "-43.175"]], ["London", ["51.50853","-0.12574"]], ["Cairo", ["30.0499", "31.2486"]], ["Moscow", ["55.75222", "37.615555"]], ["New Delhi", ["28.631", "77.2173"]], ["Beijing", ["116.397232", "39.907501"]], ["Hong Kong", ["22.4426", "114.032"]], ["Tokyo", ["35.689499", "139.691711"]]];

    cityInfo.forEach(function fill(ele) {
      $("<div></div>")
        .click(function preweather() {
          ASQ(ele[1])
            .then(getWeather)
            .val(updateFeed)
          ;
        })
        .html(ele[0])
        .appendTo("#btn-box");
    });
  })();

  // ASQ()
  // .then(getIpInfo)
  // .then(getWeather)
  // .val(updateFeed);

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;

   //triangle gradient
  var gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0.3, "#ADD7A7");
  gradient.addColorStop(1, "#77C5CC");
  ctx.fillStyle = gradient;

   //triangle
  ctx.beginPath();
  ctx.moveTo(3, 0);
  ctx.lineTo(width - 3, 0);
  ctx.quadraticCurveTo(width, 0, width - 3, 6)
  ctx.lineTo(width/2 + 3, height - 6);
  ctx.quadraticCurveTo(width/2, height, width/2 - 3, height - 6);
  ctx.lineTo(3, 6);
  ctx.quadraticCurveTo(0, 0, 3, 0);
  ctx.fill();

   //inner lines of triangle
  for(var i = 0; i < 100; i++) {
    var triSlope = height/(width/2);
    var yCoord = (height/100)*i - 1;
    ctx.fillRect(yCoord/triSlope, yCoord, width - yCoord, (height/100) * (1/4));
    ctx.fillStyle = "silver";
  }
});
