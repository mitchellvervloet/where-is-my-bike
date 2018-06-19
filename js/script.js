$(document).ready(function () {

    //system variable use everywhere
    var system = new Object();

    //only if html has class home
    if($('html').hasClass('home')) {

        // Save some data in system variable
        system.bike1Name = 'Batavus';
        system.bike1Number = '0245600';

        system.activeBikeName = $('.bike.is_active span');
        system.activeBikeNumver = $('.bike.is_active p');
        system.activeBikeDistance = '1080';
        system.activeBikeImg = 'img/fiets1.jpg';
        system.googleMapsLink = 'https://www.google.com/maps/place/';

        // FUNC: Init map and set props
        function initMaps() {

            document.querySelector('.map-container').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";

            var accessToken = 'pk.eyJ1IjoicHJvdGVpbnNsdXJwIiwiYSI6ImNqM2xpZ2htOTAwNzAzM2p2MG10NmFkanoifQ.Iml9qkvEU2f8ndyJJ5DnkA'; // Add token for working version
            var currentLocation = [51.9173142, 4.4849073];

            //current location
            navigator.geolocation.getCurrentPosition(function(location) {

                var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);

                //create map
                var map = L.map('map', {
                    center: latlng,
                    zoom: 15
                });

                //set access token
                L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=' + accessToken, {
                    minZoom: 14,
                    maxZoom: 16
                }).addTo(map);

                //create marker for user
                var myMarker = L.icon({
                    className: 'my-marker',
                    iconUrl: 'img/placeholder.png',
                    iconSize: [24],
                    iconAnchor: [12, 24]
                });

                //set position for marker of user with current location
                var marker = L.marker(latlng, {icon: myMarker}).addTo(map);

                //create marker for bike
                var bikeMarker = L.icon({
                    className: 'bike-marker',
                    iconUrl: 'img/bike.png',
                    iconSize: [24],
                    iconAnchor: [12, 12]
                });

                if($('.bike.is_active').hasClass('bike-1')) {

                    //if bike is 1 than set data to data of bike 1
                    lat = (latlng['lat'] + 0.001);
                    lng = (latlng['lng'] + 0.005);

                    system.activeBikeName = $('.bike.is_active span').text();
                    system.activeBikeNumber = $('.bike.is_active p').text();
                    system.activeBikeDistance = '367';
                    system.activeBikeImg = 'img/fiets1.jpg';
                    system.activeBikeLatLng = lat + ',' + lng;

                    L.marker([lat, lng], {icon: bikeMarker}).addTo(map);

                } else if ($('.bike.is_active').hasClass('bike-2')) {

                    //if bike is 2 than set data to data of bike 2
                    lat = (latlng['lat'] + 0.006);
                    lng = (latlng['lng'] + 0.008);

                    system.activeBikeName = $('.bike.is_active span').text();
                    system.activeBikeNumber = $('.bike.is_active p').text();
                    system.activeBikeDistance = '1245';
                    system.activeBikeImg = 'img/fiets2.JPG';
                    system.activeBikeLatLng = lat + ',' + lng;

                    L.marker([lat, lng], {icon: bikeMarker}).addTo(map);

                }

                //Open popup for bike on mobile
                $('.bike-marker').on('click', function (e) {

                    $(this).addClass('is_clicked');
                    $('.bike-detail').addClass('is_open');

                });

                //set data of bike in detail popup
                $('.bike-detail .bike__title').text(system.activeBikeName);
                $('.bike-detail .bike__number').text(system.activeBikeNumber);
                $('.bike-detail .distance span').text(system.activeBikeDistance);
                $('.bike-detail .bike__img img').attr('src', system.activeBikeImg);
                $('.bike-detail .route').attr('href', system.googleMapsLink+system.activeBikeLatLng);

            }, function(error){
                alert(error.message);
            }, {
                enableHighAccuracy: true
                ,timeout : 5000
            });

        };

        initMaps();

        //on click listener for list items of bikes
        $('.bike').on('click', function (e) {

            $('.bike').removeClass('is_active');
            $(this).addClass('is_active');
            initMaps();

            if ($('.bikes').hasClass('is_open')) {
                $('.bikes').removeClass('is_open');
            }

        });

        //open bikes side slider on mobile when clicked
        $('.bikes-toggle').on('click', function (e) {

            $('.bikes').addClass('is_open');

        });

        //close bikes side slider on mobile when clicked
        $('.bikes .fa-close').on('click', function (e) {

            $('.bikes').removeClass('is_open');

        });

        //open bike detail popup on mobile
        $('.bike-detail .fa-close').on('click', function (e) {

            $('.bike-detail').removeClass('is_open');

        });
    }

    //open menu on mobile
    $('.menu-toggle').on('click', function (e) {

        $('nav').addClass('is_open');

    });

    //close menu on mobile
    $('nav .fa-close').on('click', function (e) {

        $('nav').removeClass('is_open');

    });

    //create new bike
    $('.create-new-bike [type="submit"]').on('click', function (e) {
        e.preventDefault();

        var name = $('.create-new-bike [name="name"]').val();
        var number = $('.create-new-bike [name="number"]').val();

        system.bike2 = [
            {
                'name': name,
                'number': number
            }
        ];

        if (name !== '' && number !== '') {
            $.cookie('new_bike', JSON.stringify(system.bike2), { expires: 7, path: '/' });

            return window.location.href = 'bikes.phtml'
        }

    })

});
