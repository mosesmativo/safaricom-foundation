(function($) {
	"use strict";

	/*=============================================
    =       Menu sticky & Scroll to top          =
    =============================================*/
    var windows = $(window);
    var screenSize = windows.width();
    var sticky = $('.header-sticky');
    var $html = $('html');
    var $body = $('body');

    windows.on('scroll', function () {
        var scroll = windows.scrollTop();
        var headerHeight = sticky.height();

        if (screenSize >= 320) {
            if (scroll < headerHeight) {
                sticky.removeClass('is-sticky');
            } else {
                sticky.addClass('is-sticky');
            }
        }

    });


    /*----------  Scroll to top  ----------*/
    function scrollToTop() {
        var $scrollUp = $('#scroll-top'),
            $lastScrollTop = 0,
            $window = $(window);

        $window.on('scroll', function () {
            var st = $(this).scrollTop();
            if (st > $lastScrollTop) {
                $scrollUp.removeClass('show');
            } else {
                if ($window.scrollTop() > 200) {
                    $scrollUp.addClass('show');
                } else {
                    $scrollUp.removeClass('show');
                }
            }
            $lastScrollTop = st;
        });

        $scrollUp.on('click', function (evt) {
            $('html, body').animate({scrollTop: 0}, 600);
            evt.preventDefault();
        });
    }
    scrollToTop();


    /*===========================================
    =            Submenu viewport position      =
    =============================================*/

    if ($(".has-children--multilevel-submenu").find('.submenu').length) {
        var elm = $(".has-children--multilevel-submenu").find('.submenu');

        elm.each(function(){
            var off = $(this).offset();
            var l = off.left;
            var w = $(this).width();
            var docH = windows.height();
            var docW = windows.width() - 10;
            var isEntirelyVisible = (l + w <= docW);

            if (!isEntirelyVisible) {
                $(this).addClass('left');
            }
        });
    }
    /*==========================================
    =            mobile menu active            =
    ============================================*/

    $("#mobile-menu-trigger").on('click', function(){
        $("#mobile-menu-overlay").addClass("active");
        $body.addClass('no-overflow');
    });

    $("#mobile-menu-close-trigger").on('click', function(){
        $("#mobile-menu-overlay").removeClass("active");
        $body.removeClass('no-overflow');
    });

    $(".offcanvas-navigation--onepage ul li a").on('click', function(){
        $("#mobile-menu-overlay").removeClass("active");
        $body.removeClass('no-overflow');
    });

    /*Close When Click Outside*/
    $body.on('click', function(e){
        var $target = e.target;
        if (!$($target).is('.mobile-menu-overlay__inner') && !$($target).parents().is('.mobile-menu-overlay__inner') && !$($target).is('#mobile-menu-trigger') && !$($target).is('#mobile-menu-trigger i')){
            $("#mobile-menu-overlay").removeClass("active");
            $body.removeClass('no-overflow');
        }
        if (!$($target).is('.search-overlay__inner') && !$($target).parents().is('.search-overlay__inner') && !$($target).is('#search-overlay-trigger') && !$($target).is('#search-overlay-trigger i')){
            $("#search-overlay").removeClass("active");
            $body.removeClass('no-overflow');
        }
    });
		/*===================================
    =           Menu Activeion          =
    ===================================*/
    var cururl = window.location.pathname;
    var curpage = cururl.substr(cururl.lastIndexOf('/') + 1);
    var hash = window.location.hash.substr(1);
    if((curpage == "" || curpage == "/" || curpage == "admin") && hash=="")
        {
        //$("nav .navbar-nav > li:first-child").addClass("active");
        } else {
            $(".navigation-menu li").each(function()
        {
            $(this).removeClass("active");
        });
        if(hash != "")
            $(".navigation-menu li a[href*='"+hash+"']").parents("li").addClass("active");
        else
        $(".navigation-menu li a[href*='"+curpage+"']").parents("li").addClass("active");
    }


    /*=========================================
    =             open menu Active            =
    ===========================================*/
     $('.openmenu-trigger').on('click', function (e) {
        e.preventDefault();
        $('.open-menuberger-wrapper').addClass('is-visiable');
    });

    $('.page-close').on('click', function (e) {
        e.preventDefault();
        $('.open-menuberger-wrapper').removeClass('is-visiable');
    });


    /*=========================================
    =             open menu Active            =
    ===========================================*/
    $("#open-off-sidebar-trigger").on('click', function(){
        $("#page-oppen-off-sidebar-overlay").addClass("active");
        $body.addClass('no-overflow');
    });

    $("#menu-close-trigger").on('click', function(){
        $("#page-oppen-off-sidebar-overlay").removeClass("active");
        $body.removeClass('no-overflow');
    });

    /*=============================================
    =            search overlay active            =
    =============================================*/

    $("#search-overlay-trigger").on('click', function(){
        $("#search-overlay").addClass("active");
        $body.addClass('no-overflow');
    });

    $("#search-close-trigger").on('click', function(){
        $("#search-overlay").removeClass("active");
        $body.removeClass('no-overflow');
    });


    /*=========================================
    =             open menu Active            =
    ===========================================*/
     $('.share-icon').on('click', function (e) {
        e.preventDefault();
        $('.entry-post-share').toggleClass('opened');
    });

    $body.on("click", function () {
        $(".entry-post-share").removeClass('opened');
    });
    // Prevent closing dropdown upon clicking inside the dropdown
    $(".entry-post-share").on("click", function(e) {
        e.stopPropagation();
    });

    /*=============================================
    =            offcanvas mobile menu            =
    =============================================*/
    var $offCanvasNav = $('.offcanvas-navigation'),
        $offCanvasNavSubMenu = $offCanvasNav.find('.sub-menu');

    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i></i></span>');

    /*Close Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.slideUp();

    /*Category Sub Menu Toggle*/
    $offCanvasNav.on('click', 'li a, li .menu-expand', function(e) {
        var $this = $(this);
        if ( ($this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('menu-expand')) ) {
            e.preventDefault();
            if ($this.siblings('ul:visible').length){
                $this.parent('li').removeClass('active');
                $this.siblings('ul').slideUp();
            } else {
                $this.parent('li').addClass('active');
                $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
                $this.closest('li').siblings('li').find('ul:visible').slideUp();
                $this.siblings('ul').slideDown();
            }
        }
    });

    //odometer
    if ($(".odometer").length) {
    $(".odometer").appear(function (e) {
      var odo = $(".odometer");
      odo.each(function () {
        var countNumber = $(this).attr("data-count");
        $(this).html(countNumber);
      });
    });
  }

    //LightBox / Fancybox
    $('.lightbox-image').fancybox({
        openEffect  : 'fade',
        closeEffect : 'fade',
        helpers : {
            media : {}
        }
    });

    //Main slider
    $('.homebanner').owlCarousel({
        loop: true,
        nav: false,
        dots: true,
        autoplayHoverPause: true,
        items: 1,
        autoplay: false,
        margin: 30
    });

    //About grey slider
    $('#timelineslider').owlCarousel({
        loop: false,
        nav: false,
        dots: false,
        autoplayHoverPause: true,
        autoplay: false,
        margin: 0,
        responsive: {
            0: {
                items: 1,
								dots: true,
            },
            576: {
                items: 1,
								dots: true,
            },
            768: {
                items: 2,
								dots: true,
            },
            992: {
                items: 3,
            },
            1200: {
                items: 3,
            }
        }
    });

		//About grey slider
		$('#pillars').owlCarousel({
				loop: false,
				nav: false,
				dots: false,
				autoplayHoverPause: true,
				autoplay: false,
				margin: 0,
				responsive: {
						0: {
								items: 1,
								dots: true,
						},
						576: {
								items: 1,
						},
						768: {
								items: 2,
						},
						992: {
								items: 3,
						},
						1200: {
								items: 3,
						}
				}
		});

		$('#stories').owlCarousel({
				loop: false,
				nav: false,
				dots: false,
				autoplayHoverPause: true,
				autoplay: false,
				margin: 0,
				responsive: {
						0: {
								items: 1,
								dots: true,
						},
						576: {
								items: 1,
						},
						768: {
								items: 2,
						},
						992: {
								items: 3,
						},
						1200: {
								items: 3,
						}
				}
		});

    $('#tabs1').owlCarousel({
    loop: false,
    nav: true,
    dots: false,
    autoplayHoverPause: true,
    autoplay: false,
    margin: 0,
    responsive: {
        0: {
                items: 2,
                dots:true,
                nav: false,
        },
        576: {
                items: 3,
        },
        768: {
                items: 3,
        },
        1200: {
                items: 5,
        }
    }
    });

    var owl = $("#slider-carousel");
     owl.owlCarousel({
       items: 4,
       margin:20,
       itemsDesktop: [1000, 4],
       itemsDesktopSmall: [900, 2],
       itemsTablet: [600, 1],
       itemsMobile: false,
       pagination: false
     });
     $(".next").click(function() {
       owl.trigger('owl.next');
     })
     $(".prev").click(function() {
       owl.trigger('owl.prev');
     })


})(window.jQuery);
