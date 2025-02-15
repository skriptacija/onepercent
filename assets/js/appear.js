/*

 * jQuery.appear

 * https://github.com/bas2k/jquery.appear/

 * http://code.google.com/p/jquery-appear/

 * http://bas2k.ru/

 *

 * Copyright (c) 2009 Michael Hixson

 * Copyright (c) 2012-2014 Alexander Brovikov

 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)

 */

(function($) {

    $.fn.appear = function(fn, options) {



        var settings = $.extend({



            //arbitrary data to pass to fn

            data: undefined,



            //call fn only on the first appear?

            one: true,



            // X & Y accuracy

            accX: 0,

            accY: 0



        }, options);



        return this.each(function() {



            var t = $(this);



            //whether the element is currently visible

            t.appeared = false;



            if (!fn) {



                //trigger the custom event

                t.trigger('appear', settings.data);

                return;

            }



            var w = $(window);



            //fires the appear event when appropriate

            var check = function() {



                //is the element hidden?

                if (!t.is(':visible')) {



                    //it became hidden

                    t.appeared = false;

                    return;

                }



                //is the element inside the visible window?

                var a = w.scrollLeft();

                var b = w.scrollTop();

                var o = t.offset();

                var x = o.left;

                var y = o.top;



                var ax = settings.accX;

                var ay = settings.accY;

                var th = t.height();

                var wh = w.height();

                var tw = t.width();

                var ww = w.width();



                if (y + th + ay >= b &&

                    y <= b + wh + ay &&

                    x + tw + ax >= a &&

                    x <= a + ww + ax) {



                    //trigger the custom event

                    if (!t.appeared) t.trigger('appear', settings.data);



                } else {



                    //it scrolled out of view

                    t.appeared = false;

                }

            };



            //create a modified fn with some additional logic

            var modifiedFn = function() {



                //mark the element as visible

                t.appeared = true;



                //is this supposed to happen only once?

                if (settings.one) {



                    //remove the check

                    w.unbind('scroll', check);

                    var i = $.inArray(check, $.fn.appear.checks);

                    if (i >= 0) $.fn.appear.checks.splice(i, 1);

                }



                //trigger the original fn

                fn.apply(this, arguments);

            };



            //bind the modified fn to the element

            if (settings.one) t.one('appear', settings.data, modifiedFn);

            else t.bind('appear', settings.data, modifiedFn);



            //check whenever the window scrolls

            w.scroll(check);



            //check whenever the dom changes

            $.fn.appear.checks.push(check);



            //check now

            (check)();

        });

    };



    //keep a queue of appearance checks

    $.extend($.fn.appear, {



        checks: [],

        timeout: null,



        //process the queue

        checkAll: function() {

            var length = $.fn.appear.checks.length;

            if (length > 0) while (length--) ($.fn.appear.checks[length])();

        },



        //check the queue asynchronously

        run: function() {

            if ($.fn.appear.timeout) clearTimeout($.fn.appear.timeout);

            $.fn.appear.timeout = setTimeout($.fn.appear.checkAll, 20);

        }

    });



    //run checks when these methods are called

    $.each(['append', 'prepend', 'after', 'before', 'attr',

        'removeAttr', 'addClass', 'removeClass', 'toggleClass',

        'remove', 'css', 'show', 'hide'], function(i, n) {

        var old = $.fn[n];

        if (old) {

            $.fn[n] = function() {

                var r = old.apply(this, arguments);

                $.fn.appear.run();

                return r;

            }

        }

    });



})(jQuery);


    // Funkcija za detekciju skrolovanja
    window.addEventListener('scroll', function() {
        const loginButton = document.getElementById('loginButton');
        
        // Ako je stranica skrolovana više od 100px, sakrij dugme
        if (window.scrollY > 100) {
            loginButton.classList.add('hidden');
        } else {
            loginButton.classList.remove('hidden');
        }
    });


//////////////////////////////////////////////////////////////////////////////////////////////////


// Funkcija koja se poziva kada korisnik skroluje
window.onscroll = function() {
    let btn = document.getElementById("scrollToTopBtn");

    // Ako je skrolovano više od 100px, dugme postaje vidljivo
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        btn.classList.add("visible"); // Dodajemo klasu koja prikazuje dugme
    } else {
        btn.classList.remove("visible"); // Uklanjamo klasu koja skriva dugme
    }
};

// Funkcija za ubrzano glatko skrolovanje do vrha stranice
function scrollToTop() {
    let currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
    let targetPosition = 0;
    let scrollSpeed = 15; // Smanjena brzina (ubrzana verzija)

    // Kreiramo interval za skrolovanje
    let scrollInterval = setInterval(function() {
        // Računamo razliku između trenutne pozicije i ciljne
        let distanceToScroll = targetPosition - currentPosition;

        // Ako smo već dostigli vrh, zaustavi interval
        if (Math.abs(distanceToScroll) <= 1) {
            clearInterval(scrollInterval);
        }

        // Skroluj ka vrhu sa kontrolisanim brzinama
        currentPosition += distanceToScroll / scrollSpeed;
        window.scrollTo(0, currentPosition);
    }, 15); // Interval koji se koristi za glatko skrolovanje (smanjen za brži efekat)
}




