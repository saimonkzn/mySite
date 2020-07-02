    
$(document).ready(function(){
    const popupLinks = document.querySelectorAll('.popup-link');
    const body = document.querySelector('body');
    const lockPadding = document.querySelectorAll('.lock-padding');

    let unlock = true;
    const timeout = 800;

    if(popupLinks.length >0){
        for (let index=0; index<popupLinks.length; index++) {
            const popupLink= popupLinks[index];
            popupLink.addEventListener('click', function(e){
                const popupName = popupLink.getAttribute('href').replace('#','');
                const curentPopup = document.getElementById(popupName);
                popupOpen(curentPopup);
                e.preventDefault();
            })
        }
    }

    const popupCloseIcon = document.querySelectorAll('.close-popup');
    if (popupCloseIcon.length>0) {
        for (let index=0; index<popupCloseIcon.length; index++){
            const el=popupCloseIcon[index];
            el.addEventListener('click', function(e){
                popupClose(el.closest('.popup'));
                e.preventDefault();
            });
        }
    }

    function popupOpen (curentPopup) {
        if (curentPopup && unlock){
            const popupActive = document.querySelector('.popup.open');
            if(popupActive) {
                popupCloseIcon(popupActive, false);
            } else {
                bodyLock();
            }
            curentPopup.classList.add('open');
            curentPopup.addEventListener('click', function(e){
                if(!e.target.closest('.popup__content')) {
                    popupClose(e.target.closest('.popup'));
                }
            });
        }
    }

    function popupClose (popupActive, doUnLock=true) {
        if (unlock) {
            popupActive.classList.remove('open');
            if (doUnLock) {
                bodyUnLock();
            }
        }
    }

    function bodyLock() {
        const lockPaddingValue = window.innerWidth-document.querySelector('.wrapper').offsetWidth+'px';

        if (lockPadding.length>0){
            for (let index=0; index<lockPadding.length; index++) {
                const el= lockPadding[index];
                el.style.paddingRight = lockPaddingValue;
            }
        }
        
        body.style.paddingRight = lockPaddingValue;
        body.classList.add('lock');

        unlock = false;
        setTimeout(function(){
            unlock= true;
        }, timeout);
    }

    function bodyUnLock() {
        setTimeout(function(){
            if(lockPadding.length>0){
                for (let index=0;index<lockPadding.length; index++){
                    const el = lockPadding[index];
                    el.style.paddingRight= '0px';
                }
            }
            
            body.style.paddingRight = '0px';
            body.classList.remove('lock');
        }, timeout);

        unlock = false;
        setTimeout(function(){
            unlock= true;
        }, timeout);
    }

    function timerSent (elem){
        popupClose(elem);
        elem.parent('.popup').removeClass('open');
    }

    $('#sendNumber').submit(function(event) {
        event.preventDefault();
        var $form = $(this),
            popMain = $(this).closest('.popup'),
            tel = $form.find('input[name="number"]').val(),
            url = $form.attr('action');

        $form.find('.error').text('');
        $form.find('input[name="number"]').css({'border-color':'#000',
        'box-shadow':'0 0 10px rgb(0,0,0,0)'});

        if($form.find('input[name="number"]').val()==='') {
            $form.find('.error').text('Write phone number');
            $form.find('input[name="number"]').css({'border-color':'red',
            'box-shadow':'0 0 10px rgb(255,0,0,0.6)'});
            return false;
        }

        var posting = $.post(url,{number: tel});

        posting.done(function(data){            
            console.log(data.form.number); 
            console.log($form.prev('.popup__title').text());  
                        
            $form.prev('.popup__title').empty().append('You sent number '+data.form.number);
            $form.hide();

            console.log(popMain.classList);
            setTimeout(function(){
                $form.closest('.popup').removeClass('open');
                bodyUnLock();
                $form.show();
                $form.prev('.popup__title').empty().append('Write your phone number');
                $('input[name=number]').val('');
            },3000);

            
        });

        return false;        

    });
    jQuery (function ($) {  
        $(function() {
          function maskPhone() {
            var country = $('#country option:selected').val();
            switch (country) {
              case "ru":
                $('input[name="number"]').mask("+7(999) 999-99-99");
                break;
              case "ua":
                $('input[name="number"]').mask("+380(999) 999-99-99");
                break;
              case "by":
                $('input[name="number"]').mask("+375(999) 999-99-99");
                break;          
            }    
          }
          maskPhone();
          $('#country').change(function() {
            maskPhone();
          });
        });
    });

});   