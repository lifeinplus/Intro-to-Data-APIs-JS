if ("geolocation" in navigator) {
    console.log("geolocation available");
    navigator.geolocation.getCurrentPosition(async position => {
        let lat, lon, weather, air;

        try {
            lat = position.coords.latitude.toFixed(2);
            lon = position.coords.longitude.toFixed(2);

            document.getElementById("latitude").textContent = lat;
            document.getElementById("longitude").textContent = lon;

            const api_url = `weather/${lat},${lon}`;
            const response = await fetch(api_url);
            const json = await response.json();

            console.log(json);

            weather = json.weather.list[0];
            air = json.air_quality.results[0].measurements[0];

            document.getElementById("summary").textContent = weather.weather[0].main;
            document.getElementById("temp").textContent = weather.main.temp;
            document.getElementById("aq_parameter").textContent = air.parameter;
            document.getElementById("aq_value").textContent = air.value;
            document.getElementById("aq_units").textContent = air.unit;
            document.getElementById("aq_date").textContent = air.lastUpdated;
        } catch (e) {
            console.error(e);
            air = {value: -1};
            document.getElementById("aq_value").textContent = "NO READING";
        }

        const data = {lat, lon, weather, air};
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const db_response = await fetch('/api', options);
        const db_json = await db_response.json();
        console.log(db_json);
    });
} else {
    console.log("geolocation not available");
}

