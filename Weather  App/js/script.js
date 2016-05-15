var API_BASE = 'http://api.openweathermap.org/data/2.5/weather',
    ICON_BASE = 'http://openweathermap.org/img/w/',
    API_KEY = '&APPID=953a55777ad83a6f7e1acda8b1d811c3',
    UNITS = '&units=imperial',
    IMPERIAL = true;



//*************Fahrenheit/Celsius Selection Switch Event Handler************


//*************Set the DOM with JSON data****called by .getWeather()*************
function setWeatherInfo(data) {
  //get and set .icon img
    var icon = data.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
    $('#icon').attr('src', iconURL);
  //get and set .city text
    $('#city').html(data.name);
  //get and set .weather text    
   var weatherID = data.weather[0].id;
   switch(weatherID) {
           
   } $('#weather').addClass(data.weather[0].id);
    $('#weather').html(data.weather[0].main);
    
  //get and set .temp text
    var fahrenheit = data.main.temp;
    var celsius = ((fahrenheit-32)*5)/9;
    var fRadio = $('#radioF');
    var cRadio = $('#radioC');
    var t = Math.round(fahrenheit);
    
    //set dynamic color of .temp text
    function setTempColor(t) {
        var tColor;
        switch t {
            case t > 105:
                tColor = 'rgb(125,0,0)';
                break;
            case t > 90:
                tColor = 'rgb(250,0,0)';
                break;
            case t > 75:
                tColor = 'rgb(250,125,125)';
                break;
            case t > 55:
            default:
                tColor = 'rgb(250,250,125)';
                break;
            case t > 35:
                tColor = 'rgb(125,250,250)';
                break;
            case t > 15:
                tColor = 'rgb(0,125,250)';
                break;
            case t <= 15:
                tColor = 'rgb(0,0,125)';
                break;
        }
        $('#temp').css('color', tColor);
    }
   
   // handle radio units of measure switch
    $('input[type=radio]').each(function() {
        $(this).addEventListener('click', function() {
            $('label').each(function() {
                $(this).toggleClass('active');
            });
            if($('#radioC') === $(this)) {
                $('#radioF').prop('checked', false);
                $('#radioC').prop('checked', true);
                t = Math.round(celsius).toString;
            } else {
                $('#radioC').prop('checked', false);
                $('#radioF').prop('checked', true);
                t = Math.round(fahrenheit).toString;
            }
            $('#temp').html(t);
            setTempColor(t);
        });
    });
  
    $('#temp').html(t);
    setTempColor(t);
}

//****************** call to Weather API ***** called by .success() ****************
function getWeather(lat, lon) {
    var API_URL = API_BASE + "?lat=" + lat + "&lon=" + lon + API_KEY + UNITS;
    $.get(API_URL, function(data) {
        console.log(data);
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
