function updateNav() {
    var currentSection = $('[section].current');
    var data = currentSection.attr('data-scroll-target');
    var $index = $('[data-scroll-target].current').index() + 1;

    $('.main-menu li').removeClass('active');
    $('.main-menu li[data-scroll-trigger= ' + data + ']').addClass('active');

    $('.main-menu').removeClass().addClass('main-menu');
    $('.main-menu').addClass("active-" + $index + "");

}

function scrollTrigger() {
    var speed = 700;
    var easing = 'swing';
    var $scrollTrigger = $('[data-scroll-trigger]');


    $scrollTrigger.click(function(e) {
        var $data = $(this).attr("data-scroll-trigger");
        var $goTo = $(document).find('[data-scroll-target= ' + $data + ']');

        $('html, body').stop().animate({
            scrollTop: $goTo.offset().top
        }, speed, easing);
        $('[data-scroll-trigger]').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
}

function identifySections() {
    var $sections = $('[section]');

    $sections.viewportChecker({
        classToAdd: 'current',
        offset: 300,
        repeat: true,
        callbackFunction: function() {
            updateNav();
        }
    });
}

function defaultInlinePopup(){


    $('[data-inline-popup]').magnificPopup({
        type:'inline',
        midClick: true,
        enableEscapeKey:true,
        closeMarkup:'<button class="mfp-close icon-close-thin"></button>',
        mainClass: 'mfp-fade',
        removalDelay: 300,
        callbacks: {
            open: function() {
                $('html').addClass('popup-open');
            },
            close: function() {
                $('html').removeClass('popup-open');
            }
        }
    });

    $('[data-close-popup]').click( function(e){
        e.preventDefault();
        $.magnificPopup.close();
    });
}

function flexGalery() {
    var $container = $('[data-gallery]');
    var $el = $container.find('.item');
    $container.imagesLoaded(function () {
        $el.each(function () {
            var $el = $(this);
            var $img = $el.find('img');
            var $imgW = $img.width();
            var $imgH = $img.height();
            $el.attr('data-w', $imgW).attr('data-h', $imgH);
        });
        $container.flexImages({
            rowHeight: 240,
            truncate: false // cut incomplete last row
        });
    });
}

function imageGallery(){
    $('.image-gallery').magnificPopup({
        type: 'image',
        enableEscapeKey:true,
        closeMarkup:'<button class="mfp-close icon-close-thin"></button>',
        mainClass: 'mfp-with-zoom',

        zoom: {
            enabled: true,
          duration: 500,
            easing: 'ease-in-out',
            opener: function(openerElement) {
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        },
        gallery: {
            enabled: true
        },
        callbacks: {
            open: function() {
                $('html').addClass('popup-open');
            },
            close: function() {
                $('html').removeClass('popup-open');
            }
        }

    });
}

function initMap(){

    var mapObject = document.getElementById("location");
    var dataObject = $("#location");

    var latitude = dataObject.attr('data-latitude'),
        longitude = dataObject.attr('data-longitude'),
        map_zoom = 17;



    var marker_image = {
        url: 'images/location-large.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(128, 109),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(38, 103)
    };

    var style = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}];

    var mapOptions = {
            zoom: map_zoom,
            styles: style,
            center:new google.maps.LatLng(latitude,longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            panControl: false,
            zoomControl: false,
            streetViewControl: false,
            overviewMapControl: false,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false
        },


        map = new google.maps.Map(mapObject, mapOptions);
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
        visible: true,
        animation: google.maps.Animation.DROP,
        icon: marker_image
    });

// setup zoom in button
    function zoomIn() {
        var currentZoomLevel = map.getZoom();
        if(currentZoomLevel != 21){
            map.setZoom(currentZoomLevel + 1);
        }
    }
// setup zoom out button
    function zoomOut() {
        var currentZoomLevel = map.getZoom();
        if(currentZoomLevel != 0){
            map.setZoom(currentZoomLevel - 1);}
    }

    $(document).on('click', '#map-zoomin', function() {
        zoomIn()
    });
    $(document).on('click', '#map-zoomout', function() {
        zoomOut()
    });
};



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready( function() {
    var s = skrollr.init({
        edgeStrategy: 'set',
        easing: {
            WTF: Math.random,
            inverted: function(p) {
                return 1-p;
            }
        }
    });

    if (s.isMobile()) {
        s.destroy();
    }

    $('[section]').imagesLoaded( function() {
        setTimeout(function() {
            $('[site-loader]').fadeOut(500);
        },300);
    });

    scrollTrigger();
    identifySections();
    defaultInlinePopup();
    flexGalery();
    imageGallery();

    $('.bg').bgImage();
    $('.vertical-center').verticalCenter();

//---------------------------------------------------------------
    google.maps.event.addDomListener(window, 'load', initMap);
    google.maps.event.addDomListener(window, 'resize', initMap)
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).on( 'resize', function() {
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




