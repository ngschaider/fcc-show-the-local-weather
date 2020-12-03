// 	d68f94524e5163da9293e572573751da

// http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b1b15e88fa797225412429c1c50c122a&apikey=d68f94524e5163da9293e572573751da
//api.openweathermap.org/data/2.5/weather?lat=35&lon=139
var API_KEY = "d68f94524e5163da9293e572573751da";
var TEMP_MODE = "CELSIUS";

(() => {
  $("#request").click(() => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(gotPos);
    }
  });
})();

function gotPos(position){
    const url = "https://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&appid=b1b15e88fa797225412429c1c50c122a&apikey="+API_KEY;
    $.getJSON(url, data => {
      // set city and country
      $("#city").html("<h3>"+data.name+", "+data.sys.country+": </h3>");

      const iconUrl = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
      
      const temp = convertKtoC(data.main.temp);
      $("#temperature").html(temp + " °C");

      $("#weather").html(data.weather[0].main + "<br><img src='" + iconUrl + "'>");
      $(".container").removeClass("hidden");
      $("#request").addClass("hidden");
    });
}

$("#change-temp-mode").on("click", function(e){
  e.preventDefault();
  var temp = parseFloat( $("#temperature").html() );
  if(TEMP_MODE == "CELSIUS"){
    $("#temperature").html(convertCtoF(temp)+" °F");
    TEMP_MODE = "FAHRENHEIT";
  }
  else{
    $("#temperature").html(convertFtoC(temp)+" °C");
    TEMP_MODE = "CELSIUS";
  }
});


function convertFtoC(f){
  return Math.floor( (f-32)/(9/5), 2);
}
function convertCtoF(c){
  return Math.floor( c*(9/5)+32, 2);
}
function convertKtoC(k){
  return Math.floor(k-273.15, 2);
}
