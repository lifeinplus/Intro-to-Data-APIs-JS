    let lat, lon;
    const button = document.getElementById("submit");
    button.addEventListener("click", async event => {
        const mood = document.getElementById("mood").value;
        const data = {lat, lon, mood};
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/api', options);
        const json = await response.json();
        console.log(json);
    });

    if ("geolocation" in navigator) {
        console.log("geolocation available");
        navigator.geolocation.getCurrentPosition(async position => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            document.getElementById("latitude").textContent = lat.toString();
            document.getElementById("longitude").textContent = lon.toString();
        });
    } else {
        console.log("geolocation not available");
    }