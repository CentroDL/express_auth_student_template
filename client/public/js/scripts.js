$(function() {
console.log('scripts loaded...');

// set all of our selectors for later use
$loginForm     = $("#login-form");
$weatherForm   = $("#weather-form");
$weatherSearch = $("#weather-search");
$pastSearches  = $("#past-searches");
$signupLink    = $("#signup-link");
$logoutLink    = $("#logout-link");

// takes some weather json from our server and renders it
var renderWeather = function(weather){
  var $newTemp = $("<li>");
  $newTemp.addClass("temp");
  $newTemp.text("It is " + weather.temperature + " degrees F in " + weather.location);

  $pastSearches.append( $newTemp );

}; // renderWeather

var setUpPage = function(){

  $loginForm.hide();
  $signupLink.hide();

  $logoutLink.show();
  $weatherForm.show();

  $.ajax({ url: "/weather",
        method: "get"
  }).success(function(data){
      console.log(data);
      data.forEach( renderWeather );
  });

};

//check if the user's logged in
if( Cookies.get("jwt_token") ){
  setUpPage();
}

$loginForm.submit( function(e){
  e.preventDefault();

  $.post({    url: "/api/auth",
           method: "post",
           data: {
            username: $loginForm.find("[name=username]").val(),
            password: $loginForm.find("[name=password]").val()
           }
  }).success(function(data){
    // console.log(data);
    if(data.token){

      Cookies.set("jwt_token", data.token);

      setUpPage();

    } else {
      console.log("ERROR LOGGING IN");
    }
  });

});


$weatherSearch.submit(function(event){
  event.preventDefault();

  city = $weatherSearch.find("[name=weather]").val();

  $.ajax({ method: "get",
            url: "http://api.openweathermap.org/data/2.5/weather",
            data: {
              APPID: "5b1905b06d945f075964d9a6cc74dc98",
              q: city,
              units: "imperial"
            }
        }).success( function(data){
            // saving on our server under the current user
            $.ajax({ method: "post",
                     url: "/weather",
                     data: { weather:{
                              location: city,
                              temperature: data.main.temp
                              }
                     }
                  }).success( renderWeather );
        });
}); // weatherSearch

$logoutLink.click(function(e){
    Cookies.remove("jwt_token");
    location.reload();
});

}); // jQuery onLoad



















