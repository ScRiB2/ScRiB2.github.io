$(document).ready(function () {
    $('.carousel__inner').slick({
        autoplay: true,
        speed: 1200,
        autoplaySpeed: 4000,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png" alt="left"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png" alt="right"></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                    arrows: false,
                    adaptiveHeight: true,
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active')
            .siblings()
            .removeClass('catalog__tab_active')
            .closest('div.container')
            .find('div.catalog__content')
            .removeClass('catalog__content_active')
            .eq($(this).index())
            .addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this)
                .on('click', function (e) {
                    e.preventDefault();
                    $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                    $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
                })
        })
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow')
    });

    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text(
                $('.catalog-item__subtitle').eq(i).text()
            );
            $('.overlay, #order').fadeIn('slow');
        })
    });

    $(document).on('mouseup', function (e) { // событие клика по веб-документу
        const div = $("#consultation, #order, #thanks"); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
            $('.overlay, #consultation, #order, #thanks').fadeOut('slow')
        }
    });

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                },
                phone: "Ввведите свой номер телефона",
                email: {
                    required: "Введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            },
            submitHandler: function (form, e) {
                e.preventDefault();
                $.ajax({
                    type: "GET",
                    url: "mailer/smart.php",
                    data: $(form).serialize()
                }).done(function () {
                    $(this).find("input").val("");
                    $('#consultation, #order').fadeOut();
                    $('.overlay, #thanks').fadeIn('slow');
                    $('form').trigger('reset');
                });
                return false;
            }
        });
    }

    validateForms('#consultation .feed-form');
    validateForms('#consultation-form');
    validateForms('#order .feed-form');

    $.fn.setCursorPosition = function (pos) {
        if ($(this).get(0).setSelectionRange) {
            $(this).get(0).setSelectionRange(pos, pos);
        } else if ($(this).get(0).createTextRange) {
            const range = $(this).get(0).createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };

    $('input[name=phone]').mask('+7 (999) 999-99-99').on('click', function () {
        if (this.value === '+7 (___) ___-__-__')
            $(this).setCursorPosition(4);  // set position number
    });

    // Smooth scroll and pageup

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href='#up']").on('click', function () {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top + "px"});
        return false;
    });

    new WOW().init();
});