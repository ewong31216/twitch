$(function(){
    if(!window.sunhing){window.sunhing = {}}
    var checkPage = function(){
        createParams(window.location.hash);
    };
    var createParams = function(hash){
        if(!window.sunhing.params){
            window.sunhing.params = {};
        }
        hash = hash.replace(/^#/,'');
        var hashArray = hash.split('&');
        if(hashArray && hashArray.length){
            $.each(hashArray, function(i, paramString){
                var keyValue = paramString.split('=');
                if(keyValue && keyValue.length === 2){
                    window.sunhing.params[keyValue[0]] = keyValue[1];
                }
            });
        }
        if(!window.sunhing.params.page){
            window.sunhing.params.page = 'home';
        }
        setPage(window.sunhing.params.page);
    };
    var setPage = function(page){
        if(window.sunhing.currentPage !== page){
            window.sunhing.currentPage = page;
            $('.data-div').empty();
            $('.sidenav .list-group-item').removeClass('active');
            $('.sidenav .list-group-item.' + page).addClass('active');
            $('.pages').hide();
            $('.page-' + page).show();
            switch(page){
                case 'home':
                    listBrand($('.brand-carousel'));
                    makeCarousel($('.brand-carousel'));
                    break;
            }
        }
    };
    var listBrand = function(page){
        if(window.sunhing.brand && window.sunhing.brand.length){
            $.each(window.sunhing.brand, function(i, brand){
                page.append('<div class="brand-item item"><h2>' + brand.title + '</h2><img src="' + brand.image + '" /><h3>' + brand.subtitle + '</h3></div>');
            });
        }
    };
    var makeCarousel = function(page){
        var items = page.find('.item'),
            duration = 3000,
            effect = 1000;
        var nextItem = function(){
            var current = page.find('.item.active');
            if(current && current.length){
                current.removeClass('active').fadeOut(effect, function(){
                    var next = current.next('.item');
                    if(!next || !next.length){
                        next = $(items[0]);
                    }
                    next.addClass('active').fadeIn(effect, function(){
                        setTimeout(nextItem, duration);
                    });
                });
            }
        };
        items.hide().removeClass('active');
        $(items[0]).addClass('active').fadeIn(effect, function(){
            setTimeout(nextItem, duration);
        });
    };
    $(window).on('hashchange', function(e){
        checkPage();
    });
    window.sunhing.currentPage = '';
    checkPage();
});