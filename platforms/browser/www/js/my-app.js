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
    app.router.navigate("/sesion/");
    console.log("Device is ready!");
    console.log("El dispositivo está listo");
    var watchID = navigator.geolocation.watchPosition(funcionExito,funcionError,opcionesGPS);
});

/*
* @param
* @return
*/

var map;
var marcador;
var styledMapType;

  function initMap() {
   mediciones();
    var icon;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap',
    };

    styledMapType = new google.maps.StyledMapType(
      [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#523735"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#c9b2a6"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#dcd2be"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#ae9e90"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#93817c"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#a5b076"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#447530"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#fdfcf8"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f8c967"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#e9bc62"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e98d58"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#db8555"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#806b63"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8f7d77"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#b9d3c2"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#92998d"
        }
      ]
    }
  ]
    );

    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -36.6066399, lng: -72.1034393},
       clickableIcons: false,
       zoomControl : false,
       mapTypeControl : false,
       streetViewControl : false,
       fullscreenControl : false,
      zoom: 15
    });

    marcador = new google.maps.Marker({
        position: {lat: -36.6066399, lng: -72.1034393},
        map: map
    });

    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');


    // Multiples mascadores del mapa con su latitud y longitud

    var markers = [
        ['Plaza de armas de Chillán', -36.6066399, -72.1034393],
        ['Mercado de Chillán', -36.611225, -72.101654],
        ['Plaza de la Victoria', -36.609287, -72.109237],
        ['UBB Fernando May', -36.60016041947743, -72.07593142605032],
        ['Hospital Herminda Martín', -36.60883243832269, -72.09114217109413]
    ];

    // Despliega la información de los contendedores de cada marcador
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<img src="http://cdn.plataformaurbana.cl/wp-content/uploads/2015/08/plaza-de-armas-de-chilla-fuente-imagen-municipalidad-de-chillan-1000x665.jpg" width = "200" heigth = "100" >' +
        '<h3>Plaza de armas de Chillán</h3>' +
        '<p>Tipo de contenedor: vidrio</p>'+
        '<p>Porcentaje de llenado: 55%</p>' + '</div>'],
        ['<div class="info_content">' +
        '<img src="https://media-cdn.tripadvisor.com/media/photo-s/04/59/43/f5/mercado-de-chillan.jpg" width = "200" heigth = "100" >' +
        '<h3>Mercado de Chillán</h3>' +
        '<p>Tipo de contenedor: vidrio</p>'+
        '<p>Porcentaje de llenado: 75%</p>' +
        '</div>'],
        ['<div class="info_content">' +
        '<img src="https://www.municipalidadchillan.cl/sitio/img/fotos/plazas/plaza-victoria-max.jpg" width = "200" heigth = "100" >' +
        '<h3>Plaza de la Victoria</h3>' +
        '<p>Tipo de contenedor: vidrio</p>'+
        '<p>Porcentaje de llenado: 10%</p>' +
        '</div>'],
        ['<div class="info_content">' +
        '<img src="http://noticias.ubiobio.cl/wp-content/uploads//MG_4360.jpg" width = "200" heigth = "100" >' +
        '<h3>UBB Fernando May</h3>' +
        '<p>Tipo de contenedor: vidrio</p>'+
        '<p>Porcentaje de llenado: 60%</p>' +
        '</div>'],
        ['<div class="info_content">' +
        '<img src="https://img.soy-chile.cl/Fotos/2012/12/14/file_20121214171254.jpg" width = "200" heigth = "100" >' +
        '<h3>Hospital Herminda Martín</h3>' +
        '<p>Tipo de contenedor: vidrio</p>'+
        '<p>Porcentaje de llenado: 70%</p>' +
        '</div>']
    ];



     // Agrega los marcadores al mapa
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    // Coloca cada marcador en el mapa
    //@param marker: agrega como parametro la posición, el mapa, el icono que aparecerá en el mapa y titulo.
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

        // Agrega la información a los marcadores
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        map.fitBounds(bounds);
    }
    //Añadir marcador
    /*
    map.addListener('click', function(e) {
        placeMarkerAndPanTo(e.latLng, map);
    });*/
  }

  /*
  * @param
  * @return
  */

    function placeMarkerAndPanTo(latLng, map) {
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
        map.panTo(latLng);
    }


/*
* @param Position Este método acepta un objeto Position, que contiene las coordenadas GPS actuales.
* @return lanza por consola la información sobre posición actual en el mapa
*/



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

/*
* @param error : recibe un objeto PositionError
* @return muestra por consola el mensaje de error
*/
    function funcionError(error) {
        console.log("hubo un error");
    }

    var opcionesGPS = {
        timeout: 500000,
        enableHighAccuracy: false
    }

/* Inicializar la barra de búsqueda con parámetros
* @param el: Selector de CSS o elemento HTML del elemento de la barra de búsqueda (form class="searchbar")
         searchContainer: Selector de CSS o elemento HTML del bloque de lista para buscar.
         searchIn: Selector de CSS del campo del elemento Vista de lista donde debemos buscar.
  @return
*
*/
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


// Crear dynamic Sheet
// @param  texto HTML par sheet dynamic. Puede ser útil si desea crear elementos sheet dinámicamente.
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
  // Eventos para abrir y cerra sheet
  on: {
    open: function (sheet) {
      console.log('Sheet open');
    },
    opened: function (sheet) {
      console.log('Sheet opened');
    },
  }
});

  function getMediciones(){
 
  //  var fnick= document.getElementById("nick").value;
    //var fpass= document.getElementById("pass").value;
  
    //console.log(fnick);
    //console.log(fpass);
    //document.getElementById("nick").value="";
    //document.getElementById("pass").value="";
    $.ajax({
        type:"GET",
        url: "http://192.168.43.206/redcicla/public/ult-mediciones",
        data: {id, fecha}, 
        cache: false,
        dataType: "json",
        success:  function(data){
          alert(data);
           var mensaje= data;
           console.log(mensaje);
        },
        error: function(jqXHR) {
        
              console.log("Failed to get: " +jqXHR.status);
            }
          
    });

};

          
var mediciones = function() {
 
  $.ajax({
    type:"GET",
    url: "http://192.168.18.100/redcicla/public/ult-mediciones",
    dataType: "json",
    contentType: 'application/json',
  
    success:  function(data){
      alert(data);
       mensaje= data;
       console.log(mensaje);
    },
  
      
});
    
};


