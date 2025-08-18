async function fetchAPI(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error.message)
    }

}

const pact = fetchAPI('https://api.open-meteo.com/v1/forecast?latitude=9.9399&longitude=76.2602&current=temperature_2m,relative_humidity_2m,precipitation,rain&timezone=auto&forecast_days=1')
pact.then((data) => {
    const container = document.getElementById("weather-info");

    // Clear the container before adding new articles
    container.innerHTML += "";

    const element = document.createElement('div');
    element.classList.add();
    element.innerHTML = `
        Weather | Ernakulam<br><br>
        ${data.current.temperature_2m} ${data.current_units.temperature_2m}<br>
        Precitipaton: ${data.current.precipitation} | Relative Humidity: ${data.current.relative_humidity_2m} | Rain: ${data.current.rain}
        `;
    container.appendChild(element);
});