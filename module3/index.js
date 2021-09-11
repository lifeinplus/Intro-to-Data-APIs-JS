import express from 'express';
import Datastore from 'nedb';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Starting server at ${port}`);
});
app.use(express.static("public"));
app.use(express.json({limit: "1mb"}));

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api", (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    })

});

app.post('/api', (request, response) => {
    const data = request.body;
    data.timestamp = Date.now();
    database.insert(data);
    response.json(data);
});

app.get("/weather/:latlon", async (request, response) => {
    console.log(request.params);
    const latlon = request.params.latlon.split(",");
    console.log(latlon);
    const lat = latlon[0];
    const lon = latlon[1];
    console.log(lat, lon);

    const weather_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=333fd6de8842ea1077ffd76d20b5c1fa`;
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();

    const aq_url = `https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/latest?coordinates=${lat},${lon}&limit=100&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&dumpRaw=false`;
    const aq_response = await fetch(aq_url);
    const aq_data = await aq_response.json();

    response.json({
        weather: weather_data,
        air_quality: aq_data
    });
});