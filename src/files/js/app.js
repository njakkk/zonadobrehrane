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
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).on( 'resize', function() {
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





