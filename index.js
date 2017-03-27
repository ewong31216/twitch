$(function(){
    if(!window.sunhing){window.sunhing = {}}
    var checkPage = function(){
        createParams(window.location.hash);
    };
    var createParams = function(hash){
        window.sunhing.params = {};
        hash = hash.replace(/^#/,'');
        var hashArray = hash.split('&');
        if(hashArray && hashArray.length){
            $.each(hashArray, function(i, paramString){
                var keyValue = paramString.split('=');
                if(keyValue && keyValue.length === 2){
                    window.sunhing.params[keyValue[0]] = decodeURIComponent(keyValue[1]);
                }
            });
        }
        if(!window.sunhing.params.page){
            window.sunhing.params.page = 'home';
        }
        setPage(window.sunhing.params.page);
    };
    var setPage = function(page){
        window.sunhing.currentPage = page;
        $('.data-div').empty();
        $('.sidenav .list-group-item').removeClass('active');
        $('.sidenav .list-group-item.' + page).addClass('active');
        $('.pages').hide();
        $('.page-' + page).show();
        switch(page){
            case 'home':
                listBrand($('.brand-carousel .items'));
                makeCarousel($('.brand-carousel .items'));
                break;
            case 'products':
                showProductsAndBrand();
                break;
        }
    };
    var listBrand = function(page){
        if(window.sunhing.brand && window.sunhing.brand.length){
            $.each(window.sunhing.brand, function(i, brand){
                page.append('<a href="#page=products&mode=brand&brand=' + encodeURIComponent(brand.name) + '" class="brand-item item"><h3>' + brand.name + '</h3><div class="image" style="background-image:url(\'' + brand.image + '\')"></div><h4>' + brand.description + '</h4></a>');
            });
        }
    };
    var makeCarousel = function(page){
        var items = page.find('.item'),
            duration = 3000,
            effect = 1000,
            randomItem = Math.floor(Math.random() * items.length);
        var nextItem = function(){
            var current = page.find('.item.active');
            if(current && current.length){
                current.removeClass('active').fadeOut(effect, function(){
                    var next = current.next('.item');
                    if(!next || !next.length){
                        next = $(items[0]);
                    }
                    next.addClass('active').fadeIn(effect, function(){
                        window.sunhing.brandCarousel = setTimeout(nextItem, duration);
                    });
                });
            }
        };
        clearTimeout(window.sunhing.brandCarousel);
        items.hide().removeClass('active');
        $(items[randomItem]).addClass('active').fadeIn(effect, function(){
            window.sunhing.brandCarousel = setTimeout(nextItem, duration);
        });
    };
    var showProductsAndBrand = function(){
        if(window.sunhing.params.product){
            var products = $.grep(window.sunhing.products, function(product){
                return product && product.name === window.sunhing.params.product;
            });
            if(products && products.length === 1){
                showProductDetail(products[0]);
                showBrandByBrandName(products[0].brand);
            }
        }else if(window.sunhing.params.brand){
            showBrandByBrandName(window.sunhing.params.brand);
        }else{
            showAllBrand();
            if(window.sunhing.params.mode === 'brand' && window.sunhing.params.search){
                filterBrand(window.sunhing.params.search);
            }
        }
    };
    var showBrandByBrandName = function(name){
        var brands = $.grep(window.sunhing.brand, function(brand){
            return brand && brand.name === name;
        });
        if(brands && brands.length === 1) {
            showBrandDetail(brands[0]);
        }else{
            showAllBrand();
        }
    };
    var showProductDetail = function(product){
        var productsTitle = $('.products-title'),
            productsContent = $('.products-content'),
            productDetailTitle = $('.product-detail-title'),
            productDetailContent = $('.product-detail-content');
        productsTitle.hide();
        productsContent.empty().hide();
        productDetailTitle.html(product.name).show();
        productDetailContent.html('<img src="' + product.image + '" />');
        if(product.description && product.description.length){
            productDetailContent.append('<div class="description">' + product.description + '</div>');
        }
        if(product.information && product.information.length){
            productDetailContent.append('<div class="subtitle">Product Information</div><ul class="info"></ul>');
            var infoUL = productDetailContent.find('ul.info');
            $.each(product.information, function(i, info){
                infoUL.append('<li>' + info + '</li>');
            });
        }
        productDetailContent.show();
    };
    var showBrandDetail = function(brand){
        var brandDetail = $('.brand-content'),
            allBrand = $('.all-brand-content');
        brandDetail.html('<a href="#page=products&mode=brand&brand=' + encodeURIComponent(brand.name) + '" class="brand-item item"><h3>' + brand.name + '</h3><div class="image" style="background-image:url(\'' + brand.image + '\')"></div></a>');
        brandDetail.show();
        allBrand.hide();
        if(!window.sunhing.params.product){
            showAllProductsByBrand(brand.name);
            if(window.sunhing.params.mode === 'product' && window.sunhing.params.search){
                filterProduct(window.sunhing.params.search);
            }
        }
    };
    var filterProduct = function(search){
        var searchProduct = $('#search-product'),
            allProducts = $('.products-content .product-item'),
            emptyDiv = $('.products-empty'),
            found = false;
        if(allProducts && allProducts.length){
            $.each(allProducts, function(i, product){
                var $product = $(product),
                    name = $product.find('h3').text(),
                    test = new RegExp(search, "i");
                if(test.test(name)){
                    $product.show();
                    found = true;
                }else{
                    $product.hide();
                }
            });
        }
        if(found){
            emptyDiv.empty().hide();
        }else{
            emptyDiv.html('There is no matching product for the keyword "' + search + '" you have entered, please refine your keyword and try again.').show();
        }
        if(searchProduct.val() !== search){
            searchProduct.val(search);
        }
    };
    var showAllBrand = function(){
        var pageProducts = $('.page-products'),
            allBrand = $('.all-brand-content'),
            brandDetail = $('.brand-content');
        if(allBrand.is(':empty')){
            if(window.sunhing.brand && window.sunhing.brand.length){
                $.each(window.sunhing.brand, function(i, brand){
                    allBrand.append('<a href="#page=products&mode=brand&brand=' + encodeURIComponent(brand.name) + '" class="brand-item item"><h3>' + brand.name + '</h3><div class="image" style="background-image:url(\'' + brand.image + '\')"></div></a>');
                });
            }
        }
        pageProducts.find('.products').hide();
        brandDetail.empty().hide();
        allBrand.show();
    };
    var filterBrand = function(search){
        var searchBrand = $('#search-brand'),
            allBrands = $('.all-brand-content .brand-item'),
            emptyDiv = $('.brand-empty'),
            found = false;
        if(allBrands && allBrands.length){
            $.each(allBrands, function(i, brand){
                var $brand = $(brand),
                    name = $brand.find('h3').text(),
                    test = new RegExp(search, "i");
                if(test.test(name)){
                    $brand.show();
                    found = true;
                }else{
                    $brand.hide();
                }
            });
        }
        if(found){
            emptyDiv.empty().hide();
        }else{
            emptyDiv.html('There is no matching brand for the keyword "' + search + '" you have entered, please refine your keyword and try again.').show();
        }
        if(searchBrand.val() !== search){
            searchBrand.val(search);
        }
    };
    var showAllProductsByBrand = function(name){
        var products = $.grep(window.sunhing.products, function(product){
            return product && product.brand === name;
        });
        showAllProducts(products);
    };
    var showAllProducts = function(products){
        var productsTitle = $('.products-title'),
            productsContent = $('.products-content'),
            productDetailTitle = $('product-detail-title'),
            productDetailContent = $('.product-detail-content');
        productDetailTitle.empty().hide();
        productDetailContent.empty().hide();
        $.each(products, function(i, product){
            productsContent.append('<a href="#page=products&product=' + encodeURIComponent(product.name) + '" class="product-item item"><h3>' + product.name + '</h3><div class="image" style="background-image:url(\'' + product.image + '\')"></div></a>');
        });
        productsTitle.show();
        productsContent.show();
    };
    $(window).on('hashchange', function(e){
        checkPage();
    });
    window.sunhing.currentPage = '';
    checkPage();
    $('#search-brand').on('keyup', function(e){
        var searchBrand = function(){
            var value = $('#search-brand').val();
            if(value !== window.sunhing.params.search){
                window.location.href = '#page=products&mode=brand&search=' + encodeURIComponent(value);
            }
        };
        clearTimeout(window.sunhing.searchTimeout);
        if(e && e.keyCode === 13){
            searchBrand();
        }else {
            window.sunhing.searchTimeout = setTimeout(searchBrand, 1000);
        }
    });
    $('#search-product').on('keyup', function(e){
        var searchProduct = function(){
            var value = $('#search-product').val();
            if(value !== window.sunhing.params.search){
                window.location.href = '#page=products&mode=product&brand=' + encodeURIComponent(window.sunhing.params.brand) + '&search=' + encodeURI(value);
            }
        };
        clearTimeout(window.sunhing.searchTimeout);
        if(e && e.keyCode === 13){
            searchBrand();
        }else {
            window.sunhing.searchTimeout = setTimeout(searchProduct, 1000);
        }
    });
    $('a').click(function(e){
        clearTimeout(window.sunhing.searchTimeout);
    });
});