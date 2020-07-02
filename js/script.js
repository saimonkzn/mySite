$(document).ready(function(){
    $('.burgerPict').click(function(event){
        $('.mobile__nav').toggleClass('active');
        $('body').toggleClass('lock');
    });
    $('.mobileLink').click(function(event){
        $('.mobile__nav').toggleClass('active');
        $('body').toggleClass('lock');
    });
    $('form').on('submit', function(e) {
        return false; 
    });
    $('.slider').slick({
        slidesToShow: 3,
        easing: 'ease',
        autoplay: true,
        pauseOnFocus: true,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    dots: true,
                    arrows: false
                }  
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                    dots: true,
                    arrows: false
            }
        }
        ]
    });

    
    
});