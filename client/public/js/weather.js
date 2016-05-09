$(function(){
  $weatherSearch = $("#weather-search");
  $weatherData = $("#weather-data");
  var city;
  $temperature = $("#temp");

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
              var $newTemp = $("<div>");
              $newTemp.addClass("temp");
              $newTemp.text("It is " + data.main.temp + " degrees F in " + city);
              $newTemp.html

              $weatherData.append( $newTemp );
              console.log(data.main.temp);

              $temperature = $newTemp;

              $temperature.click(function(e){
                $.ajax({ method: "post",
                         url: "/weather",
                         data: { weather:{
                                  location: city,
                                  temperature: data.main.temp
                                  }
                         }
                      }).success( function(data){
                        console.log("data for " + city + " saved!");
                      });
              });
          });
  }); // weatherSearch
})
