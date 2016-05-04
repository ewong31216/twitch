"use strict";

(function(){
    var head = document.getElementsByTagName('head').item(0),
        searchHistory = {},
        searchSubmit = document.getElementById('search-submit'),
        searchText = document.getElementById('search-text'),
        setHash = function(){
            searchText.value = window.location.hash ? decodeURIComponent(window.location.hash.replace(/^#/,'')) : '';
            if(searchText.value){
                setHistory(searchText.value);
            }
        },
        setHistory = function(hash){
            if(searchHistory[hash]){
                searchHistory[hash].count++;
                listResults(searchHistory[hash].response);
            }else{
                getTwitchResults(hash);
                searchHistory[hash] = {
                    count: 1
                };
            }
        },
        getTwitchResults = function(value){
            var script = document.createElement("script");

            script.setAttribute('class', 'twitch-api-script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', 'https://api.twitch.tv/kraken/search/streams?q=' + value + '&callback=parseResponse');
            head.appendChild(script);
        },
        listResults = function(response){
            console.log(response, searchHistory);
        };

    if(searchSubmit){
        searchSubmit.addEventListener('click', function(ev){
            if(searchText){
                if(searchText.value) {
                    window.location.href = '#' + encodeURIComponent(searchText.value);
                }
            }
        });
    }

    searchText.addEventListener('keypress', function(ev){
        if(ev && ev.charCode && ev.charCode == 13){
            searchSubmit.click();
        }
    });

    window.addEventListener('hashchange', setHash);

    setHash();

    window['parseResponse'] = function(response){
        searchHistory[searchText.value].response = response;
        listResults(response);

        var twitchApiScript = document.getElementsByClassName('twitch-api-script');

        if(twitchApiScript && twitchApiScript.length){
            for(var i = 0; i < twitchApiScript.length; i++) {
                twitchApiScript[i].parentNode.removeChild(twitchApiScript[i]);
            }
        }
    };
})();
