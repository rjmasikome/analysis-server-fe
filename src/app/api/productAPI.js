"use strict"
let ProductActions = require('../actions/productActions');
let http = require("http");
let $ = require("jquery");
let _ = require("lodash");
let sha1 = require('sha1');
let xhr = new XMLHttpRequest();

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

var currentXhr;
var currentXhrFP;
var currentSearchXhr;

var errorMessage = {
    error: "Unable to connect to API Server"
}

var host = "http://localhost:8080";

module.exports = {


    localGenerate: function (payload) {
        if (payload) {
            var url = host + '/local-generate';
            var params = JSON.stringify(payload);


            var xhr = createCORSRequest('GET', url);
            if (!xhr) {
                alert('CORS not supported');
                return;
            }

            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");

            xhr.onreadystatechange = function () { //Call a function when the state changes.
                if (xhr.status == 200) {
                    if (xhr.responseText) {

                        var result = JSON.parse(xhr.responseText);
                        // console.log(result);
                        ProductActions.receivePlaylist(result);
                    }
                } else {
                    if (xhr.responseText) {
                        console.log("Test");
                        var error = JSON.parse(xhr.responseText);
                        // ProductActions.receiveUser(error);
                    }
                }
            }

            xhr.send(params);

        }
    },

    remoteGenerate: function (payload) {
        if (payload) {
            var url = host + '/remote-generate';
            var params = JSON.stringify(payload);


            var xhr = createCORSRequest('GET', url);
            if (!xhr) {
                alert('CORS not supported');
                return;
            }

            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");

            xhr.onreadystatechange = function () { //Call a function when the state changes.
                if (xhr.status == 200) {
                    if (xhr.responseText) {

                        var result = JSON.parse(xhr.responseText);
                        // console.log(result);
                        ProductActions.receivePlaylist(result);
                    }
                } else {
                    if (xhr.responseText) {
                        console.log("Test");
                        var error = JSON.parse(xhr.responseText);
                        // ProductActions.receiveUser(error);
                    }
                }
            }

            xhr.send(params);

        }
    }
};
