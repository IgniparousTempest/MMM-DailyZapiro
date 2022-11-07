import {Config} from "./Config";

Module.register<Config>('MMM-DailyZapiro', {
    defaults: {
        colour: false,
        mostRecentNComics: 3,
        updateInterval: 60
    },
    _retrievedData: null,

    start: function() {
        // Validate input
        if (this.config.mostRecentNComics <= 0)
            throw new Error("'mostRecentNComics' should be a positive integer.");
        if (this.config.updateInterval <= 0)
            throw new Error("'updateInterval' should be a positive integer.");

        // Retrieve data
        this.sendSocketNotification("REQUEST_ZAPIRO_CARTOON", {...this.config});
        setInterval(() => this.sendSocketNotification("REQUEST_ZAPIRO_CARTOON", {...this.config}), this.config.updateInterval * 1000);
    },

    getTemplate() {
        return "MMM-DailyZapiro.njk";
    },

    /**
     * Data used in the template.
     */
    getTemplateData: function() {
        if (!this._retrievedData) {
            return {
                imageUrl: `${this.data.path}/data/ZApiro.png`,
                config: this.config
            };
        }

        return {
            loadingImageUrl: `${this.data.path}/data/ZApiro.png`,
            imageUrl: this._retrievedData.url,
            config: this.config
        };
    },

    getStyles: function() {
        return ['MMM-DailyZapiro.css'];
    },

    socketNotificationReceived(notification, payload) {
        if (notification === "ZAPIRO_CARTOON") {
            this._retrievedData = payload;

            this.updateDom(500);
        }
    },
});
