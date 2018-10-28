$(document).ready(function(){   
    
	/*video*/
    $('#js-video-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite: false,
        responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
                variableWidth: false,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                variableWidth: false
              }
            }
        ]
    });
    
    /*portfolio*/
    $('.js-portfolio-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite: false
    });
    
    /*team*/
    $('#js-team-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite: false,
        responsive: [
            {
              breakpoint: 1199,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1
              }
            }
        ]
    });
});
