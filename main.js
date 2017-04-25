$(function() {
    if (!window.sunhing) {
        window.sunhing = {}
    }
    var checkPage = function () {
        createParams(window.location.hash);
    };
    var createParams = function (hash) {
        window.sunhing.params = {};
        hash = hash.replace(/^#/, '');
        var hashArray = hash.split('&');
        if (hashArray && hashArray.length) {
            $.each(hashArray, function (i, paramString) {
                var keyValue = paramString.split('=');
                if (keyValue && keyValue.length === 2) {
                    window.sunhing.params[keyValue[0]] = decodeURIComponent(keyValue[1]);
                }
            });
        }
        if (!window.sunhing.params.page) {
            window.sunhing.params.page = 'home';
        }
        if (!window.sunhing.params.search) {
            $('input.search-textbox').val('');
            $('i.cancel-search').hide();
        }
        setPage(window.sunhing.params.page);
    };
    var setPage = function (page) {
        window.sunhing.currentPage = page;
        $('.data-div').empty();
        $('.sidenav .list-group-item').removeClass('active');
        $('.sidenav .list-group-item.' + page).addClass('active');
        $('.pages').hide();
        $('.page-' + page).show();
        switch (page) {
            case 'home':
                listBrand($('.brand-carousel .items'));
                makeCarousel($('.brand-carousel .items'));
                listProducts($('.home.home-products'));
                listRecipes($('.home.home-recipes'));
                makeSlideShow($('.pages.page-home'));
                break;
            case 'products':
                showProductsAndBrand();
                break;
            case 'recipes':
                showRecipes();
                break;
        }
    };
    var checkCancelSearch = function(input){
        var $this = $(input),
            value = $this.val(),
            parent = $this.closest('div.search'),
            cancel = parent.find('.cancel-search');
        if(cancel && cancel.length) {
            if (value.length) {
                cancel.show();
            }else{
                cancel.hide();
            }
        }
    };
    var doSearch = function (self, e, url) {
        var $this = $(self),
            search = function () {
                var value = $this.val();
                if (value !== window.sunhing.params.search) {
                    window.location.href = url + '&search=' + encodeURIComponent(value);
                }
                checkCancelSearch($this);
            };
        clearTimeout(window.sunhing.searchTimeout);
        if (e && e.keyCode) {
            switch (e.keyCode) {
                case 27:
                    $this.val('');
                case 13:
                    search();
                    break;
                default:
                    window.sunhing.searchTimeout = setTimeout(search, 1000);
                    break;
            }
        }else{
            search();
        }
    };
    var listBrand = function (page) {
        if (window.sunhing.brand && window.sunhing.brand.length) {
            $.each(window.sunhing.brand, function (i, brand) {
                page.append('<a href="#page=products&mode=brand&brand=' + encodeURIComponent(brand.name) + '" class="brand-item item"><h3>' + brand.name + '</h3><div class="image" style="background-image:url(\'' + brand.image + '\')"></div><h4>' + brand.description + '</h4></a>');
            });
        }
    };
    var makeCarousel = function (page) {
        var items = page.find('.item'),
            duration = 3000,
            effect = 1000,
            randomItem = Math.floor(Math.random() * items.length);
        var nextItem = function () {
            var current = page.find('.item.active');
            if (current && current.length) {
                current.removeClass('active').fadeOut(effect, function () {
                    var next = current.next('.item');
                    if (!next || !next.length) {
                        next = $(items[0]);
                    }
                    next.addClass('active').fadeIn(effect, function () {
                        window.sunhing.brandCarousel = setTimeout(nextItem, duration);
                    });
                });
            }
        };
        clearTimeout(window.sunhing.brandCarousel);
        items.hide().removeClass('active');
        $(items[randomItem]).addClass('active').fadeIn(effect, function () {
            window.sunhing.brandCarousel = setTimeout(nextItem, duration);
        });
    };
    var listProducts = function (page) {};
    var listRecipes = function (page) {};
    var makeSlideShow = function (page) {};
    var showProductsAndBrand = function () {
        if (window.sunhing.params.product) {
            var products = $.grep(window.sunhing.products, function (product) {
                return product && product.name === window.sunhing.params.product;
            });
            if (products && products.length === 1) {
                showProductDetail(products[0]);
                showBrandByBrandName(products[0].brand);
            }
        } else if (window.sunhing.params.brand) {
            showBrandByBrandName(window.sunhing.params.brand);
        } else if (window.sunhing.params.mode === 'type') {
            showAllType();
            if (window.sunhing.params.search) {
                filterType(window.sunhing.params.search);
            }
        } else {
            showAllBrand();
            if (window.sunhing.params.mode === 'brand' && window.sunhing.params.search) {
                filterBrand(window.sunhing.params.search);
            }
        }
    };
    var showBrandByBrandName = function (name) {
        var brands = $.grep(window.sunhing.brand, function (brand) {
            return brand && brand.name === name;
        });
        if (brands && brands.length === 1) {
            showBrandDetail(brands[0]);
        } else {
            showAllBrand();
        }
    };
    var showProductDetail = function (product) {
        var productsTitle = $('.products-title'),
            productsContent = $('.products-content'),
            productDetailTitle = $('.product-detail-title'),
            productDetailContent = $('.product-detail-content');
        $('.type.type-title').hide();
        $('.brand.brand-title').show();
        productsTitle.hide();
        productsContent.empty().hide();
        productDetailTitle.html(product.name).show();
        if(typeof product.image === 'string') {
            productDetailContent.html('<div class="image-container"><img src="' + product.image + '" /></div>');
        }else{
            var html = '<div class="image-container">';
            $.each(product.image, function(i, image){
                html += '<img src="' + image + '" /><br />';
            });
            html += '</div>';
            productDetailContent.html(html);
        }
        if (product.description && product.description.length) {
            productDetailContent.append('<div class="description">' + product.description + '</div>');
        }
        if (product.information && product.information.length) {
            productDetailContent.append('<div class="subtitle">Product Information</div><ul class="info"></ul>');
            var infoUL = productDetailContent.find('ul.info');
            $.each(product.information, function (i, info) {
                infoUL.append('<li>' + info + '</li>');
            });
        }
        productDetailContent.show();
    };
    var showBrandDetail = function (brand) {
        var brandDetail = $('.brand-content'),
            allBrand = $('.all-brand-content');
        brandDetail.html('<a href="#page=products&mode=brand&brand=' + encodeURIComponent(brand.name) + '" class="brand-item item"><h3>' + brand.name + '</h3><div class="image" style="background-image:url(\'' + brand.image + '\')"></div></a>');
        brandDetail.show();
        allBrand.hide();
        if (!window.sunhing.params.product) {
            showAllProductsByBrand(brand.name);
            if (window.sunhing.params.mode === 'product' && window.sunhing.params.search) {
                filterProduct(window.sunhing.params.search);
            }
        }
    };
    var filterProduct = function (search) {
        var searchProduct = $('#search-product'),
            allProducts = $('.products-content .product-item'),
            emptyDiv = $('.products-empty'),
            found = false;
        if (allProducts && allProducts.length) {
            $.each(allProducts, function (i, product) {
                var $product = $(product),
                    name = $product.find('h3').text(),
                    test = new RegExp(search, "i");
                if (test.test(name)) {
                    $product.show();
                    found = true;
                } else {
                    $product.hide();
                }
            });
        }
        if (found) {
            emptyDiv.empty().hide();
        } else {
            emptyDiv.html('There is no matching product for the keyword "' + search + '" you have entered, please refine your keyword and try again.').show();
        }
        if (searchProduct.val() !== search) {
            searchProduct.val(search);
            checkCancelSearch(searchProduct);
        }
    };
    var showAllType = function () {
        var pageProducts = $('.page-products'),
            allType = $('.all-type-content');
        if (allType.is(':empty')) {
            if (window.sunhing.products && window.sunhing.products.length) {
                $.each(window.sunhing.products, function (i, product) {
                    var type = product.type.replace(/\//g,'_');
                    if(type && type.length) {
                        var typeDiv = allType.find('div.' + type);
                        if(!typeDiv || !typeDiv.length){
                            allType.append('<div class="type-div '+ type + '"><div class="title">' + product.type + '</div></div>');
                            typeDiv = allType.find('div.' + type);
                        }
                        typeDiv.append('<a class="product-item" href="#page=products&product=' + product.name + '">' + product.name + '</a>');
                    }
                });
            }
        }
        pageProducts.find('>div.brand').hide();
        pageProducts.find('>div.type').show();
        pageProducts.find('.products').hide();
        pageProducts.find('.type-empty').hide();
        pageProducts.find('.products-empty').hide();
        allType.find('div.type-div').click(function(e){
            var $this = $(e.target);
            if($this.hasClass('title')){
                $this.closest('div.type-div').toggleClass('expand');
            }
        });
        allType.find('a.product-item').hide();
        allType.show();
        if(window.sunhing.params.type){
            $('div.type-div.' + window.sunhing.params.type.replace(/\//g,'_')).addClass('expand');
        }
    };
    var filterType = function (search) {
        var searchBrand = $('#search-product-type'),
            allTypeDiv = $('.all-type-content >div.type-div'),
            allProducts = $('.all-type-content .product-item'),
            emptyDiv = $('.type-empty'),
            found = false;
        //allTypeDiv.hide();
        allProducts.hide();
        if (allProducts && allProducts.length) {
            $.each(allProducts, function (i, product) {
                var $product = $(product),
                    name = $product.text(),
                    test = new RegExp(search, "i");
                if (test.test(name)) {
                    $product.show();
                    //$product.closest('div.type-div').show();
                    found = true;
                }
            });
        }
        if (found) {
            emptyDiv.empty().hide();
        } else {
            emptyDiv.html('There is no matching product for the keyword "' + search + '" you have entered, please refine your keyword and try again.').show();
            allTypeDiv.hide();
        }
        if (searchBrand.val() !== search) {
            searchBrand.val(search);
            checkCancelSearch(searchBrand);
        }
    };
    var showAllBrand = function () {
        var pageProducts = $('.page-products'),
            allBrand = $('.all-brand-content'),
            brandDetail = $('.brand-content');
        if (allBrand.is(':empty')) {
            if (window.sunhing.brand && window.sunhing.brand.length) {
                $.each(window.sunhing.brand, function (i, brand) {
                    allBrand.append('<a href="#page=products&mode=brand&brand=' + encodeURIComponent(brand.name) + '" class="brand-item item"><h3>' + brand.name + '</h3><div class="image" style="background-image:url(\'' + brand.image + '\')"></div></a>');
                });
            }
        }
        pageProducts.find('>div.type').hide();
        pageProducts.find('>div.brand').show();
        pageProducts.find('.products').hide();
        pageProducts.find('.brand-empty').hide();
        pageProducts.find('.products-empty').hide();
        brandDetail.empty().hide();
        allBrand.show();
    };
    var filterBrand = function (search) {
        var searchBrand = $('#search-brand'),
            allBrands = $('.all-brand-content .brand-item'),
            emptyDiv = $('.brand-empty'),
            found = false;
        if (allBrands && allBrands.length) {
            $.each(allBrands, function (i, brand) {
                var $brand = $(brand),
                    name = $brand.find('h3').text(),
                    test = new RegExp(search, "i");
                if (test.test(name)) {
                    $brand.show();
                    found = true;
                } else {
                    $brand.hide();
                }
            });
        }
        if (found) {
            emptyDiv.empty().hide();
        } else {
            emptyDiv.html('There is no matching brand for the keyword "' + search + '" you have entered, please refine your keyword and try again.').show();
        }
        if (searchBrand.val() !== search) {
            searchBrand.val(search);
            checkCancelSearch(searchBrand);
        }
    };
    var showAllProductsByBrand = function (name) {
        var products = $.grep(window.sunhing.products, function (product) {
            return product && product.brand === name;
        });
        showAllProducts(products);
    };
    var showAllProducts = function (products) {
        var productsTitle = $('.products-title'),
            productsContent = $('.products-content'),
            productDetailTitle = $('product-detail-title'),
            productDetailContent = $('.product-detail-content');
        $('.products-empty').hide();
        productDetailTitle.empty().hide();
        productDetailContent.empty().hide();
        $.each(products, function (i, product) {
            productsContent.append('<a href="#page=products&product=' + encodeURIComponent(product.name) + '" class="product-item item"><h3>' + product.name + '</h3><div class="image" style="background-image:url(\'' + (typeof product.image === 'string' ? product.image : product.image[0]) + '\')"></div></a>');
        });
        productsTitle.show();
        productsContent.show();
    };
    var showRecipes = function(){
        if (window.sunhing.params.recipe) {
            var recipes = $.grep(window.sunhing.recipes, function (recipe) {
                return recipe && recipe.name === window.sunhing.params.recipe;
            });
            if (recipes && recipes.length === 1) {
                showRecipeDetail(recipes[0]);
            }
        } else {
            showAllRecipes();
        }
    };
    var showAllRecipes = function(){
        var types = [],
            content = $('.recipes.all-recipes-content'),
            itemWidth = 180,
            rowHeight = 300;
        if(window.sunhing.recipes && window.sunhing.recipes.length){
            $.each(window.sunhing.recipes, function(i, recipe){
                if(recipe && recipe.type && types.indexOf(recipe.type) === -1){
                    types.push(recipe.type);
                }
            });
        }
        if(types.length){
            var nav = $('<ul class="recipe-nav nav-bar"></ul>'),
                navContent = $('<div class="nav-content"></div>');
            nav.append('<li class="all active">All</li>');
            content.append(nav);
            content.append(navContent);
            $.each(types, function(i, type){
                nav.append('<li class="' + type.replace(' ','-') + '">' + type + '</li>');
                var thisDiv = $('<div class="type-item"></div>'),
                    thisRecipes = $.grep(window.sunhing.recipes, function(recipe){
                        return recipe && recipe.type === type;
                    });
                if(thisRecipes && thisRecipes.length) {
                    var thisContent = $('<div class="content"></div>');
                    thisDiv.append('<div class="title" style="top:' + (i * rowHeight + 50) + 'px;">' + type + '</div>').append(thisContent);
                    $.each(thisRecipes, function(j, recipe){
                        var image = '';
                        if(recipe.image && recipe.image.length){
                            image = '<div class="image" style="background-image:url(\'' + recipe.image + '\')"></div>';
                        }
                        thisContent.append('<a href="#page=recipes&recipe=' + encodeURIComponent(recipe.name) + '" class="recipe-item item type-' + type.replace(' ','-') + '"><h3>' + recipe.name + '</h3>'  + image + '</a>');
                    });
                    thisContent.width(thisRecipes.length * itemWidth);
                }
                navContent.append(thisDiv);
                navContent.append('<br clear="all" />');
            });
            nav.find('li').click(function(ev){
                var $this = $(this);
                if(!$this.hasClass('active')){
                    var type = $this.attr('class');
                    nav.find('li.active').removeClass('active');
                    $this.addClass('active');
                    if(type === 'all'){
                        content.find('div.title').show();
                        content.find('.recipe-item').show();
                        content.find('.type-item').addClass('row');
                        content.find('.type-item').find('.content').each(function(i, content){
                            var $content = $(content),
                                children = $content.children();
                            $content.width(children.length * itemWidth);
                        });
                    }else{
                        content.find('div.title').hide();
                        content.find('.recipe-item').hide();
                        content.find('.type-item').removeClass('row');
                        content.find('.type-item').find('.content').width(content.width());
                        content.find('.recipe-item.type-' + type.replace(' ','-')).show();
                    }
                }
            });
        }
        if(window.sunhing.params.type){
            content.find('ul.recipe-nav').find('li.' + window.sunhing.params.type.replace(' ','-')).click();
        }else{
            content.find('.type-item').addClass('row');
        }
    };
    var showRecipeDetail = function(recipe){
        var content = $('.recipes-detail-content'),
            nav = $('<ul class="recipe-nav nav-bar"></ul>'),
            navContent = $('<div class="nav-content"></div>');
        nav.append('<li class="all"><a href="#page=recipes">Recipes</a></li>');
        nav.append('<li class="active">' + recipe.name + '</li>');
        content.append(nav);
        content.append(navContent);
        navContent.append('<div class="title">' + recipe.name + '</div>');
        navContent.append('<div class="servings">' + recipe.servings + '</div>');
        if(recipe.image && recipe.image.length){
            navContent.append('<img src="' + recipe.image + '" />');
        }
        if(recipe.description && recipe.description.length){
            navContent.append('<div class="description">' + recipe.description + '</div>');
        }
        if (recipe.ingredients && recipe.ingredients.length) {
            var ingredientDiv = $('<div class="ingredients"></div>');
            ingredientDiv.append('<div class="title">Ingredients</div>');
            $.each(recipe.ingredients, function(i, ingredient){
                if(ingredient && ingredient.title) {
                    ingredientDiv.append('<div class="name">' + ingredient.title + '</div>');
                }
                if(ingredient && ingredient.items && ingredient.items.length){
                    var itemsUL = $('<ul class="lists"></ul>');
                    $.each(ingredient.items, function(j, item){
                        itemsUL.append('<li class="list">' + item + '</li>');
                    });
                    ingredientDiv.append(itemsUL);
                }
            });
            navContent.append(ingredientDiv);
        }
        if (recipe.directions && recipe.directions.length) {
            var directionDiv = $('<div class="directions"></div>');
            directionDiv.append('<div class="title">Directions</div>');
            $.each(recipe.directions, function(i, direction){
                if(direction && direction.title) {
                    directionDiv.append('<div class="name">' + direction.title + '</div>');
                }
                if(direction && direction.items && direction.items.length){
                    var itemsOL = $('<ol class="lists"></ol>');
                    $.each(direction.items, function(j, item){
                        itemsOL.append('<li class="list">' + item + '</li>');
                    });
                    directionDiv.append(itemsOL);
                }
            });
            navContent.append(directionDiv);
        }
    };
    $(window).on('hashchange', function (e) {
        checkPage();
    });
    window.sunhing.currentPage = '';
    checkPage();
    $('#search-brand').on('keyup', function (e) {
        var self = this;
        doSearch(self, e, '#page=products&mode=brand');
    });
    $('#search-product').on('keyup', function(e){
        var self = this;
        doSearch(self, e, '#page=products&mode=product&brand=' + encodeURIComponent(window.sunhing.params.brand));
    });
    $('#search-product-type').on('keyup', function(e){
        var self = this;
        doSearch(self, e, '#page=products&mode=type');
    });
    $('a').click(function(e){
        clearTimeout(window.sunhing.searchTimeout);
    });
    $('.cancel-search').click(function(e){
        var $this = $(this),
            parent = $this.closest('div.search'),
            textbox = parent.find('input[type=text]');
        textbox.val('').trigger('keyup');
    });
});