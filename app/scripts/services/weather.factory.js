(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name vhEurope.weather.factory
     * @description
     * # weather.factory
     * Service in the vhEurope.
     */
    angular.module('vhEurope')
      .factory('weatherFactory', weatherFactory);

      weatherFactory.$inject =['$http','$q','$translate','$cookieStore'];

      function weatherFactory($http,$q,$translate,$cookieStore) {
        return {
            getWeather: getWeather
        }

        function getWeather ($city, $country_code) {
           var language = $cookieStore.get('NG_TRANSLATE_LANG_KEY');
            var weather = { temp: {}, clouds: null, sys: {}, description: null, pressure: 0, humidity: 0, wind: 0 };
            $http.jsonp('http://api.openweathermap.org/data/2.5/weather?q='+$city+','+$country_code+'&units=metric&callback=JSON_CALLBACK&APPID=f9dbd911bc01df1d9ce563b2ba4d3209&lang='+language)
            .success(function(data) {
              if (data) {

                if (data.main) {

                  var sunrise = new Date(data.sys.sunrise * 1000);
                  var sunset = new Date(data.sys.sunset * 1000); 
                  weather.description = data.weather[0].description;
                  weather.temp.current = data.main.temp;
                  weather.temp.min = data.main.temp_min;
                  weather.temp.max = data.main.temp_max;
                  weather.sys.sunrise = sunrise.getHours() + ":" + ('0' + sunrise.getMinutes()).slice(-2);
                  weather.sys.sunset = sunset.getHours() + ":" + ('0' + sunset.getMinutes()).slice(-2);
                  weather.pressure = data.main.pressure;
                  weather.humidity = data.main.humidity;
                  weather.wind = data.wind.speed;
                }
              weather.clouds = data.clouds ? data.clouds.all : undefined;
            }
          });
        return weather;
        }
      }
})();
