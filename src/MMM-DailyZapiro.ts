import {Config} from "./Config";

Module.register<Config>('MMM-DailyZapiro', {
    defaults: {
        mostRecentNComics: 3
    },
    _retrievedData: null,

    start: function() {
        this.sendSocketNotification("REQUEST_ZAPIRO_CARTOON", {...this.config});
        setInterval(() => this.sendSocketNotification("REQUEST_ZAPIRO_CARTOON", {...this.config}), 60000);
    },

    getTemplate() {
        return "MMM-DailyZapiro.njk";
    },

    /**
     * Data used in the template.
     */
    getTemplateData: function() {
        if (!this._retrievedData) {
            return {};
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
