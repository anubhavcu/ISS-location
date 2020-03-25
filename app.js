//Making the map and tiles
const mymap = L.map("issMap").setView([0, 0], 1.5);
const attribution =
  '&copy; <a href= "https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

//Making a marker with icon
const issIcon = L.icon({
  iconUrl: "iss200.png",
  iconSize: [50, 32],
  iconAnchor: [25, 16]
});
const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);

let firstTime = true;
async function getData() {
  const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
  const data = await res.json();
  const { latitude, longitude, altitude, timestamp } = data; //JS destructuring
  var theDate = new Date(timestamp * 1000);
  var dateString = theDate.toGMTString();
  //L.marker([latitude, longitude]).addTo(mymap);
  marker.setLatLng([latitude, longitude]);
  if (firstTime) {
    console.log(data);
    mymap.setView([latitude, longitude], 6);
    firstTime = false;
  }
  document.getElementById("lat").textContent = latitude.toFixed(4);
  document.getElementById("lon").textContent = longitude.toFixed(4);
  document.getElementById("alt").textContent = altitude.toFixed(2);
  document.getElementById("time").textContent = dateString;
}

getData();
setInterval(getData, 1000);
