# city-detection branch
The purpose of this branch is to have an efficient city-detection system to offer the client a **direct default selection of the departure city** when he first connects to the app.

---
## General explanations about geolocation
Different technics exist for **geolocation**

The traditional one is done thanks to the **IP adress** of the client ([see explanations below](#with-ip-address)).

But with **HTML5**, an other technic exists today ([see explanations below](#with-html5-geolocation)).

Brief comparison between the two technics:

| 						| Wireless Geolocation				| IP Address Geolocation	|
|:---------------------:|:---------------------------------:|:--------------------------|
| Technology			| MAC Address and Signal Strength	| IP Address				|
| Accuracy				| Medium-High (Street level)		| Medium (City level)		|
| Availability			| Medium (Depends to Data)			| High						|
| Privacy				| Low								| Medium					|
| End-user Permission	| Required							| No						|
| Protocol Restriction	| HTTPS / WSS / etc..				| No (HTTP available)		|
| Browser Compatibility	| HTML 5 and above					| All						|

_source : [IP2location](http://www.ip2location.com/html5geolocationapi.aspx "Wireless Geolocation (HTML 5 Geolocation API) vs. IP Geolocation")_



---
## With IP address
As the Internet is just a huge network, we just have to know the range of IPs which each country / city is associated with.

**BUT**, and that's the tricky part, this association change regularly and we have to know when it does to update our database. That's why it's a huge work and a time expanding operation. And that's why a lot of companies offer to sell you this data in real-time.
_Documentation about the IP addresses and protocol: [IANA](http://www.iana.org/numbers "Number Resources")_

By the way, if we don't need a very precise geolocation, some companies give for free their last month database. And we can check their accuracy depending on the country and the precision we need.

If we decide to use an API service, we have two options to get the city of the client:

+ We get his IP when he first connects to the app and send it to the AngularJS app with the scripts. Then the app sends the request to the API service we chose with the IP adress in argument.

OR

+ We directly send the geolocation request to the API through the AngularJS app. This way we don't have to save the IP and send it back to the front-end. The API service send us back the IP (which is pretty useless with this option...) and the geolocation information: country, city, etc..

#### Services available for geolocation
+ [MaxMind](http://dev.maxmind.com/geoip/): GeoIP seems to be the most efficient API available for geolocation. It also has a cost depending on the number of requests we make each month and the precision desired. See their [pricing page - for city precision](https://www.maxmind.com/en/geoip2-precision-city-service) for more details. They also provide **free databases** updated each month: [GeoLite2](http://dev.maxmind.com/geoip/geoip2/geolite2/). They also provide a software to automatically update the database: [GeoIP Update](http://dev.maxmind.com/geoip/geoipupdate/)
+ [IPinfoDB](http://ipinfodb.com/index.php): seems to be maintained by a community (?). They also provide a **free database** [link to their database](http://ipinfodb.com/ip_database.php)
+ [IP info](http://ipinfo.io/): an other service with free API till 1,000 requests / day (the one I use to test the script)



---
## With HTML5 Geolocation
Thanks to HTML5, Geolocation is now native from the browser. And it's more accurate than the IP address ! Modern browsers allow the JavaScript code to get the geolocation of the client but only with its **coordinates** (_latitude_ and _longitude_). So if we want to get usable location (a city or even a street), we have to do some **geocoding**. In order to do so, different APIs exist:
+ [Flickr App Garden](https://www.flickr.com/services/api/explore/?method=flickr.places.findByLatLon): Free for non-commercial use, we have to ask for information for commercial use. I didn't find a clear pricing page.
+ [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse?hl=fr): 1,000 free requests / day and still free until 150,000 requests / day if we give a credit card (which isn't debited). See details on the [pricing page](https://developers.google.com/maps/pricing-and-plans#details).

**IMPORTANT NOTE ABOUT GOOGLE AND YAHOO API SERVICES**:
Yahoo's limit is per application while Google's limit is per IP which means that for a Server-Side geocoding: Yahoo > Google whereas for a Client-Side geocoding: Google > Yahoo.
**BUT, If we won't display the results on a map, then neither Google nor Yahoo will do. You'll violate their terms of service ! [See terms of service, advertising part](https://developers.google.com/maps/terms#4-provision-of-the-service-by-google).**

+ [MapQuest](http://www.mapquestapi.com/geocoding/): this is probably the most open among the fast geocoders. 15,000 requests / month for free.
+ [GeoNames Web Service](http://www.geonames.org/export/web-services.html#findNearbyPlaceName): an open project for a lot of geocoding and other geographical stuff. With their complicated limit system, we have 10,000 requests / day. But no restriction about the way we use them if we give credit to GeoNames when using data or web services with a link or another reference to GeoNames! [See GeoNames Terms and Conditions](http://www.geonames.org/export/)

#### Privacy Issues
When the browser asks the client if we want to share his location, it's exactly this technique which is used. So it can be a less-friendly solution, depending on the customers and their fears about a "big brother society".

> This API will retrieve the geographic location of the hosting device which will usually pinpoint the location of the user of the device. To prevent a breach of the user's privacy, it is recommended that any browsers that implement this API supply a method of acquiring permission explicitly from users before revealing their locations.

_source: [IPGeo5](http://ipgeo5.com/)_

**IMPORTANT NOTE**:
That's why Chrome and other Chromium derivates web browsers won't allow any website to even ask permission for geolocation if it's not using a "secure" protocol as HTTPS. See- [Chromium recommendation](https://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features) for more information about this issue.



---
#### More information about HTML5 Geolocation
Some sources I used and which can give more details about geolocation:
+ [W3C Geo API](https://www.w3.org/TR/geolocation-API/): The W3C recommendations and explanations about this new feature
+ [Geolocation](http://www.geolocation.com/): general website about geolocation
+ [IPGeo5](http://ipgeo5.com/): website dedicated to geolocation with the latest W3C recommendations with HTML5 (the comparison table come from them).
+ [GeoDataSource](http://www.geodatasource.com/): Database for geocoding (get a "human readable" location from coordinates and _vice versa_)
+ [Entering the wonderful world of Geo Location](https://www.smashingmagazine.com/2010/03/entering-the-wonderful-world-of-geo-location/): very nice article I used a lot.