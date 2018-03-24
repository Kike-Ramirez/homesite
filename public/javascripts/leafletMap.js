window.addEventListener("load", function(event) {
    
    var mymap = L.map('mymap').setView([37.188126, -3.621803], 15);
  
    var marker = L.marker([37.188126, -3.621803]).addTo(mymap);

    marker.bindPopup("<b>Hello world!</b><br>I was born on 19th february 1979 in La Chana, Granada. My parents were Francisco and Ascensión").openPopup();

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.high-contrast',
        accessToken: 'pk.eyJ1Ijoia2lrZXJhbWlyZXoiLCJhIjoiY2pldDd1cHYzNXZhbTJxbXF6c3E5eGdtNyJ9.qXwl5fhi0BH2bUOD8POfzg'
    }).addTo(mymap);

});
