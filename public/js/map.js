const mapElement = document.getElementById("map");

if (mapElement && typeof mapboxgl !== "undefined") {
    const coordinates = JSON.parse(mapElement.dataset.coordinates);

    mapboxgl.accessToken = mapElement.dataset.mapToken;

    const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: coordinates,
        zoom: 10,
    });

    map.addControl(new mapboxgl.NavigationControl());

    const popupContent = document.createElement("div");

    const title = document.createElement("h6");
    title.textContent = mapElement.dataset.title;

    const location = document.createElement("p");
    location.textContent =
        `${mapElement.dataset.location}, ${mapElement.dataset.country}`;

    popupContent.append(title, location);

    new mapboxgl.Marker()
        .setLngLat(coordinates)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
                .setDOMContent(popupContent)
        )
        .addTo(map);
}