$(function() {

    //Fixed navigation
    var $menu = $(".nd-header");
    $(window).scroll(function() {
        if ( $(this).scrollTop() > 300 && $menu.hasClass("nd-header-default") ) {
            $menu.removeClass("nd-header-default").addClass("nd-header-fixed");
        } else if($(this).scrollTop() <= 300 && $menu.hasClass("nd-header-fixed")) {
            $menu.removeClass("nd-header-fixed").addClass("nd-header-default");
        }
    });

    // Smooth scroll to :target links
    var scrollupSelector = '.nd-scrollup';
    var smoothScrollTime = 700;
    $(document).on('click', 'a[href*="#"]:not([href="#"])', function(event) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, smoothScrollTime);
                return true;
            }
        }
    });

    $('.nd-header__phones__arrow').click(function() {
        $(this).toggleClass('active');
        $('.nd-header__phones__dropdown').toggleClass('active');
    });

    // Spincrement
    $(window).on("scroll load resize", function(){

        var show = true;
        var countbox = $(".nd-trust");
 
        if(!show) return false;                   // Отменяем показ анимации, если она уже была выполнена
 
        var w_top = $(window).scrollTop();        // Количество пикселей на которое была прокручена страница
        var e_top = $(countbox).offset().top;     // Расстояние от блока со счетчиками до верха всего документа

        var w_height = $(window).height();        // Высота окна браузера
        var d_height = $(document).height();      // Высота всего документа
 
        var e_height = $(countbox).outerHeight(); // Полная высота блока со счетчиками
 
        if(w_top + 200 >= e_top){
            $(".nd-trust-count1").spincrement({
                thousandSeparator: "",
                duration: 2000,
                to: 10
            }).addClass('op');
            $(".nd-trust-count2").spincrement({
                thousandSeparator: "",
                duration: 2000,
                to: 50
            }).addClass('op');
            $(".nd-trust-count3").spincrement({
                thousandSeparator: "",
                duration: 2000,
                to: 100
            }).addClass('op');
            $(".nd-trust-count4").spincrement({
                thousandSeparator: "",
                duration: 2000,
                to: 1579
            }).addClass('op');

            show = false;
        }
    });

    // Swiper Portfolio initialization
    var galleryTop = new Swiper('.gallery-top', {
        autoplay: 4000,
        spaceBetween: 10,
        grabCursor: true
    });
    var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 0,
        slidesPerView: 'auto',
        centeredSlides: true,
        touchRatio: 0.2,
        slideToClickedSlide: true,
        grabCursor: true,
        nextButton: '.swiper-button-next-thumbs',
        prevButton: '.swiper-button-prev-thumbs'
    });
    galleryTop.params.control = galleryThumbs;
    galleryThumbs.params.control = galleryTop;

    // Swiper Review initialization
    var swiper = new Swiper('.swiper-reviews', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next-review',
        prevButton: '.swiper-button-prev-review',
        spaceBetween: 30,
        loop: true,
        autoHeight: true,
        slidesPerView: 1,
        centeredSlides: true,
        grabCursor: true
    });

});

var hasBeenShowed = false;

$(function() {
    // Init popups
    $("#nd-more").iziModal({
        width: '950px',
        padding: 50,
        radius: 0,
        navigateCaption: false,
        navigateArrows: false,
        history: false,
        bodyOverflow: false,
        closeOnEscape: true,
        overlayColor: 'rgba(0, 0, 0, 0.5)',
        timeout: false,
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutDown'
    });
    $("#nd-free-lesson-form, #nd-stoke-form, #nd-courses-form, #nd-call-form, #nd-success-gift-form, #nd-menu-form, #nd-gift-form").iziModal({
        width: '750px',
        padding: 0,
        radius: 0,
        navigateCaption: false,
        navigateArrows: false,
        history: false,
        bodyOverflow: false,
        closeOnEscape: true,
        overlayColor: 'rgba(0, 0, 0, 0.5)',
        timeout: false,
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutDown',
        focusInput: false,
        onClosing: function() {
            gaTrack('/');
            yaHit('/');
        }
    });
    $("#nd-free-gift-form").iziModal({
        width: '750px',
        padding: 0,
        radius: 0,
        navigateCaption: false,
        navigateArrows: false,
        history: false,
        bodyOverflow: false,
        closeOnEscape: true,
        overlayColor: 'rgba(0, 0, 0, 0.5)',
        timeout: false,
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutDown',
        autoOpen: 60000,
        focusInput: false,
        onClosing: function() {
            gaTrack('/');
            yaHit('/');
        }
    });
    var iziForms = [{
        trigger: '.nd-free-lesson-form__trigger',
        target: '#nd-free-lesson-form'
    }, {
        trigger: '.nd-courses-form__trigger',
        target: '#nd-courses-form'
    }, {
        trigger: '.nd-call-form__trigger',
        target: '#nd-call-form'
    }, {
        trigger: '.nd-menu-form__trigger',
        target: '#nd-menu-form'
    }, {
        trigger: '.nd-more__trigger',
        target: '#nd-more'
    }];
    iziForms.forEach(function(iziForm) {
        $(document).on('click', iziForm.trigger, function(event) {
            event.preventDefault();
            $(iziForm.target).iziModal('open');
        });
    });
    $(document).on('click', '.nd-success-popup__btn', function(event) {
        event.preventDefault();
        $('#nd-success-gift-form').iziModal('close');
        $('#nd-gift-form').iziModal('open');
    });

    // Add phone mask
    $("input[id*=phone]").mask("+375 (99) 999-99-99");

    $(document).on('click', '.gift__btn', function(event) {
        var $container = $(this).parent('.nd-contact-form');
        var email = $container.find('input[id$="__email"]').val();
        if (email) {
            $('#nd-gift-form').iziModal('close');
            $.post("/backend/subscribe.php", {
                email: email
            }).done(function(data) {
                // do nothing
            });
        }
    });

    // Submit button handler
    $(document).on('click', '.nd-submit', function(event) {
        if ($(this).hasClass('gift__btn')) {
            return;
        }
        var $container = $(this).parent('.nd-contact-form');
        var phone = $container.find('input[id$="__phone"]').val();
        var name = $container.find('input[id$="__name"]').val();
        var theme = $(this).attr('data-theme');
        if (name) {
            $('input[id$="__name"]').val(name);
        }
        if (phone) {
            $('input[id$="__phone"]').val(phone);
            submitForm(theme || 'Заявка на обратный звонок', name, phone);
        }

        function submitForm(theme, name, phone) {
            $.post("/backend/submit.php", {
                theme: theme,
                name: name,
                phone: phone
            }).done(function(data) {
                if (data == "OK") {
                    iziForms.forEach(function(iziForm) {
                        $(iziForm.target).iziModal('close');
                    });
                    $('#nd-success-gift-form').iziModal('open');
                    gaTrack('/success.html');
                    yaHit('/success.html');
                    fbq('track', 'success', {
                        name: name,
                        phone: phone
                    });
                }
            });
        }
    });

    // Submit button handler
    $(document).on('click', '.nd-contact-form__btn-gift', function(event) {

        var $container = $(this).parent('.nd-contact-form');
        var phone = $container.find('input[id$="__phone"]').val();
        var name = $container.find('input[id$="__name"]').val();
        var theme = $(this).attr('data-theme');
        if (name) {
            $('input[id$="__name"]').val(name);
        }
        if (phone) {
            $('input[id$="__phone"]').val(phone);
            submitForm(theme || 'Заявка на обратный звонок', name, phone);
        }

        function submitForm(theme, name, phone) {
            $.post("/backend/submit.php", {
                theme: theme,
                name: name,
                phone: phone
            }).done(function(data) {
                if (data == "OK") {
                    $('#nd-free-gift-form').iziModal('close');
                    $('#nd-success-gift-form').iziModal('open');
                    gaTrack('/success.html');
                    yaHit('/success.html');
                    fbq('track', 'success', {
                        name: name,
                        phone: phone
                    });
                }
            });
        }
    });

    // Youtube video block
    $(document).on('click', '.nd-video__icon', function(event) {
        var height = $('.nd-video').outerHeight();
        $('.nd-video')
            .css({
                'max-height': height
            })
            .html(
                '<iframe width="640" height="360" ' +
                'src="https://www.youtube.com/embed/videoseries?list=PLJJ6y-ag9R6GIoPlpR1tqCu_leyD4APk8&autoplay=1" ' +
                'frameborder="0" allowfullscreen></iframe>'
            )
            .removeClass('nd-video')
            .addClass('nd-video__embedded');
        $(window).trigger('resize');
    });

    // Scrollup button
    var scrollupSelector = '.nd-scrollup';
    var smoothScrollTime = 700;
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $(scrollupSelector).fadeIn();
        } else {
            $(scrollupSelector).fadeOut();
        }
    });

    $(scrollupSelector).click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, smoothScrollTime);
        return false;
    });

    $(".current-year").text(new Date().getFullYear());
});

var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('google-map'), {
        center: {
            lat: 53.903467,
            lng: 27.563767
        },
        zoom: 17,
        scrollwheel: false,
        styles: [{
            "featureType": "all",
            "elementType": "all",
            "stylers": [{
                "saturation": -100
            }, {
                "gamma": 0.5
            }]
        }]
    });
    var marker = new google.maps.Marker({
        position: {
            lat: 53.903467,
            lng: 27.563767
        },
        map: map,
        title: 'Фотошкола Павла Бабарыкина',
        icon: 'images/png/placeholder-small.png'
    });
    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Фотошкола Павла Бабарыкина</h1>' +
        '<div id="bodyContent">' +
        '<p>пр. Независимости, 25</p>' +
        '</div>' +
        '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 400
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}