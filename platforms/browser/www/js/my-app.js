// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'right',
    },
    // Add default routes
    routes: [
      {
        path: '/about/',
        url: 'about.html'
      },
      {
        path: '/sesion/',
        url: 'sesion.html'
      },
      {
        path: '/ayuda/',
        url: 'ayuda.html'
      },
      {
        path: '/configuracion/',
        url: 'configuracion.html'
      },
      {
        path: '/historial/',
        url: 'historial.html'
      },
      {
        path: '/lista/',
        url: 'lista.html'
      },
      {
        path: '/misiones/',
        url: 'misiones.html'
      },
      {
        path: '/notificaciones/',
        url: 'notificaciones.html'
      },
      {
        path: '/index/',
        url: 'index.html'
      }
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    console.log("El dispositivo está listo");
    var watchID = navigator.geolocation.watchPosition(funcionExito,funcionError,opcionesGPS);
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
});

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="about"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
});

var map;
var marcador;
  function initMap() {

    var map;
    var icon;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };

    var styles = [{
      featureType: "poi",
      stylers: [
       { visibility: "off" }
      ]
    }];

    var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});

    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -36.6066399, lng: -72.1034393},
       clickableIcons: false,
      zoom: 15
    });


    // Multiple markers location, latitude, and longitude

    var markers = [
        ['Plaza de armas de Chillán', -36.6066399, -72.1034393],
        ['Mercado de Chillán', -36.611225, -72.101654],
        ['Plaza de la Victoria', -36.609287, -72.109237]
    ];

    // Info window content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3>Plaza de armas de Chillán</h3>' +
        '<p>Tipo de contenedor: vidrio</p>'+
        '<p>Porcentaje de llenado: 55%</p>' + '</div>'],
        ['<div class="info_content">' +
        '<h3>Mercado de Chillán</h3>' +
        '<p>Tipo de contenedor: vidrio</p>'+
        '<p>Porcentaje de llenado: 75%</p>' +
        '</div>'],
        ['<div class="info_content">' +
        '<h3>Plaza de la Victoria</h3>' +
        '<p>Tipo de contenedor: vidrio</p>'+
        '<p>Porcentaje de llenado: 10%</p>' +
        '</div>']
    ];

     // Add multiple markers to map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    // Place each marker on the map
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        if (i==1) {
          marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: "img/green-dot.png",
            title: markers[i][0]
          });
        }else{
          marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: "img/green-dot.png",
            title: markers[i][0]
          });
        }

        // Add info window to marker
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));
        // Center the map to fit all markers on the screen
        map.fitBounds(bounds);
    }
    //Añadir marcador
    /*
    map.addListener('click', function(e) {
        placeMarkerAndPanTo(e.latLng, map);
    });*/
  }

    function placeMarkerAndPanTo(latLng, map) {
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
        map.panTo(latLng);
    }
//Uso del GPS
    function funcionExito(position){
        console.log('latitude: '          + position.coords.latitude);
        console.log('longitude: '         + position.coords.longitude);
        console.log('Altitude: '          + position.coords.altitude);
        console.log('Accuracy: '          + position.coords.accuracy);
        console.log('Altitude Accuracy: ' + position.coords.altitudeAccuracy);
        console.log('Heading: '           + position.coords.heading);
        console.log('Speed: '             + position.coords.speed);
        console.log('Timestamp: '         + position.timestamp);
        console.log('--------------------------------')

        $$("#lat").html(position.coords.latitude);
        $$("#lgn").html(position.coords.longitude);

        var pos = {lat: position.coords.latitude , lng: position.coords.longitude};
        map.setCenter(pos);
        map.setZoom(17);
        marcador.setPosition(pos);

    }

    function funcionError(error) {
        console.log("hubo un error");
    }

    var opcionesGPS = {
        timeout: 5000,
        enableHighAccuracy: true
    }

    var searchbar = app.searchbar.create({
      el: '.searchbar',
      searchContainer: '.list',
      searchIn: '.item-title',
      on: {
        search(sb, query, previousQuery) {
          console.log(query, previousQuery);
        }
      }
    });








    // DOM events for my-sheet sheet
$$('.my-sheet').on('sheet:open', function (e, sheet) {
  console.log('my-sheet open');
});
$$('.my-sheet').on('sheet:opened', function (e, sheet) {
  console.log('my-sheet opened');
});

// Create dynamic Sheet
var dynamicSheet = app.sheet.create({
  content: '<div class="sheet-modal">'+
              '<div class="toolbar">'+
                '<div class="toolbar-inner">'+
                  '<div class="left"></div>'+
                  '<div class="right">'+
                    '<a class="link sheet-close">Done</a>'+
                  '</div>'+
                '</div>'+
              '</div>'+
              '<div class="sheet-modal-inner">'+
                '<div class="block">'+
                  '<p>Sheet created dynamically.</p>'+
                  '<p><a href="#" class="link sheet-close">Close me</a></p>'+
                '</div>'+
              '</div>'+
            '</div>',
  // Events
  on: {
    open: function (sheet) {
      console.log('Sheet open');
    },
    opened: function (sheet) {
      console.log('Sheet opened');
    },
  }
});
// Events also can be assigned on instance later
dynamicSheet.on('close', function (sheet) {
  console.log('Sheet close');
});
dynamicSheet.on('closed', function (sheet) {
  console.log('Sheet closed');
});

// Open dynamic sheet
$$('.dynamic-sheet').on('click', function () {
  // Close inline sheet before
  app.sheet.close('.my-sheet');

  // Open dynamic sheet
  dynamicSheet.open();
});

// Create swipe-to-close Sheet
app.sheet.create({
  el: '.my-sheet-swipe-to-close',
  swipeToClose: true,
  backdrop: true,
});
// Create swipe-to-step Sheet
app.sheet.create({
  el: '.my-sheet-swipe-to-step',
  swipeToClose: true,
  swipeToStep: true,
  backdrop: true,
});
