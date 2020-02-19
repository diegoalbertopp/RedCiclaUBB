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
    routes: [{
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
            },
            {
                path: '/solicitud/',
                url: 'solicitud.html'
            }

        ]
        // ... other parameters
});

var mainView = app.views.create('.view-main');



// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    //app.router.navigate("/sesion/");
    console.log("Device is ready!");
    console.log("El dispositivo está listo");

    
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    initMap();
  
    //var watchID = navigator.geolocation.watchPosition(funcionExito, funcionError, opcionesGPS);
});

/*
 * @param
 * @return
 */

var map;
var marcador;
var styledMapType;
var markers;

var latitude;
var longitude;

var lat2;
var lng2;
 

function initMap() {
 
    var directionsService = new google.maps.DirectionsService();

    var directionsDisplay = new google.maps.DirectionsRenderer();
    if (localStorage.getItem('sesion') == 0) {

        document.getElementById("cerrarSesion").style.display = "none";
  

        $.ajax({
            async: false,
            type: "GET",
            url: "http://192.168.18.187/redcicla/public/ult-mediciones",
            dataType: "text",

            success: function(data) {
                var onionarray = [];
                incoming = JSON.parse(data);
                onionarray = incoming.data;
                var tamaño = onionarray.length;
                console.log(tamaño);
                console.log(onionarray[1]);
                //console.log(data.length);
                var icon;
                var bounds = new google.maps.LatLngBounds();
                var mapOptions = {
                    mapTypeId: 'roadmap',
                    mapTypeControl: false,
                };
                

                styledMapType = new google.maps.StyledMapType(
                    [{
                            "elementType": "geometry",
                            "stylers": [{
                                "color": "#ebe3cd"
                            }]
                        },
                        {
                            "elementType": "labels.text.fill",
                            "stylers": [{
                                "color": "#523735"
                            }]
                        },
                        {
                            "elementType": "labels.text.stroke",
                            "stylers": [{
                                "color": "#f5f1e6"
                            }]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.stroke",
                            "stylers": [{
                                "color": "#c9b2a6"
                            }]
                        },
                        {
                            "featureType": "administrative.land_parcel",
                            "elementType": "geometry.stroke",
                            "stylers": [{
                                "color": "#dcd2be"
                            }]
                        },
                        {
                            "featureType": "administrative.land_parcel",
                            "elementType": "labels.text.fill",
                            "stylers": [{
                                "color": "#ae9e90"
                            }]
                        },
                        {
                            "featureType": "landscape.natural",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": "#dfd2ae"
                            }]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": "#dfd2ae"
                            }]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "labels.text",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "labels.text.fill",
                            "stylers": [{
                                "color": "#93817c"
                            }]
                        },
                        {
                            "featureType": "poi.business",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        },
                        {
                            "featureType": "poi.park",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "color": "#a5b076"
                            }]
                        },
                        {
                            "featureType": "poi.park",
                            "elementType": "labels.text.fill",
                            "stylers": [{
                                "color": "#447530"
                            }]
                        },
                        {
                            "featureType": "road",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": "#f5f1e6"
                            }]
                        },
                        {
                            "featureType": "road",
                            "elementType": "labels.icon",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": "#fdfcf8"
                            }]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": "#f8c967"
                            }]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.stroke",
                            "stylers": [{
                                "color": "#e9bc62"
                            }]
                        },
                        {
                            "featureType": "road.highway.controlled_access",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": "#e98d58"
                            }]
                        },
                        {
                            "featureType": "road.highway.controlled_access",
                            "elementType": "geometry.stroke",
                            "stylers": [{
                                "color": "#db8555"
                            }]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "labels.text.fill",
                            "stylers": [{
                                "color": "#806b63"
                            }]
                        },
                        {
                            "featureType": "transit",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        },
                        {
                            "featureType": "transit.line",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": "#dfd2ae"
                            }]
                        },
                        {
                            "featureType": "transit.line",
                            "elementType": "labels.text.fill",
                            "stylers": [{
                                "color": "#8f7d77"
                            }]
                        },
                        {
                            "featureType": "transit.line",
                            "elementType": "labels.text.stroke",
                            "stylers": [{
                                "color": "#ebe3cd"
                            }]
                        },
                        {
                            "featureType": "transit.station",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": "#dfd2ae"
                            }]
                        },
                        {
                            "featureType": "water",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "color": "#b9d3c2"
                            }]
                        },
                        {
                            "featureType": "water",
                            "elementType": "labels.text.fill",
                            "stylers": [{
                                "color": "#92998d"
                            }]
                        }
                        
                    ]
                );
                map = new google.maps.Map
              
               (document.getElementById("map"), mapOptions);
               directionsDisplay.setMap(map);
               
      
          var latLong = new google.maps.LatLng(latitude, longitude);
      
          var marker = new google.maps.Marker({
              position: latLong,
               icon : "img/drink.png"
            
          });
     

function calculaRoute(){
    var request = {
        origin: new google.maps.LatLng(latitude,longitude),
    destination: new google.maps.LatLng(lat2,lng2), 
        travelMode: google.maps.TravelMode.WALKING
       
    };

directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result); 
    }
    });
     
}
      
          
          marker.setMap(map);
          map.setZoom(15);
         map.setCenter(latitude,longitude);
       // map.setCenter(marker.getPosition());
       


                map.mapTypes.set('styled_map', styledMapType);
                map.setMapTypeId('styled_map');
                
                directionsDisplay.setOptions( { suppressMarkers: true } );

                // Multiples mascadores del mapa con su latitud y longitud

                var markers = [];
                for (var i = 0; i < tamaño; i++) {
                    markers.push([onionarray[i].direccion, onionarray[i].latitud, onionarray[i].longitud])
                   
                }

                var infoWindowContent = [];
                for (var j = 0; j < tamaño; j++) {
                    
                    infoWindowContent.push(['<div class="info_content">' +
                        '<img src="http://cdn.plataformaurbana.cl/wp-content/uploads/2015/08/plaza-de-armas-de-chilla-fuente-imagen-municipalidad-de-chillan-1000x665.jpg" width = "200" heigth = "100" >' +
                        '<h3>' +
                        onionarray[j].direccion + '</h3>' +
                        '<p>Tipo de contenedor: ' + onionarray[j].tipo + '</p>' +
                        '<p>Porcentaje de llenado: ' + onionarray[j].medicion + '%</p>' + 
                        
                        '</div>'
                       
                    ])
                 
                }
               
               /* 
                map.addListener('click', function(e) {
                    var lat= e.latLng.lat()
                    var lng= e.latLng.lng();
                    alert(lat);
                    alert(lng);
    
                    calculaRoute(lat, lng);
                    
          
                }); */
                

                // Agrega los marcadores al mapa
                var infoWindow = new google.maps.InfoWindow(),
                    marker, i;
                // Coloca cada marcador en el mapa
                //@param marker: agrega como parametro la posición, el mapa, el icono que aparecerá en el mapa y titulo.
                for (i = 0; i < markers.length; i++) {
                    var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
                    bounds.extend(position);
                    if (i == 2) {
                        marker = new google.maps.Marker({
                            position: position,
                            map: map,
                            icon: "img/container-plastico.png",
                          
                            title: markers[i][0]
                        });
                    } else {
                        marker = new google.maps.Marker({
                            position: position,
                            map: map,
                            icon: "img/container.png",
                            title: markers[i][0]
                        });
                    }
                 

                    // Agrega la información a los marcadores
                    google.maps.event.addListener(marker, 'click', (function(marker, i) {
                   
                        
                        return function() {
                            infoWindow.setContent(infoWindowContent[i][0]);
                            infoWindow.open(map, marker);
                            marker.setAnimation(google.maps.Animation.BOUNCE);
                            setTimeout(function(){ marker.setAnimation(null); }, 1500);
                          
                            //    marker.setAnimation(google.maps.Animation.BOUNCE);
                            
                         
                        }
                       
                    })(marker, i));
                
                    google.maps.event.addListener(
                        marker, 
                        "click", 
                        function (e) {
                           
                             lat2= e.latLng.lat()
                             lng2= e.latLng.lng();
                            map.setZoom(15);

                            map.setCenter(marker.getPosition());
                       
                        }
                    )
                    map.fitBounds(bounds);
                }

                
           
                var howArrive = document.getElementById('how-arrive');
                howArrive.addEventListener('click', function() {
                calculaRoute();
                infoWindow.close(map, marker);
              
                map.setZoom(12);
                
                });
                
                //Añadir marcador
                /*
                map.addListener('click', function(e) {
                    placeMarkerAndPanTo(e.latLng, map);
                });*/
            },
            
        });

    } else {
      

        if (localStorage.getItem('sesion') == "1") {
            document.getElementById("iniciarSesion").style.display = "none";
            document.getElementById("solicitudId").style.display = "none";
            $.ajax({
                method: "GET",
                async: false,
                processData: false,
                mimeType: "multipart/form-data",
                contentType: false,
                url: 'http://192.168.18.187/redcicla/public/api/auth/contenedor',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('appname_token')
                },

                success: function(data) {

                    var onionarray = [];
                    incoming = JSON.parse(data);
                    onionarray = incoming.data;
                    var tamaño = onionarray.length;
                    console.log(tamaño);
                    console.log(onionarray[1]);
                    //console.log(data.length);
                    var icon;
                    var bounds = new google.maps.LatLngBounds();
                    var mapOptions = {
                        mapTypeId: 'roadmap',
                        
                        mapTypeControl: false,
                        
                    };

                    styledMapType = new google.maps.StyledMapType(
                        [{
                                "elementType": "geometry",
                                "stylers": [{
                                    "color": "#ebe3cd"
                                }]
                            },
                            {
                                "elementType": "labels.text.fill",
                                "stylers": [{
                                    "color": "#523735"
                                }]
                            },
                            {
                                "elementType": "labels.text.stroke",
                                "stylers": [{
                                    "color": "#f5f1e6"
                                }]
                            },
                            {
                                "featureType": "administrative",
                                "elementType": "geometry.stroke",
                                "stylers": [{
                                    "color": "#c9b2a6"
                                }]
                            },
                            {
                                "featureType": "administrative.land_parcel",
                                "elementType": "geometry.stroke",
                                "stylers": [{
                                    "color": "#dcd2be"
                                }]
                            },
                            {
                                "featureType": "administrative.land_parcel",
                                "elementType": "labels.text.fill",
                                "stylers": [{
                                    "color": "#ae9e90"
                                }]
                            },
                            {
                                "featureType": "landscape.natural",
                                "elementType": "geometry",
                                "stylers": [{
                                    "color": "#dfd2ae"
                                }]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "geometry",
                                "stylers": [{
                                    "color": "#dfd2ae"
                                }]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "labels.text",
                                "stylers": [{
                                    "visibility": "off"
                                }]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "labels.text.fill",
                                "stylers": [{
                                    "color": "#93817c"
                                }]
                            },
                            {
                                "featureType": "poi.business",
                                "stylers": [{
                                    "visibility": "off"
                                }]
                            },
                            {
                                "featureType": "poi.park",
                                "elementType": "geometry.fill",
                                "stylers": [{
                                    "color": "#a5b076"
                                }]
                            },
                            {
                                "featureType": "poi.park",
                                "elementType": "labels.text.fill",
                                "stylers": [{
                                    "color": "#447530"
                                }]
                            },
                            {
                                "featureType": "road",
                                "elementType": "geometry",
                                "stylers": [{
                                    "color": "#f5f1e6"
                                }]
                            },
                            {
                                "featureType": "road",
                                "elementType": "labels.icon",
                                "stylers": [{
                                    "visibility": "off"
                                }]
                            },
                            {
                                "featureType": "road.arterial",
                                "elementType": "geometry",
                                "stylers": [{
                                    "color": "#fdfcf8"
                                }]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "geometry",
                                "stylers": [{
                                    "color": "#f8c967"
                                }]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "geometry.stroke",
                                "stylers": [{
                                    "color": "#e9bc62"
                                }]
                            },
                            {
                                "featureType": "road.highway.controlled_access",
                                "elementType": "geometry",
                                "stylers": [{
                                    "color": "#e98d58"
                                }]
                            },
                            {
                                "featureType": "road.highway.controlled_access",
                                "elementType": "geometry.stroke",
                                "stylers": [{
                                    "color": "#db8555"
                                }]
                            },
                            {
                                "featureType": "road.local",
                                "elementType": "labels.text.fill",
                                "stylers": [{
                                    "color": "#806b63"
                                }]
                            },
                            {
                                "featureType": "transit",
                                "stylers": [{
                                    "visibility": "off"
                                }]
                            },
                            {
                                "featureType": "transit.line",
                                "elementType": "geometry",
                                "stylers": [{
                                    "color": "#dfd2ae"
                                }]
                            },
                            {
                                "featureType": "transit.line",
                                "elementType": "labels.text.fill",
                                "stylers": [{
                                    "color": "#8f7d77"
                                }]
                            },
                            {
                                "featureType": "transit.line",
                                "elementType": "labels.text.stroke",
                                "stylers": [{
                                    "color": "#ebe3cd"
                                }]
                            },
                            {
                                "featureType": "transit.station",
                                "elementType": "geometry",
                                "stylers": [{
                                    "color": "#dfd2ae"
                                }]
                            },
                            {
                                "featureType": "water",
                                "elementType": "geometry.fill",
                                "stylers": [{
                                    "color": "#b9d3c2"
                                }]
                            },
                            {
                                "featureType": "water",
                                "elementType": "labels.text.fill",
                                "stylers": [{
                                    "color": "#92998d"
                                }]
                            }
                        ]
                    );
                    map = new google.maps.Map
          (document.getElementById("map"), mapOptions);
          directionsDisplay.setMap(map);
      
          var latLong = new google.maps.LatLng(latitude, longitude);
      
          var marker = new google.maps.Marker({
              position: latLong, 
             icon : "img/trash.png"
          });
      
          marker.setMap(map);
          map.setZoom(15);
          
          directionsDisplay.setOptions( { suppressMarkers: true } );

          function calculaRoute(){
          
            var request = {
                origin:  new google.maps.LatLng(latitude,longitude),
            destination: new google.maps.LatLng(lat2,lng2), 

                travelMode: google.maps.TravelMode.DRIVING,
                avoidTolls: true
            };
           
        
        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {

                directionsDisplay = new google.maps.DirectionsRenderer({                   
                    suppressMarkers: true
                  });
                  directionsDisplay.setMap(map);
           
                directionsDisplay.setDirections(result); 
            
            }
            });
           
          
        }
        
         // map.setCenter(marker.getPosition());



                   /* map = new google.maps.Map(document.getElementById('map'), {
                        center: { lat: -36.6066399, lng: -72.1034393 },
                        clickableIcons: false,
                        zoomControl: false,
                        mapTypeControl: false,
                        streetViewControl: false,
                        fullscreenControl: false,
                        zoom: 15
                    });*/


                    map.mapTypes.set('styled_map', styledMapType);
                    map.setMapTypeId('styled_map');


                    // Multiples mascadores del mapa con su latitud y longitud

                    var markers = [];
                    for (var i = 0; i < tamaño; i++) {
                        markers.push([onionarray[i].direccion, onionarray[i].latitud, onionarray[i].longitud])
                    }

                    var infoWindowContent = [];
                    for (var j = 0; j < tamaño; j++) {
                        infoWindowContent.push(['<div class="info_content">' +
                            '<img src="http://ubiobio.cl/acreditacion/sumate/assets/images/mg-4360-1042x694.jpg" width = "200" heigth = "100" >' +
                            '<h3>' +
                            onionarray[j].direccion + '</h3>' +
                            '<p>Tipo de contenedor: ' + onionarray[j].tipo + '</p>' +
                            '<p>Porcentaje de llenado: ' + (onionarray[j].medicion) + '%</p>' +
                            
                            '</div>'
                        ])
                    }
                    $$('.open-click-to-close').on('click', function () {
                        notificationClickToClose.open();
                      });

                    for (var j = 0; j < tamaño; j++) {
                        if(onionarray[j].medicion>=80){
                            var notificationClickToClose = app.notification.create({
                                icon: '<i class="icon demo-icon">7</i>',
                                title: 'Notificación',
                                titleRightText: 'ahora',
                                subtitle: 'Contenedor lleno',
                                text: 'Se ha llenado un nuevo contenedor',
                                closeOnClick: true,
                              })
                        }
                        
                    }


                  
                    // Agrega los marcadores al mapa
                    var infoWindow = new google.maps.InfoWindow(),
                        marker, i;
                    // Coloca cada marcador en el mapa
                    //@param marker: agrega como parametro la posición, el mapa, el icono que aparecerá en el mapa y titulo.
                    for (i = 0; i < markers.length; i++) {
        

                        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
                        bounds.extend(position);
                    
                        if (i == 0) {
                            marker = new google.maps.Marker({
                                position: position,
                                map: map,
                                icon: "img/container-plastico.png",
                                title: markers[i][0]
                            });
                        } else {
                            marker = new google.maps.Marker({
                                position: position,
                                map: map,
                                icon: "img/container.png",
                                title: markers[i][0]
                            });
                        }
                          
                      
                        
                        // Agrega la información a los marcadores
                        google.maps.event.addListener(marker, 'click', (function(marker, i) {
                            
                            return function() {
                               
                                infoWindow.setContent(infoWindowContent[i][0]);
                                infoWindow.open(map, marker);
                                marker.setAnimation(google.maps.Animation.BOUNCE);
                                setTimeout(function(){ marker.setAnimation(null); }, 1500);

                                var toastCenter = app.toast.create({
                                    text: 'Punto seleccionado',
                                    position: 'center',
                                    closeTimeout: 1000,
                                  });
                                
                                    toastCenter.open();
                          
                            }
                            
                        })(marker, i));

                       

                        google.maps.event.addListener(
                            
                            marker, 
                            "click", 
                            function (e) {
                                
                                 lat2= e.latLng.lat()
                                 lng2= e.latLng.lng();
                                map.setZoom(15);
                        
                                map.setCenter(marker.getPosition());
                              
                               

                            }
                          
                           
                        )
                     

                        map.fitBounds(bounds);
                    }
                    var howArrive = document.getElementById('how-arrive');
                    howArrive.addEventListener('click', function() {
                    calculaRoute();
                    infoWindow.close(map, marker);
                    map.setZoom(12);
                    latitude=lat2;
                    longitude=lng2;
                  
                    });
                },

                


                error: function() {
                    alert("Login Failed");
                }

            });

        }


    }   

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


var toastCenter = app.toast.create({
    text: 'Mostrando ruta',
    position: 'center',
    closeTimeout: 2000,
  });
  $$('.open-toast-center').on('click', function () {
    toastCenter.open();
  });

/*
 * @param Position Este método acepta un objeto Position, que contiene las coordenadas GPS actuales.
 * @return lanza por consola la información sobre posición actual en el mapa
 */

var onSuccess = function(position) {
     latitude = position.coords.latitude;
     longitude = position.coords.longitude;
    /*alert('Latitude: '          + latitude         + '\n' +
          'Longitude: '         + longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + new Date(position.timestamp)      + '\n');
*/
          initMap();
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
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
    content: '<div class="sheet-modal">' +
        '<div class="toolbar">' +
        '<div class="toolbar-inner">' +
        '<div class="left"></div>' +
        '<div class="right">' +
        '<a class="link sheet-close">Done</a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="sheet-modal-inner">' +
        '<div class="block">' +
        '<p>Sheet created dynamically.</p>' +
        '<p><a href="#" class="link sheet-close">Close me</a></p>' +
        '</div>' +
        '</div>' +
        '</div>',
    // Eventos para abrir y cerra sheet
    on: {
        open: function(sheet) {
            console.log('Sheet open');
        },
        opened: function(sheet) {
            console.log('Sheet opened');
        },
    }
});

$$('.convert-form-to-data').on('click', function() {
    var formData = app.form.convertToData('#my-form');
    alert(JSON.stringify(formData));
});



function enviarDatos() {

    $.ajax({
        async: false,
        type: "POST",
        url: "http://192.168.18.187/redcicla/public/solicitudes/store",
        data: {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            direccion: document.getElementById('direccion').value,
            ciudad: document.getElementById('ciudad').value,
            tipo_material: document.getElementById('tipo_material').value,
            detalle: document.getElementById('detalle').value,
            email: document.getElementById('correo').value,
            telefono: document.getElementById('telefono').value,
            fecha: document.getElementById('fecha').value,
            EmpresaReciclaje_idEmpresaReciclaje: document.getElementById('EmpresaReciclaje_idEmpresaReciclaje').value,
        },
        success: function(response) {

            console.log("exito")


        },
        error: function(err) {
            console.log("error")
        },
        complete: function() {
            console.log("completo")

        }
    });
};

function enviar() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    $.ajax({
        async: false,
        method: "POST",
        url: "http://192.168.18.187/redcicla/public/api/auth/login",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({ "email": email, "password": password })
    }).done(function(data, status) {
        localStorage.setItem('appname_token', data.token);
        localStorage.setItem('sesion', 1);

        console.log(data);


        // the following part makes sure that all the requests made later with jqXHR will automatically have this header.
        $(document).ajaxSend(function(event, jqxhr, settings) {
            jqxhr.setRequestHeader('Authorization', "Bearer " + data.token);
        });


    }).fail(function(error) {
        // handle the error
    });


};
/*
function contenedores(){
    $.ajax({ 
        async: false,
        method: "GET", 
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        url: 'http://192.168.18.100/redcicla/public/api/auth/contenedor', 
        headers: { 
            'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ localStorage.getItem('appname_token')
        },
       
        success: function(data) {
           
            console.log (data);
          },
          error: function() {
            alert("Login Failed");
          }
    
      });
}*/
function salir() {
    document.getElementById("solicitudId").style.display = "block";
    document.getElementById("iniciarSesion").style.display = "block";
    $.ajax({
        method: "GET",
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        url: 'http://192.168.18.187/redcicla/public/api/auth/logout',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('appname_token')
        },

        success: function(data) {
            localStorage.setItem('sesion', 0);
            console.log(data);
            initMap();

        },
        error: function() {
            alert("Login Failed");
        }

    });

}
/*

cordova.plugins.notification.local.hasPermission(function (granted) {
    // console.log('Permission has been granted: ' + granted);
});
 
document.addEventListener('deviceready', function () {
    // Schedule notification for tomorrow to remember about the meeting
    cordova.plugins.notification.local.schedule({
        id: 10,
        title: "Meeting in 15 minutes!",
        text: "Jour fixe Produktionsbesprechung",
        at: tomorrow_at_8_45_am,
        data: { meetingId:"#123FG8" }
    });

    // Join BBM Meeting when user has clicked on the notification 
    cordova.plugins.notification.local.on("click", function (notification) {
        if (notification.id == 10) {
            joinMeeting(notification.data.meetingId);
        }
    });

    // Notification has reached its trigger time (Tomorrow at 8:45 AM)
    cordova.plugins.notification.local.on("trigger", function (notification) {
        if (notification.id != 10)
            return;

        // After 10 minutes update notification's title 
        setTimeout(function () {
            cordova.plugins.notification.local.update({
                id: 10,
                title: "Meeting in 5 minutes!"
            });
        }, 600000);
    });
}, false);
*/



   function cameraTakePicture() { 
    navigator.camera.getPicture(onSuccess, onFail, {  
       quality: 50, 
       destinationType: Camera.DestinationType.DATA_URL 
    });  
    
    function onSuccess(imageData) { 
       var image = document.getElementById('myImage'); 
       image.src = "data:image/jpeg;base64," + imageData; 
    }  
    
    function onFail(message) { 
       alert('Failed because: ' + message); 
    } 
 }