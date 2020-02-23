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
                var icon;
                var bounds = new google.maps.LatLngBounds();
                var mapOptions = {
                    mapTypeId: 'roadmap',
                    center: { lat: latitude, lng: longitude },
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
                    icon: "img/man.png"

                });

                function calculaRoute() {
                    var request = {
                        origin: new google.maps.LatLng(latitude, longitude),
                        destination: new google.maps.LatLng(lat2, lng2),
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
                console.log("Prueba 2: " + longitude);
                map.setCenter({ lat: latitude, lng: longitude });
                map.mapTypes.set('styled_map', styledMapType);
                map.setMapTypeId('styled_map');

                directionsDisplay.setOptions({ suppressMarkers: true });

                // Multiples mascadores del mapa con su latitud y longitud
                var markers = [];
                for (var i = 0; i < tamaño; i++) {
                    if (onionarray[i].estado == 1) {
                        markers.push([onionarray[i].direccion, onionarray[i].latitud, onionarray[i].longitud, onionarray[i].tipo])
                    }
                }

                var infoWindowContent = [];
                for (var j = 0; j < tamaño; j++) {
                    var contenido;
                    switch (onionarray[j].tipo) {
                        case '1':
                            contenido = "Vidrios";
                            break;
                        case '2':
                            contenido = "Plásticos y PET";
                            break;
                        case '3':
                            contenido = "Papeles y cartones";
                            break;
                        case '4':
                            contenido = "Desechos Orgánicos";
                            break;
                        case '5':
                            contenido = "Residuos Peligrosos";
                            break;
                        case '6':
                            contenido = "Latas y metales";
                            break;
                        case '7':
                            contenido = "Residuos eléctricos y electrónicos";
                            break;
                        default:
                            break;
                    }
                    if (onionarray[j].estado == 1) {
                        infoWindowContent.push(['<div class="info_content">' +
                            '<b>' +
                            onionarray[j].direccion + '</b><br>' +
                            '<b>Tipo: </b>' + contenido +
                            '<br><b>Porcentaje de llenado: </b>' + onionarray[j].medicion + '%' +

                            '</div>'

                        ])
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
                    if (markers[i][3] == 1) {
                        marker = new google.maps.Marker({
                            position: position,
                            map: map,
                            icon: "img/vidrio.png",

                            title: markers[i][0]
                        });
                    }
                    if (markers[i][3] == 2) {
                        marker = new google.maps.Marker({
                            position: position,
                            map: map,
                            icon: "img/plastico.png",

                            title: markers[i][0]
                        });
                    }
                    if (markers[i][3] == 3) {
                        marker = new google.maps.Marker({
                            position: position,
                            map: map,
                            icon: "img/papel.png",

                            title: markers[i][0]
                        });
                    }
                    if (markers[i][3] == 4) {
                        marker = new google.maps.Marker({
                            position: position,
                            map: map,
                            icon: "img/organico.png",

                            title: markers[i][0]
                        });
                    }
                    if (markers[i][3] == 5) {
                        marker = new google.maps.Marker({
                            position: position,
                            map: map,
                            icon: "img/peligroso.png",

                            title: markers[i][0]
                        });
                    }
                    if (markers[i][3] == 6) {
                        marker = new google.maps.Marker({
                            position: position,
                            map: map,
                            icon: "img/latas.png",

                            title: markers[i][0]
                        });
                    }
                    if (markers[i][3] == 7) {
                        marker = new google.maps.Marker({
                            position: position,
                            map: map,
                            icon: "img/electrico.png",

                            title: markers[i][0]
                        });
                    }
                    // Agrega la información a los marcadores
                    google.maps.event.addListener(marker, 'click', (function(marker, i) {

                        return function() {
                            infoWindow.setContent(infoWindowContent[i][0]);
                            infoWindow.open(map, marker);
                            marker.setAnimation(google.maps.Animation.BOUNCE);
                            setTimeout(function() { marker.setAnimation(null); }, 1500);
                        }

                    })(marker, i));
                    google.maps.event.addListener(
                        marker,
                        "click",
                        function(e) {
                            console.log("Sí");
                            lat2 = e.latLng.lat()
                            lng2 = e.latLng.lng();
                            map.setZoom(15);

                            map.setCenter(marker.getPosition());

                        }
                    )
                }

                var howArrive = document.getElementById('how-arrive');
                howArrive.addEventListener('click', function() {
                    calculaRoute();
                    infoWindow.close(map, marker);
                    console.log("Calculando");
                    map.setZoom(15);

                });
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
                    map = new google.maps.Map(document.getElementById("map"), mapOptions);
                    directionsDisplay.setMap(map);

                    var latLong = new google.maps.LatLng(latitude, longitude);

                    var marker = new google.maps.Marker({
                        position: latLong,
                        icon: "img/trash.png"
                    });

                    marker.setMap(map);
                    map.setZoom(15);
                    console.log("Prueba 2: " + longitude);
                    map.setCenter({ lat: latitude, lng: longitude });
                    map.mapTypes.set('styled_map', styledMapType);
                    map.setMapTypeId('styled_map');
                    directionsDisplay.setOptions({ suppressMarkers: true });

                    function calculaRoute() {
                        var request = {
                            origin: new google.maps.LatLng(latitude, longitude),
                            destination: new google.maps.LatLng(lat2, lng2),

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
                    map.mapTypes.set('styled_map', styledMapType);
                    map.setMapTypeId('styled_map');

                    // Multiples mascadores del mapa con su latitud y longitud
                    var markers = [];
                    for (var i = 0; i < tamaño; i++) {
                        if (onionarray[i].estado == 1) {
                            markers.push([onionarray[i].direccion, onionarray[i].latitud, onionarray[i].longitud, onionarray[i].tipo])
                        }
                    }

                    var infoWindowContent = [];
                    for (var j = 0; j < tamaño; j++) {
                        var contenido;
                        switch (onionarray[j].tipo) {
                            case '1':
                                contenido = "Vidrios";
                                break;
                            case '2':
                                contenido = "Plásticos y PET";
                                break;
                            case '3':
                                contenido = "Papeles y cartones";
                                break;
                            case '4':
                                contenido = "Desechos Orgánicos";
                                break;
                            case '5':
                                contenido = "Residuos Peligrosos";
                                break;
                            case '6':
                                contenido = "Latas y metales";
                                break;
                            case '7':
                                contenido = "Residuos eléctricos y electrónicos";
                                break;
                            default:
                                break;
                        }
                        if (onionarray[j].estado == 1) {
                            if (onionarray[j].lleno == 0) {
                                infoWindowContent.push(['<div class="info_content">' +
                                    '<b>' +
                                    onionarray[j].direccion + '</b>' +
                                    '<br><b>Tipo de contenedor: </b>' + contenido +
                                    '<br><b>Porcentaje de llenado: </b>' + (onionarray[j].medicion) + '%' +
                                    '</div>'
                                ])
                            } else {
                                infoWindowContent.push(['<div class="info_content">' +
                                    '<b>' +
                                    onionarray[j].direccion + '</b>' +
                                    '<br><b>Tipo de contenedor: </b>' + contenido +
                                    '<br><b>Porcentaje de llenado: </b>' + (onionarray[j].medicion) + '%' +

                                    '<br><br><button class="col button button-fill color-red" onclick="contenedores(' + onionarray[j].id + ')" type="button">Retirado</button>' +
                                    '</div>'
                                ])
                            }
                        }
                    }
                    $$('.open-click-to-close').on('click', function() {
                        notificationClickToClose.open();
                    });

                    for (var j = 0; j < tamaño; j++) {
                        if (onionarray[j].medicion >= 80) {
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
                        if (markers[i][3] == 1) {
                            marker = new google.maps.Marker({
                                position: position,
                                map: map,
                                icon: "img/vidrio.png",

                                title: markers[i][0]
                            });
                        }
                        if (markers[i][3] == 2) {
                            marker = new google.maps.Marker({
                                position: position,
                                map: map,
                                icon: "img/plastico.png",

                                title: markers[i][0]
                            });
                        }
                        if (markers[i][3] == 3) {
                            marker = new google.maps.Marker({
                                position: position,
                                map: map,
                                icon: "img/papel.png",

                                title: markers[i][0]
                            });
                        }
                        if (markers[i][3] == 4) {
                            marker = new google.maps.Marker({
                                position: position,
                                map: map,
                                icon: "img/organico.png",

                                title: markers[i][0]
                            });
                        }
                        if (markers[i][3] == 5) {
                            marker = new google.maps.Marker({
                                position: position,
                                map: map,
                                icon: "img/peligroso.png",

                                title: markers[i][0]
                            });
                        }
                        if (markers[i][3] == 6) {
                            marker = new google.maps.Marker({
                                position: position,
                                map: map,
                                icon: "img/latas.png",

                                title: markers[i][0]
                            });
                        }
                        if (markers[i][3] == 7) {
                            marker = new google.maps.Marker({
                                position: position,
                                map: map,
                                icon: "img/electrico.png",

                                title: markers[i][0]
                            });
                        }
                        // Agrega la información a los marcadores
                        google.maps.event.addListener(marker, 'click', (function(marker, i) {
                            return function() {
                                infoWindow.setContent(infoWindowContent[i][0]);
                                infoWindow.open(map, marker);
                                marker.setAnimation(google.maps.Animation.BOUNCE);
                                setTimeout(function() { marker.setAnimation(null); }, 1500);
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
                            function(e) {
                                lat2 = e.latLng.lat()
                                lng2 = e.latLng.lng();
                                map.setZoom(15);
                                map.setCenter(marker.getPosition());
                            }
                        )
                    }
                    var howArrive = document.getElementById('how-arrive');
                    howArrive.addEventListener('click', function() {
                        calculaRoute();
                        infoWindow.close(map, marker);
                        map.setZoom(12);
                        latitude = lat2;
                        longitude = lng2;
                    });
                },
                error: function() {
                    alert("Login Failed");
                }
            });
        }
    }
}

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

$$('.open-toast-center').on('click', function() {
    toastCenter.open();
});

/*
 * @param Position Este método acepta un objeto Position, que contiene las coordenadas GPS actuales.
 * @return lanza por consola la información sobre posición actual en el mapa
 */

var onSuccess = function(position) {
    latitude = parseFloat(position.coords.latitude);
    longitude = parseFloat(position.coords.longitude);
    initMap();
};

// onError Callback receives a PositionError object
function onError(error) {
    alert('code: ' + error.code + '\n' +
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
         
        if (typeof data.token === "undefined") {
            
            localStorage.setItem('sesion', 0);
        } else{
            localStorage.setItem('sesion', 1);
        }
            
     
       // alert('token: '+localStorage.getItem('appname_token'));

        //console.log(data);
        $(document).ajaxSend(function(event, jqxhr, settings) {
            jqxhr.setRequestHeader('Authorization', "Bearer " + data.token);
        });
    }).fail(function(error) {
      
    });
};



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
            //console.log(data);
            initMap();

        },
        error: function() {
            alert("Login Failed");
        }
    });
}

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

function contenedores(id) {
    $.ajax({
        method: "GET",
        contentType: false,
        url: 'http://192.168.18.187/redcicla/public/lleno/' + id,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function(data) {
            var toastCenter = app.toast.create({
                text: 'El contenido del contenedor ' + id + ' ha sido retirado',
                position: 'center',
                closeTimeout: 3000,
            });
            toastCenter.open();
            console.log("Retirado");
            initMap();
        },
        error: function() {
            alert("Login Failed");
        }
    });
}