var autocomplete, map, places, infoWindow;
var MARKER_PATH = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=';
var green = '|00ff00';
var red = '|ff0000';
var blue = '|0000ff';
var markers = [];
var barMarkers = [];
var attMarkers = [];
var hostnameRegexp = new RegExp('^https?://.+?/');

    function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 3,
            center: {
                lat: 48.0,
                lng: -25.0
            }
        });
        infoWindow = new google.maps.InfoWindow({
            content: document.getElementById('info-content')
        });
        autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('autocomplete'), {
              types: ['(cities)'],
            });
        places = new google.maps.places.PlacesService(map);
        
        autocomplete.addListener('place_changed', onPlaceChanged);
    }
    
    $(document).ready(function() { 
        $("#loc1").click(function() {
            $("#autocomplete").val('London, UK');
            this.LatLng = new google.maps.LatLng({lat: 51.507351, lng: -0.127758});
            map.panTo(this.LatLng);
            map.setZoom(15);
            search();
            barSearch();
            attSearch();
            $("#suggest").hide();
        });
        $("#loc2").click(function() {
            $("#autocomplete").val('Dublin, Ireland');
            this.LatLng = new google.maps.LatLng({lat: 53.349804, lng: -6.260310});
            map.panTo(this.LatLng);
            map.setZoom(15);
            search();
            barSearch();
            attSearch();
            $("#suggest").hide();
        });
        $("#loc3").click(function() {
            $("#autocomplete").val('Berlin, Germany');
            this.LatLng = new google.maps.LatLng({lat: 52.520008, lng: 13.404954});
            map.panTo(this.LatLng);
            map.setZoom(15);
            search();
            barSearch();
            attSearch();
            $("#suggest").hide();
        });
        $("#loc4").click(function() {
            $("#autocomplete").val('Barcelona, Spain');
            this.LatLng = new google.maps.LatLng({lat: 41.385063, lng: 2.173404});
            map.panTo(this.LatLng);
            map.setZoom(15);
            search();
            barSearch();
            attSearch();
            $("#suggest").hide();
        });
    });
        
    function onPlaceChanged() {
        var place = autocomplete.getPlace();
        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(15);
            search();
            barSearch();
            attSearch();
            $("#suggest").hide();
        } else {
            document.getElementById('autocomplete').placeholder = 'Enter a city';
        }
    }
      
    function search() {
        var search = {
        bounds: map.getBounds(),
        types: ['lodging']
        };
        places.nearbySearch(search, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                clearResults();
                clearMarkers();
                $("#listingsTitle").show();
                $(".itemTable").show();
                addHeading();
                for (var i = 0; i < results.length; i++) {
                   var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
                   var markerIcon = MARKER_PATH + markerLetter + red;
                   markers[i] = new google.maps.Marker({
                      position: results[i].geometry.location,
                      animation: google.maps.Animation.DROP,
                      icon: markerIcon
                   });
                   markers[i].placeResult = results[i];
                   google.maps.event.addListener(markers[i], 'click', showInfoWindow);
                   setTimeout(dropMarker(i), i * 100);
                   addResult(results[i], i);
                }
            } 
        });
    }
  
    function clearResults() {
        var results = document.getElementById('results');
        while (results.childNodes[0]) {
            results.removeChild(results.childNodes[0]);
        }
    }
      
    function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
            if (markers[i]) {
                markers[i].setMap(null);
            }
        }
        markers = [];
    }
    
    function dropMarker(i) {
        return function() {
            markers[i].setMap(map);
        };
    }
    
    function addHeading() {
        var hotel = document.getElementById('results');
        var markerIcon = MARKER_PATH + red;
        var tr = document.createElement('tr');
        var iconTh = document.createElement('th');
        var th = document.createElement('th');
        var icon = document.createElement('img');
        icon.src = markerIcon;
        icon.setAttribute('class', 'placeIcon');
        icon.setAttribute('className', 'placeIcon');
        var text = document.createTextNode("Accommodation");
        iconTh.appendChild(icon);
        th.appendChild(text);
        tr.appendChild(iconTh);
        tr.appendChild(th);
        hotel.appendChild(tr);
    }
    
    function addResult(result, i) {
        var results = document.getElementById('results');
        var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
        var markerIcon = MARKER_PATH + markerLetter + red;
        var tr = document.createElement('tr');
        tr.style.backgroundColor = (i % 2 === 0 ? '#ffdada' : '#f5ffaf');
        tr.onclick = function() {
            google.maps.event.trigger(markers[i], 'click');
        };
        var iconTd = document.createElement('td');
        var nameTd = document.createElement('td');
        nameTd.style.width = "296px";
        var icon = document.createElement('img');
        icon.src = markerIcon;
        icon.setAttribute('class', 'placeIcon');
        icon.setAttribute('className', 'placeIcon');
        var name = document.createTextNode(result.name);
        iconTd.appendChild(icon);
        nameTd.appendChild(name);
        tr.appendChild(iconTd);
        tr.appendChild(nameTd);
        results.appendChild(tr);
    }
    
  function showInfoWindow() {
      var marker = this;
      places.getDetails({placeId: marker.placeResult.place_id},
          function(place, status) {
              if (status !== google.maps.places.PlacesServiceStatus.OK) {
                  return;
              }
              infoWindow.open(map, marker);
              buildIWContent(place);
          });
  }
  
  function buildIWContent(place) {
      document.getElementById('iw-icon').innerHTML = '<img class="itemIcon" ' + 'src="' + place.icon + '"/>';
      document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url + '">' + place.name + '</a></b>';
      document.getElementById('iw-address').textContent = place.vicinity;

      if (place.formatted_phone_number) {
          document.getElementById('iw-phone-row').style.display = '';
          document.getElementById('iw-phone').textContent =
              place.formatted_phone_number;
      } else {
          document.getElementById('iw-phone-row').style.display = 'none';
      }
    
      if (place.rating) {
          var ratingHtml = '';
          for (var i = 0; i < 5; i++) {
              if (place.rating < (i + 0.5)) {
                  ratingHtml += '&#10025;';
              } else {
                  ratingHtml += '&#10029;';
              }
              document.getElementById('iw-rating-row').style.display = '';
              document.getElementById('iw-rating').innerHTML = ratingHtml;
          }
      } else {
          document.getElementById('iw-rating-row').style.display = 'none';
      }
    
      if (place.website) {
          var fullUrl = place.website;
          var website = hostnameRegexp.exec(place.website);
          if (website === null) {
              website = 'http://' + place.website + '/';
              fullUrl = website;
          }
          document.getElementById('iw-website-row').style.display = '';
          document.getElementById('iw-website').textContent = website;
      } else {
          document.getElementById('iw-website-row').style.display = 'none';
      }
  }
    
    function barSearch() {
        var barSearch = {
            bounds: map.getBounds(),
            types: ['restaurant']
        };
        places.nearbySearch(barSearch, function(barResults, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                clearBarResults();
                clearBarMarkers();
                addBarHeading();
                for (var i = 0; i < barResults.length; i++) {
                    var barMarkerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
                    var barMarkerIcon = MARKER_PATH + barMarkerLetter + blue;
                    barMarkers[i] = new google.maps.Marker({
                        position: barResults[i].geometry.location,
                        animation: google.maps.Animation.DROP,
                        icon: barMarkerIcon
                    });
                    barMarkers[i].placeResult = barResults[i];
                    google.maps.event.addListener(barMarkers[i], 'click', showInfoWindow);
                    setTimeout(dropBarMarker(i), i * 100);
                    addBarResult(barResults[i], i);
                }
            }
        });
    }
    
    function clearBarResults() {
        var barResults = document.getElementById('barResults');
        while (barResults.childNodes[0]) {
            barResults.removeChild(barResults.childNodes[0]);
        }
    }
    
    function clearBarMarkers() {
        for (var i = 0; i < barMarkers.length; i++) {
            if (barMarkers[i]) {
                barMarkers[i].setMap(null);
            }
        }
        barMarkers = [];
    }
    
    function dropBarMarker(i) {
        return function() {
            barMarkers[i].setMap(map);
        };
    }
    
    function addBarHeading() {
        var bars = document.getElementById('barResults');
        var barMarkerIcon = MARKER_PATH + blue;
        var tr = document.createElement('tr');
        var iconTh = document.createElement('th');
        var th = document.createElement('th');
        var icon = document.createElement('img');
        icon.src = barMarkerIcon;
        icon.setAttribute('class', 'placeIcon');
        icon.setAttribute('className', 'placeIcon');
        var food = document.createTextNode('Bars and Restaurants');
        iconTh.appendChild(icon);
        th.appendChild(food);
        tr.appendChild(iconTh);
        tr.appendChild(th);
        bars.appendChild(tr);
    }
    
    function addBarResult(barResult, i) {
        var barResults = document.getElementById('barResults');
        var barMarkerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
        var barMarkerIcon = MARKER_PATH + barMarkerLetter + blue;
        var tr = document.createElement('tr');
        tr.style.backgroundColor = (i % 2 === 0 ? '#dadaff' : '#f5ffaf');
        tr.onclick = function() {
            google.maps.event.trigger(barMarkers[i], 'click');
        };
        var iconTd = document.createElement('td');
        var nameTd = document.createElement('td');
        nameTd.style.width = "296px";
        var icon = document.createElement('img');
        icon.src = barMarkerIcon;
        icon.setAttribute('class', 'placeIcon');
        icon.setAttribute('className', 'placeIcon');
        var name = document.createTextNode(barResult.name);
        iconTd.appendChild(icon);
        nameTd.appendChild(name);
        tr.appendChild(iconTd);
        tr.appendChild(nameTd);
        barResults.appendChild(tr);
    }
    
    function attSearch() {
        var attSearch = {
            bounds: map.getBounds(),
            types: ['museum']
        };
        places.nearbySearch(attSearch, function(attResults, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                clearAttResults();
                clearAttMarkers();
                addAttHeading();
                for (var i = 0; i < attResults.length; i++) {
                    var attMarkerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
                    var attMarkerIcon = MARKER_PATH + attMarkerLetter + green;
                    attMarkers[i] = new google.maps.Marker({
                        position: attResults[i].geometry.location,
                        animation: google.maps.Animation.DROP,
                        icon: attMarkerIcon
                    });
                    attMarkers[i].placeResult = attResults[i];
                    google.maps.event.addListener(attMarkers[i], 'click', showInfoWindow);
                    setTimeout(dropAttMarker(i), i * 100);
                    addAttResult(attResults[i], i);
                }
            }
        });
    }
    
    function clearAttResults() {
        var attResults = document.getElementById('attResults');
        while (attResults.childNodes[0]) {
            attResults.removeChild(attResults.childNodes[0]);
        }
    }
    
    function clearAttMarkers() {
        for (var i = 0; i < attMarkers.length; i++) {
            if (attMarkers[i]) {
                attMarkers[i].setMap(null);
            }
        }
        attMarkers = [];
    }
    function dropAttMarker(i) {
        return function() {
            attMarkers[i].setMap(map);
        };
    }
  
    function addAttHeading() {
        var atts = document.getElementById('attResults');
        var attMarkerIcon = MARKER_PATH + green;
        var tr = document.createElement('tr');
        var iconTh = document.createElement('th');
        var th = document.createElement('th');
        var icon = document.createElement('img');
        icon.src = attMarkerIcon;
        icon.setAttribute('class', 'placeIcon');
        icon.setAttribute('className', 'placeIcon');
        var ttd = document.createTextNode('Nearby Attractions');
        iconTh.appendChild(icon);
        th.appendChild(ttd);
        tr.appendChild(iconTh);
        tr.appendChild(th);
        atts.appendChild(tr);
    }
    
    function addAttResult(attResult, i) {
        var attResults = document.getElementById('attResults');
        var attMarkerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
        var attMarkerIcon = MARKER_PATH + attMarkerLetter + green;
        var tr = document.createElement('tr');
        tr.style.backgroundColor = (i % 2 === 0 ? '#daffda' : '#f5ffaf');
        tr.onclick = function() {
            google.maps.event.trigger(attMarkers[i], 'click');
        };
        var iconTd = document.createElement('td');
        var nameTd = document.createElement('td');
        nameTd.style.width = "296px";
        var icon = document.createElement('img');
        icon.src = attMarkerIcon;
        icon.setAttribute('class', 'placeIcon');
        icon.setAttribute('className', 'placeIcon');
        var name = document.createTextNode(attResult.name);
        iconTd.appendChild(icon);
        nameTd.appendChild(name);
        tr.appendChild(iconTd);
        tr.appendChild(nameTd);
        attResults.appendChild(tr);
    }
    
    function resetMap() {
        clearResults();
        clearMarkers();
        clearBarResults();
        clearBarMarkers();
        clearAttResults();
        clearAttMarkers();
        $("#suggest").show();
        $("#listingsTitle").hide();
        $(".itemTable").hide();
        $("#autocomplete").val('');
        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 3,
            center: {
                lat: 48.0,
                lng: -25.0
            }
        });
    }
    
