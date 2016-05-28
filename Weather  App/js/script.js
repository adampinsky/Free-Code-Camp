var API_BASE = 'http://api.openweathermap.org/data/2.5/weather',
    ICON_BASE = 'http://openweathermap.org/img/w/',
    API_KEY = '&APPID=953a55777ad83a6f7e1acda8b1d811c3',
    UNITS = '&units=imperial',
    IMPERIAL = true;

//*************Set Text and Color of .temp Text Dynamiclly*****************
function setTempColor(t) {
    if (t > 105) {return 'rgb(125,0,0)';}
    else if (t > 90) {return 'rgb(250,0,0)';}
    else if (t > 75) {return 'rgb(250,125,125)';}
    else if (t > 55) {return 'rgb(250,250,125)';}
    else if (t > 35) {return 'rgb(125,250,250)';}
    else if (t > 15) {return 'rgb(0,125,250)';}
    else {return 'rgb(0,0,125)';}
}

function setTemp(t) {
    if ($('#temp').hasClass('c')) {
        t = ((t-32)*5)/9;
    }
    $('#temp').html(t.toFixed());
}

//*************Set the DOM with JSON data****called by .getWeather()*************
function setWeatherInfo(data) {
    var icon = data.weather[0].icon;
    var city = data.name;
    var temp = data.main.temp;//fahrenheit
    var weather = data.weather[0].main;
    var tempVal = parseFloat(temp);
    
    $('#icon').attr('src', 'http://openweathermap.org/img/w/'+icon+'.png');
    
    $('#city').html(city);

    $('#weather').html(weather);
    
    var tempColor = setTempColor(temp);
    $('#temp').html(tempVal.toFixed()).css('color', tempColor);
    
    $('.btn-toggle').click(function() {
        $(this).find('.btn').toggleClass('btn-default btn-info active');
        $('#temp').toggleClass('f c');
        setTemp(tempVal);
    });
    // handle radio units of measure switch
}

//****************** call to Weather API ***** called by .success() ****************
function getWeather(lat, lon) {
    var API_URL = API_BASE + "?lat=" + lat + "&lon=" + lon + API_KEY + UNITS;
    $.get(API_URL, function(data) {
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
