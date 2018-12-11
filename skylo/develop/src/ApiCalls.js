import $ from 'jquery';

const ApiCalls = {
    makeCall: function (API_URL, method, headers, data) {
        let params = {
            url: API_URL,
            type: method || "GET",
            crossDomain: true,
            cache: false,
            credentials: true
        };

        if(headers){
            params.beforeSend = function(xhr){
                xhr.setRequestHeader(...headers);
            };
        }

        if (method === 'POST' && data) {
            $.extend(params, {
                data: JSON.stringify(data),
                contentType: "application/json",
                dataType: "json"
            });
        }

        return $.ajax(params).then(response => {
            return response;
        }, error => {
            return false;
        });
    }
};

export default ApiCalls;