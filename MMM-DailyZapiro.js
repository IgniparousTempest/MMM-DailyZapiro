/**
 * MagicMirror Module: Daily Zapiro
 * A MagicMirror² Module to display cartoons by Zapiro.
 * 
 * Version 1.0.0
 * By Courtney Pitcher
 * 
 * License CC-BY-SA-NC-4.0
 * 
 * This is an autogenerated file. DO NOT EDIT!
 */

(function () {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    Module.register('MMM-DailyZapiro', {
        defaults: {
            colour: false,
            mostRecentNComics: 3,
            updateInterval: 60
        },
        _retrievedData: null,
        start: function () {
            var _this = this;
            // Validate input
            if (this.config.mostRecentNComics <= 0)
                throw new Error("'mostRecentNComics' should be a positive integer.");
            if (this.config.updateInterval <= 0)
                throw new Error("'updateInterval' should be a positive integer.");
            // Retrieve data
            this.sendSocketNotification("REQUEST_ZAPIRO_CARTOON", __assign({}, this.config));
            setInterval(function () { return _this.sendSocketNotification("REQUEST_ZAPIRO_CARTOON", __assign({}, _this.config)); }, this.config.updateInterval * 1000);
        },
        getTemplate: function () {
            return "MMM-DailyZapiro.njk";
        },
        /**
         * Data used in the template.
         */
        getTemplateData: function () {
            if (!this._retrievedData) {
                return {
                    imageUrl: "".concat(this.data.path, "/data/ZApiro.png"),
                    config: this.config
                };
            }
            return {
                loadingImageUrl: "".concat(this.data.path, "/data/ZApiro.png"),
                imageUrl: this._retrievedData.url,
                config: this.config
            };
        },
        getStyles: function () {
            return ['MMM-DailyZapiro.css'];
        },
        socketNotificationReceived: function (notification, payload) {
            if (notification === "ZAPIRO_CARTOON") {
                this._retrievedData = payload;
                this.updateDom(500);
            }
        },
    });

})();
