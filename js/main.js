$(document).ready(function() {

 $('.mobile-wrap').on('click', function() {
    $('.line-burger').toggleClass('line-active');

    $('.main-header__list').slideToggle();
  });

  $(window).resize(function() {
    if ($(window).width() >= 768) {
      $('.main-header__list').attr('style', '');
      $('.line-burger').removeClass('line-active');
    }
    winWidth = $(window).width();
    fixedMenu();
  });

  fixedMenu();

  winWidth = $(window).width();

  function fixedMenu() {
    $('.main-header__navigation').removeClass('main-header__navigation--fixed');
    $('.header__static').css({
      'padding-bottom': 0
    });

    var offset = $('.main-header__navigation').offset().top;
    var heightMenu = $('.main-header__navigation').height();
    var paddingBottomMenu = parseInt($('.main-header__wrap').css('padding-bottom'));
    var offsetMobile = offset + heightMenu - paddingBottomMenu;

    $(window).scroll(function() {
      if (winWidth > 780) {
        if (offset <= $(window).scrollTop()) {
          $('.main-header__navigation').addClass('main-header__navigation--fixed');
          $('.header__static').css({
            'padding-bottom': heightMenu + 'px'
          });
        } else {
          $('.main-header__navigation').removeClass('main-header__navigation--fixed');
          $('.header__static').css({
            'padding-bottom': 0
          });
        }
      } else {
        if (offsetMobile <= $(window).scrollTop()) {
          $('.main-header__navigation').addClass('main-header__navigation--fixed');
          $('.header__static').css({
            'padding-bottom': heightMenu + 'px'
          });
        } else {
          $('.main-header__navigation').removeClass('main-header__navigation--fixed');
          $('.header__static').css({
            'padding-bottom': 0
          });
        }
      }
    });
  }

   $('.main-header__button button').on('click', function(e) {
    $('.main-header__input').trigger('focus');
    $('.main-header__search').addClass('main-header__search-active');
  });

  $('html').on('click', function(e) {
    if (!$(e.target).is('.main-header__button button, .main-header__input, main-header__search-wrap, main-header__search-wrap, main-header__search-btn')) {
      $('.main-header__search').removeClass('main-header__search-active');
    }
  });

  function validate(input, length, regExp, error, phone) {

    $(input).on('blur', function() {
      var value = $(this).val();
      var that = $(this);

      regExp = regExp == '' ? /./ : regExp;

      if (phone === true) {
        bool_reg = !regExp.test(value);
      } else {
        bool_reg = regExp.test(value);
      }

      if (value.length > length && value !== '' && bool_reg) {
        that.removeClass('form-fail').addClass('form-done');
        $(error).slideUp();
      } else {
        that.removeClass('form-done').addClass('form-fail');
        $(error).slideDown();
      }
    });

  };

  // деакцивация кнопки если есть поле с ошибкой

  function disBtn(input, btn) {
    var input = $(input);
    input.on('blur keyup', function() {

      if (input.hasClass('form-fail')) {
        $(btn).attr('disabled', 'disabled');
      } else {
        $(btn).removeAttr('disabled');
      }

    })

  };

  // для проверки при нажатии

  function valClick(input, length, regExp, error, btn, phone) {
    var value = $(input).val();

    regExp = regExp == '' ? /./ : regExp;

    if (phone === true) {
      bool_reg = regExp.test(value);
    } else {
      bool_reg = !regExp.test(value);
    }

    if (value.length < length && value === '' && bool_reg) {
      $(input).addClass('form-fail');
      $(error).slideDown();
    }
  };

  //  деакцивация кнопки при нажатии

  function disBtnClick(input, btn) {
    var input = $(input);

    if (input.hasClass('form-fail')) {
      $(btn).attr('disabled', 'disabled');
      return false;
    } else {
      return true;
    }

  };

  $('input[type="tel"]').mask("+38 (999) 999-99-99");

  var regFio = /^[a-zA-Zа-яА-ЯёЁ]+/;
  var regPhone = /[_]/i;

  validate('#c_name', 1, regFio, '.contacts__fail-name');
  validate('#c_phone', 1, regPhone, '.contacts__fail-telephone', true);

  disBtn('#c_name, #c_phone', '.contacts__button');

  $('.main-header__adress').on('click', function(e) {
    $('.overlay.overlay-text').addClass('overlay-active');
  });

  $('.overlay-close').click(function() {
    $('.overlay').removeClass('overlay-active');
  });


});
