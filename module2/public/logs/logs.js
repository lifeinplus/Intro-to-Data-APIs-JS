getData();

const selfies = [];

document.getElementById("time").addEventListener("click", ev => {
   sortData((a, b) => b.time - a.time);
});

document.getElementById("mood").addEventListener("click", ev => {
   sortData((a, b) => {
       if (b.mood > a.mood) return -1;
       return 1;
   });
});

function sortData(compare) {
    for (let item of selfies) {
        item.elt.remove();
    }

    selfies.sort(compare);

    for (let item of selfies) {
        document.body.append(item.elt);
    }
}

async function getData() {
    const response = await fetch("/api");
    const data = await response.json();

    for (let item of data) {
        const root = document.createElement("p");
        const mood = document.createElement("div");
        const geo = document.createElement("div");
        const date = document.createElement("div");

        mood.textContent = `mood: ${item.mood}`;
        geo.textContent = `${item.lat}°, ${item.lon}°`;
        date.textContent = new Date(item.timestamp).toLocaleString();

        root.append(mood, geo, date);
        selfies.push({elt: root, time: item.timestamp, mood: item.mood});
        document.body.append(root);
    }

    console.log(data);
}