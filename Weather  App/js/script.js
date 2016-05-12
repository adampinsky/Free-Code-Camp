document.ready(function() {
  var API_BASE = 'http://api.openweathermap.org/data/2.5/weather';
  var ICON_BASE = 'http://openweathermap.org/img/w/';
  var API_KEY = '&APPID=953a55777ad83a6f7e1acda8b1d811c3';
  var UNITS = '&units=imperial';
  var imperial = true;
    
    
  //*************Set the DOM with JSON data****called by .getWeather()*************
  function setWeatherInfo(data) {
      //get and set .icon img
      var iconURL = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      document.getElementById('icon').attr('src', iconURL);
      //get and set .city text
      document.getElementById('city').innerHTML = data.name;
      //get and set .temp text
      var t = parseInt(data.main.temp);
      document.getElementById('temp').innerHTML = t.toString;
      //set dynamic color of .temp text
      var tColor;
      switch (t) {
          case t>105:
              tColor = 'rgb(125,0,0)';
              break;
          case t>90 && t<==105:
              tColor = 'rgb(250,0,0)';
              break;
          case t>75 && t<==90:
              tColor = 'rgb(250,125,125)';
              break;
          case t>55 && t<==75:
          default:
              tColor = 'rgb(250,250,125)';
              break;
          case t>35 && t<==55:
              tColor = 'rgb(125,250,250)';
              break;
          case t>15 && t<==35:
              tColor = 'rgb(0,125,250)';
              break;
          case t < 15:
              tColor = 'rgb(0,0,125)';
              break;
      }
      document.getElementById('temp').css("color", tColor);
    }

  //****************** call to Weather API ***** called by .success() ****************
  function getWeather(lat, lon) {
    var API_URL = API_BASE + "?lat=" + lat + "&lon=" + lon + API_KEY + UNITS;
    $.getJSON(API_URL, function(data) {
        setWeatherInfo(data);
    });
  }

  //************** navigator callback function *************
  function success(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    getWeather(lat, lon);
  }

  //******************* get location ****************
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success);
  } else {
    document.getElementById("city").innerHTML = "Geolocation is not available";
  }
});