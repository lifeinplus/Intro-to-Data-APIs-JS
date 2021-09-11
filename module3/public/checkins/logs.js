getData();

async function getData() {
    const response = await fetch("/api");
    const data = await response.json();

    for (let item of data) {
        
    }

    console.log(data);
}