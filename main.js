"use strict";

(function(){
    var head = document.getElementsByTagName('head').item(0),
        searchHistory = {},
        searchSubmit = document.getElementById('search-submit'),
        searchText = document.getElementById('search-text'),
        prevButton = document.getElementById('prev'),
        nextButton = document.getElementById('next'),
        search = '',
        page = 0,
        maxpage = 1,
        limit = 10,
        getHash = function(){
            var hash = window.location.hash ? decodeURIComponent(window.location.hash.replace(/^#/,'')) : '',
                matchSearch= hash ? hash.match(/search=([^&]+)/) : false,
                matchPage = hash ? hash.match(/page=(\d+)/) : false,
                cached = false,
                changed = false;

            if(matchPage && matchPage.length === 2 && page != matchPage[1]){
                page = parseInt(matchPage[1], 10) - 1;
                if(page < 0){
                    page = 0;
                }
                changed = true;
            }else{
                page = 0;
            }

            if(matchSearch && matchSearch.length === 2 && search !== matchSearch[1]){
                search = matchSearch[1];
                if(searchText.value !== search){
                    searchText.value = search;
                }
                changed = true;
            }

            if(changed){
                cached = setHistory(search, page);
            }

            if(cached){
                listResults(searchHistory[search]);
            }
        },
        setHash = function(){
            var bottom = document.getElementById('bottom'),
                hash = [];

            bottom.setAttribute('class', 'hidden');

            if(searchText.value) {
                hash.push('search=' + encodeURIComponent(searchText.value));
            }
            if(page > 0){
                hash.push('page=' + page + 1);
            }
            window.location.href = '#' + hash.join('&');
        },
        setHistory = function(value, offset){
            if(searchHistory[value] && searchHistory[value][offset]){
                searchHistory[value][offset].count++;
                return true;
            }else{
                getTwitchResults(value, offset);
                return false;
            }
        },
        getTwitchResults = function(value, offset){
            var script = document.createElement("script");

            script.setAttribute('class', 'twitch-api-script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', 'https://api.twitch.tv/kraken/search/streams?q=' + value + '&limit=' + limit + '&offset=' + (offset * limit) + '&callback=parseResponse');
            head.appendChild(script);
        },
        listResults = function(searchObject){
            var totalNum = document.getElementById('total_num'),
                currentPage = document.getElementById('current_page'),
                totalPage = document.getElementById('total_page'),
                items = document.getElementById('items'),
                streams = searchObject[page].response.streams,
                bottom = document.getElementById('bottom');

            totalNum.innerHTML = searchObject.total;
            currentPage.innerHTML = page + 1;
            maxpage = !isNaN(searchObject.total) ? Math.max(Math.ceil(searchObject.total / limit), 1) : 1;
            totalPage.innerHTML = maxpage;

            items.innerHTML = '';
            for(var i = 0; i < streams.length; i++){
                items.appendChild(createItem(streams[i]));
            }
            bottom.setAttribute('class', '');
        },
        createItem = function(item){
            var container = document.createElement('div'),
                image = document.createElement('img'),
                displayName = document.createElement('div'),
                gameName = document.createElement('div'),
                description = document.createElement('div');

            container.setAttribute('class', 'item');
            image.setAttribute('src', item.preview.small);
            image.setAttribute('class', 'thumbnail');

            displayName.setAttribute('class', 'display-name');
            displayName.innerHTML = item.channel.display_name;

            gameName.setAttribute('class', 'game-name');
            gameName.innerHTML = item.channel.game + ' - ' + item.viewers + ' viewers';

            description.setAttribute('class', 'description');
            description.innerHTML = item.channel.status;

            container.appendChild(image);
            container.appendChild(displayName);
            container.appendChild(gameName);
            container.appendChild(description);

            return container;
        };

    if(searchSubmit){
        searchSubmit.addEventListener('click', function(ev){
            if(searchText && searchText.value && searchText.value !== search){
                setHash();
            }
        });
    }

    searchText.addEventListener('keypress', function(ev){
        if(ev && ev.charCode && ev.charCode == 13){
            searchSubmit.click();
        }
    });

    prevButton.addEventListener('click', function(ev){
        if(page > 0){
            page--;
            setHash();
        }
    });

    nextButton.addEventListener('click', function(ev){
        if(page < maxpage - 1){
            page++;
            setHash();
        }
    });

    window.addEventListener('hashchange', getHash);
    getHash();

    window['parseResponse'] = function(response){
        if(!searchHistory[search]){
            searchHistory[search] = {};
        }

        searchHistory[search].total = (response && response._total && !isNaN(response._total)) ? response._total : 0;
        searchHistory[search][page] = {
            count: 1,
            response: response
        };
        listResults(searchHistory[search]);

        var twitchApiScript = document.getElementsByClassName('twitch-api-script');

        if(twitchApiScript && twitchApiScript.length){
            for(var i = 0; i < twitchApiScript.length; i++) {
                twitchApiScript[i].parentNode.removeChild(twitchApiScript[i]);
            }
        }
    };
})();
