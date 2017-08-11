$(document).ready(function() {
  var city = "";
  var country = "";
  var lat = "";
  var long = "";
  var degreeUnit = "";

  //Selects background image based on weather conditions in the area
  function weatherPicture(icon) {
    var backgroundPicture='';
    switch (icon) {
      case "01d":
      case "01n":
        backgroundPicture = 'http://leverhawk.com/wp-content/uploads/2013/09/iStock_000012580113Medium.jpg';
        break;
      case "02d":
      case "02n":
      case "03d":
      case "03n":
        backgroundPicture = 'https://photos.travelblog.org/Photos/42353/218031/f/1665835-Overcast-Sydney-0.jpg';
        break;
      case "04d":
      case "04n":
        backgroundPicture = 'http://www.wallpaperscharlie.com/wp-content/uploads/2016/07/Cloudy-Weather-HD-Wallpapers-3.jpg';
        break;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        backgroundPicture = 'https://www.scienceabc.com/wp-content/uploads/2015/05/Walking-in-Rain.jpg';
        break;
      case "11d":
      case "11n":
        backgroundPicture = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/368633/thunderstorm.jpg';
        break;
      case "13d":
      case "13n":
        backgroundPicture = 'https://vignette4.wikia.nocookie.net/phobia/images/a/aa/Snow.jpg/revision/latest?cb=20161109045734';
        break;
      case "50d":
      case "50n":
        backgroundPicture = 'http://img09.deviantart.net/7a76/i/2010/251/8/2/misty_mountain_weather_17_by_sveltephoto-d2ybp03.jpg';
        break;
    }
    return backgroundPicture;
  }
  //sets degree unit based on text in button
  if ($("#unit-convert").text() === "Convert to C") {
    degreeUnit = "imperial";
  } else {
    degreeUnit = "metric";
  }
  //gets local weather data based on information from IP-API
  var getWeatherData = function(unit) {
    var weatherAPIAddress = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=" + unit + "&APPID=364d39566447970d061d017d3f32509f";

    $.getJSON(weatherAPIAddress, function(weatherData) {
      var temp = weatherData.main.temp;
      var icon = weatherData.weather[0].icon;
      var iconAddress = "http://openweathermap.org/img/w/" + icon + ".png";
      var unitLabel = '';
      if (unit === "imperial") {
        unitLabel = "F";
      } else {
        unitLabel = "C";
      }

      $("#weather-icon-degrees").append("<p id='degree-label'><img src=" + iconAddress + "\>" + temp + " " + unitLabel + "</p>");
      $(".weather-container").css('background-image', 'url("' + weatherPicture(icon)+ '")');
    });

  };
  //gets latitude, longitude, country and city information from user
  $.getJSON("http://ip-api.com/json", function(data) {
    if (data["status"] === "success") {
      lat = data.lat;
      long = data.lon;
      city = data.city;
      country = data.country;
      $(".location-description").html("<p>" + city + ", " + country + " (" + lat + "," + long + ")</p>");
      getWeatherData(degreeUnit);
    }
  });
  //changes unit weather data is displayed in on click 
  $("#unit-convert").on("click", function() {
    $("#degree-label").remove();
    var buttonText = $("#unit-convert");
    if (buttonText.text() === "Convert to C") {
      buttonText.text('Convert to F');
      getWeatherData("metric");
    } else {
      buttonText.text('Convert to C');
      getWeatherData("imperial");
    }
  });
});