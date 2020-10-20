// 	d68f94524e5163da9293e572573751da

// http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b1b15e88fa797225412429c1c50c122a&apikey=d68f94524e5163da9293e572573751da
//api.openweathermap.org/data/2.5/weather?lat=35&lon=139
var API_KEY = "d68f94524e5163da9293e572573751da";
var TEMP_MODE = "CELSIUS";

$(document).ready(function(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(gotPos);
  }
});


function gotPos(position){
  /*$("#longitude").html("Longitude: "+position.coords.longitude);
  $("#latitude").html("Latitude: "+position.coords.latitude);*/
  
  $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&appid=b1b15e88fa797225412429c1c50c122a&apikey="+API_KEY, function(data){
    
    $("#city").html("<h3>"+data.name+", "+data.sys.country+": </h3>");
    
    var imgsrc = "";
    if(data.weather[0].id == 800){ // CLEAR WEATHER
      imgsrc = "https://ichef.bbci.co.uk/bbcle/images/width/live/p0/2g/j1/p02gj1yz.jpg/488";
    }
    else if(data.weather[0].id == 802){
      imgsrc = "";
    }
    
    var temp = convertKtoC(data.main.temp);
    $("#temperature").html(temp + "C");
    
    $("#weather").html(data.weather[0].main + "<br><img src='"+imgsrc+"' style='height:100px; width:auto;' alt='Weather Symbol.'>");
    $(".hidden").removeClass("hidden");
  });
}

$("#change-temp-mode").on("click", function(e){
  e.preventDefault();
  var temp = parseFloat( $("#temperature").html() );
  if(TEMP_MODE == "CELSIUS"){
    $("#temperature").html(convertCtoF(temp)+"F");
    TEMP_MODE = "FAHRENHEIT";
  }
  else{
    $("#temperature").html(convertFtoC(temp)+"C");
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