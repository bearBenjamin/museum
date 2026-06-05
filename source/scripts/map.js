/* eslint-disable no-undef */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '../vendor/leaflet/images/marker-icon-2x.png',
  iconUrl: '../vendor/leaflet/images/marker-icon.png',
  shadowUrl: '../vendor/leaflet/images/marker-shadow.png',
});

const mapElement = document.querySelector('#map');

const map = L.map(mapElement, {
  zoomSnap: 0.1,
  maxZoom: 16.8
});

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    className: 'contacts__map-interactive--grayscale',
    attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  },
).addTo(map);

const svgMarkup = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 820" class="contacts__map-icon" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round">
  <path class="contacts__map-icon-circle" fill="#FFFFFF" d="M341.864 266.306c0 50.809-41.038 91.846-91.846 91.846s-91.846-41.037-91.846-91.846c0-50.808 41.038-91.846 91.846-91.846s91.846 41.038 91.846 91.846"/>
  <path class="contacts__map-icon-body" fill="#8a8a8a" d="M416.544 503.612c-6.573 0-12.044 5.691-12.044 11.866 0 2.778 1.564 6.308 2.694 8.746l9.306 17.872 9.262-17.872c1.13-2.438 2.738-5.791 2.738-8.746 0-6.175-5.383-11.866-11.956-11.866Zm0 7.155a4.714 4.714 0 0 1 4.679 4.71c0 2.588-2.095 4.663-4.679 4.679-2.584-.017-4.679-2.09-4.679-4.679a4.714 4.714 0 0 1 4.679-4.71Z" transform="translate(-7889.1 -9807.44)scale(19.5417)"/>
</svg>
`;

const customSvgIcon = L.divIcon({
  html: svgMarkup,
  className: 'contacts__map-icon-container',
  iconSize: [32, 52],
  iconAnchor: [16, 52]
});

const points = [
  { lat: 48.86091, lng: 2.3364 },
  { lat: 48.8602, lng: 2.3333 },
  { lat: 48.8607, lng: 2.3397 },
  { lat: 48.8619, lng: 2.3330 },
  { lat: 48.8625, lng: 2.3365 }
];

const markersGroup = L.featureGroup();

points.forEach(({lat, lng}) => {
  const marker = L.marker({ lat, lng }, { icon: customSvgIcon });
  marker.addTo(markersGroup);
});

markersGroup.addTo(map);

mapElement.classList.add('contacts__map-interactive--is-loaded');

map.invalidateSize();

const groupCoordinates = markersGroup.getBounds();
map.fitBounds(groupCoordinates, {
  padding: [150, 150]
});
