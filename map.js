  // אתחול המפה במרכז ירושלים
  var map = L.map('map').setView([31.47, 35.13], 8);

  // שימוש באריחים של גוגל מפות
  var googleLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'], // שרתים של גוגל
    attribution: 'Map data © Google'
  });

  googleLayer.addTo(map);

  //         31.47,
//         35.13