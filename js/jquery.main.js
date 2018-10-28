$(document).ready(function(){
     /*кнопка скролл*/
     $('.js-scroll').click(function(e){
         e.preventDefault();
         var anchor = $(this).attr("href");
         var scroll_el = $(anchor);
         if ($(scroll_el).length != 0) { 
             $('html, body').animate({ scrollTop: $(scroll_el).offset().top}, 250); 
         }
     });
    
    /*popup*/
    $('.js-order-btn').on('click', function(){
		var formName = $(this).attr('data-name');
		if(formName){
			$('#js-order-popup').find('.popup__title').html(formName);
			$('#js-order-popup').find('input[name="form_subject"]').val(formName);
		} else{
			$('#js-order-popup').find('.popup__title').html('Заказать звонок');
			$('#js-order-popup').find('input[name="form_subject"]').val('BigDATAkey - новая заявка');
		}
        $('#js-order-popup').fadeToggle(250);
        //блок окна браузера
        var topPos = $(window).scrollTop();
        $(window).scroll(function(){
            $(this).scrollTop(topPos);
        });
    });
    //разблок окна браузера
    $('.popup .js-order-btn').on('click', function(){
        $(window).unbind('scroll');
		$(window).on('scroll', function(){         
			 var headerHeight = $('#js-header').innerHeight(),
				 windOffset = $(window).scrollTop();
			 if(windOffset > (headerHeight + 20)){
				 $('#js-header-mob').addClass('fix');
			 } else{
				 $('#js-header-mob').removeClass('fix');
			 }
		 });
		$(window).on('scroll', function(){         
			 var headerHeight = $('#js-main-sec').innerHeight(),
				 windOffset = $(window).scrollTop();
			 if(windOffset > (headerHeight)){
				 $('#js-header-mob').addClass('fix');
			 } else{
				 $('#js-header-mob').removeClass('fix');
			 }
		 });
    });
    
    
    /*input phonenumber mask*/
    var valid = false;
    $(".js-mask").mask("+7 (999) 999 - 99 - 99", {
        placeholder: "+7 (___) ___ - __ - __" ,
        completed : function(){
            valid = true;
        }
    });
    
    $('.js-form-val').on('submit', function(e){
        e.preventDefault();    
        var form = $(this);
    
        if (valid){
            $.ajax({
                url: "php/mail.php",
                type: "POST",
                response: "HTML",
                data: $(this).serialize(),    
                success: function(data) {
    					$('#js-order-popup').fadeOut(250);
                        $('#js-popup-ready').fadeIn(250);
                    },
                error: function() {
    				console.log("Не возможно отправить");
                }
            });
        } else {
            $('.js-val').addClass('error');
        }
    });
    $('.js-val').on('keypress', function(){
        $(this).removeClass('error');
    });
    
    /*Закрыть попап ответа*/
    $('.js-popup-ready-btn').on('click', function(){
        $('#js-popup-ready').fadeOut(250);
        $('#js-action-main').fadeOut(250);
        $('#js-action-main-overlay').fadeOut(250);
        $('#js-action-overlay').fadeOut(250);
        $('#js-action').removeClass('open');
        $(window).unbind('scroll');
		$(window).on('scroll', function(){         
			 var headerHeight = $('#js-header').innerHeight(),
				 windOffset = $(window).scrollTop();
			 if(windOffset > (headerHeight + 20)){
				 $('#js-header-mob').addClass('fix');
			 } else{
				 $('#js-header-mob').removeClass('fix');
			 }
		 });
		$(window).on('scroll', function(){         
			 var headerHeight = $('#js-main-sec').innerHeight(),
				 windOffset = $(window).scrollTop();
			 if(windOffset > (headerHeight)){
				 $('#js-header-mob').addClass('fix');
			 } else{
				 $('#js-header-mob').removeClass('fix');
			 }
		 });
    });
	
	/*показать фикс меню*/
    $(window).on('scroll', function(){         
         var headerHeight = $('#js-header').innerHeight(),
             windOffset = $(window).scrollTop();
         if(windOffset > (headerHeight * 2)){
             $('#js-header-mob').addClass('fix');
         } else{
             $('#js-header-mob').removeClass('fix');
         }
     });
	 /*показать акцию*/
	$(window).on('scroll', function(){         
         var mainHeight = $('#js-main-sec').innerHeight(),
             windOffset = $(window).scrollTop();
		 
         if(windOffset > mainHeight){
             
			 $('#js-action-btn').addClass('fix');
         } else{
			 $('#js-action-btn').removeClass('fix');
             
         }
     });
    
    /*mob menu*/
    $('.js-mob-menu-btn').on('click', function(){
        $(this).toggleClass('open');
        $('#js-mob-menu').slideToggle(250);
        $('html').add('body').toggleClass('no-scroll');
    })
    
    /*effects*/
    if($('.scroll-animate').length){
        function coffeAnimate(){
            if($('.coffe-animation.active').next().length){
                var next = $('.coffe-animation.active').next();
                $('.coffe-animation.active').removeClass('active');
                next.addClass('active')
            }else{
                $('.coffe-animation.active').removeClass('active');
                $('.coffe-animation').eq(0).addClass('active')
            }
        }
        function mouse(){
            if($('.mouse__img.active').next().length){
                var next = $('.mouse__img.active').next();
                $('.mouse__img.active').removeClass('active');
                next.addClass('active')
            }else{
                $('.mouse__img.active').removeClass('active');
                $('.mouse__img').eq(0).addClass('active')
            }
        }
        /*phone*/
        var $mobile = $('.phone__content');
        var animatedContainerScrolled = 0;
        var $animatedContainer = $('.scroll-animate');
        /*graph*/
        var k = 1;
        var index = 0;
        var graphs = [10,15,20,25,31];

        $(window).on('scroll', function(){
            //coffeee
            coffeAnimate();
            //coffeee
            mouse();
            ////phone
            var windowScrolled =  $(window).scrollTop();
            var animatedContainerPosY = $animatedContainer.offset().top;
            animatedContainerScrolled = windowScrolled-animatedContainerPosY;
            $mobile.scrollTop(animatedContainerScrolled*.3);
            //graph      
            for (var i = 0; i <graphs.length; i++) {

                if(graphs[i] < animatedContainerScrolled+250*k){
                  index = i;
                }

            }
            for (var i = index - 1; i >= 0; i--) {

                $('.gaph span').eq(i).css('height', graphs[i] + 'rem');
            }


            $('.gaph span').eq(index).height(animatedContainerScrolled+250*k);
            if(animatedContainerScrolled+250 < 0){
                $('.gaph span').height(0)
            }
            if(animatedContainerScrolled+250*k > 340 ){
                $('.gaph span').eq(4).css('height', 34 + 'rem');
                $('.graph-line').addClass('is-visible')
              }else{
                $('.graph-line').removeClass('is-visible')
            }
        });
    }
    
    /*devices*/
    if($('#js-top-scroll').length){
        
        var $desctop = $('.desctop-blc__frame');
        var $tab = $('.tab-blc__frame');
        var $mob = $('.mob-blc__frame');
        $(window).on('scroll', function(){
            $desctop.scrollTop($(window).scrollTop() * 1);
            $tab.scrollTop($(window).scrollTop() * .3);
            $mob.scrollTop($(window).scrollTop() * .3);
        });
    }    
    
    /*video popup*/
    if($('#js-video-vrapper').length){
        var iframe = $('#js-video-container iframe');
        $('.js-blind').on('click', function(){
            var winHeight = $(window).height() / 2,
                blinPos = $(this).offset().top + ($(this).height() / 2),
                scrollPos = blinPos - winHeight;
            $('#js-video-vrapper').fadeIn(250).addClass('show');
            $('html, body').animate({ scrollTop: scrollPos}, 250);
            //$('html').add('body').addClass('no-scroll');
            
            
            var srcAttr = $(this).attr('data-href');
            iframe.attr("src", srcAttr + "?autohide=1&amp;autoplay=1");
        });
        
        $('.js-video-close').on('click', function(){
            $('#js-video-vrapper').fadeOut(250).removeClass('show');
            //$('html').add('body').removeClass('no-scroll');
            iframe.removeAttr("src");
        });
    }
    
    /*fractals*/
    if($(window).width() > 767){
        if($("#particles-js").length){
            rightFract();
            leftFract();
        }
    }
    
    /*action*/
    $('.js-action-btn').on('click', function(){
        $('#js-action').toggleClass('open');
        $('#js-action-overlay').fadeToggle(150);
    });
	$('.js-action-main-btn').on('click', function(){
        $('#js-action-main').fadeToggle(250);
        $('#js-action-main-overlay').fadeToggle(250);
    });
    
});
function leftFract(){
    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 60,
          "density": {
            "enable": true,
            "value_area": 400
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 1,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 4,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 10,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#f194ff",
          "opacity": 0.7,
          "width": 2
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });


}
function rightFract(){
    particlesJS("particles-js-2", {
      "particles": {
        "number": {
          "value": 60,
          "density": {
            "enable": true,
            "value_area": 400
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 1,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 4,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 10,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#f194ff",
          "opacity": 0.7,
          "width": 2
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });



}

$('.advertisign-main').mousemove(function(e){
    var width = $(this).width() / 2;
    var height = $(this).height() / 2;
    var amountMovedX1 = ((width - e.pageX) * -1 / 16);
    var amountMovedY1 = ((height - e.pageY) * -1 / 16);

    var amountMovedX2 = ((width - e.pageX) / 40);
    var amountMovedY2 = ((height - e.pageY) / 30);

    var amountMovedX3 = ((width - e.pageX) / 20);
    var amountMovedY3 = ((height - e.pageY) / 20);

    var amountMovedX4 = ((width - e.pageX) * -1 / 10);
    var amountMovedY4 = ((height - e.pageY) * -1 / 20);

    $('.shapes1').css('marginLeft', amountMovedX1);
    $('.shapes1').css('marginTop', amountMovedY1);

    $('.shapes2').css('marginLeft', amountMovedX2);
    $('.shapes2').css('marginTop', amountMovedY2);

    $('.shapes3').css('marginLeft', amountMovedX3);
    $('.shapes3').css('marginTop', amountMovedY3);

    $('.shapes4').css('marginLeft', amountMovedX4);
    $('.shapes4').css('marginTop', amountMovedY4);
	});