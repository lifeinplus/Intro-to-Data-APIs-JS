const mymap = L.map('checkinMap').setView([0, 0], 1);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(mymap);

getData();

async function getData() {
    const response = await fetch("/api");
    const data = await response.json();

    console.log(data);

    for (let item of data) {
        const weather = item.weather;
        const air = item.air;

        let txt = `The weather here at ${item.lat}&deg;,
        ${item.lon}&deg; is ${weather.weather[0].main} with 
        a temperature of ${weather.main.temp}&deg; C.`;

        console.log(item);

        if (air.value < 0) {
            txt += " No air quality reading.";
        } else {
            txt += ` The concentration of particulate matter
            (${air.parameter}) is ${air.value}
            ${air.unit} last read on ${air.lastUpdated}.`;
        }

        L.marker([item.lat, item.lon])
            .addTo(mymap)
            .bindPopup(txt);
    }

    console.log(data);
}