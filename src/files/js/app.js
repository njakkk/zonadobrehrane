function dropDown() {
    var $outerTrigger = $(document).find('[data-trigger]');
    var $outerDrop = $(document).find('[data-drop]');
    var $close = $(document).find('[data-drop]').find('.close');
    var activeClass = 'active';



    $outerTrigger.each(function() {
        var self = $(this);
        self.bind("click", function() {
            var $data = self.attr("data-trigger");

            $outerDrop.not('[data-drop= '+ $data +']').removeClass(activeClass);
            $(document).find('[data-drop= '+ $data +']').toggleClass(activeClass);
            self.toggleClass(activeClass);
            return false
        });
    });

    $(document).bind('click', function(e) {
        if($(e.target).closest($outerDrop).length != 0) {
            return false
       }
        else{
            $outerDrop.removeClass(activeClass);
            $outerTrigger.removeClass(activeClass);
        }
    });

    $close.click(function() {
        $(this).parent().removeClass(activeClass).removeAttr('style');
        return false
    });

}

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

    $('.bg').bgImage();
    $('.vertical-center').verticalCenter();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).on( 'resize', function() {
    $('.vertical-center').verticalCenter();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





