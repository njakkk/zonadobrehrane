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

function homeSlider(){
    var slider = $('.home-slider');

    slider.each(function () {
        $(this).owlCarousel({
            singleItem:true,
            navigation : false,
            pagination: true,
            navigationText : ["", ""],
            transitionStyle: "fade",
            autoPlay: false,
            stopOnHover:true,
            autoHeight : false,
            addClassActive: true,
            touchDrag: true,
            mouseDrag: false,
            rewindNav : true
        });
    });
}

function wrapWord(){
    var el = $('.letters');

    el.each(function() {
        var words = $(this).text().split("");
        for (i in words)
            words[i] = '<letter>' + words[i] + '</letter>';

        var text = words.join('');
        $(this).empty().html(text);
    });

}

function scrollShow(){

    if($(window).width() > 1200) {
        $('.scroll-show, .project-tip').viewportChecker({
            classToAdd: 'active',
            offset: 0,
            repeat: false,
            scrollBox: $('[page]')
        });
    }

    if($(window).width() > 1200) {
        $('.scroll-show, .project-tip').viewportChecker({
            classToAdd: 'active',
            offset: 0,
            repeat: false,
            scrollBox: $('.project-content')
        });
    }

}

$.fn.changeOnScroll = function () {

    var  $el = $(this);
    var scrollEl = $('[page]');

    function changeEl(){
        $el.each(function() {
            var self = $(this);
            var top = self.offset().top;

            scrollEl.on('scroll', function() {
                if ($(this).scrollTop() > top && $(window).width()<1200){
                    self.addClass("filled");
                }
                else{
                    self.removeClass("filled");
                }
            });
        });

    }
    changeEl();
    $(window).on('resize',function() {
        changeEl();
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

    $('.home-slider').imagesLoaded( function() {
        setTimeout(function() {
            $('[site-loader]').fadeOut(500);
        },300);
    });

    $('.bg').bgImage();
    $('.vertical-center').verticalCenter();
    wrapWord();
    dropDown();
    $('.header').changeOnScroll();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).on( 'resize', function() {
    scrollShow();
    $('.vertical-center').verticalCenter();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





