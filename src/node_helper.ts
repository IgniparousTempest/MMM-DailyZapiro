import NodeHelper from "node_helper";
import Log from "logger";
import fetch from "node-fetch";
import {XMLParser} from "fast-xml-parser";

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// noinspection JSVoidFunctionReturnValueUsed
module.exports = NodeHelper.create({
    start: function() {
        Log.log("Starting node helper for: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "REQUEST_ZAPIRO_CARTOON") {

            const oldUrl = 'https://www.dailymaverick.co.za/cartoon-sitemap.xml';
            const url = 'https://www.dailymaverick.co.za/cartoon-sitemap2.xml';
            fetch(url)
                .then((response) => response.text())
                .then((text) => {
                    Log.info(`${this.name}: Retrieving a new comic`);
                    const parser = new XMLParser();
                    let jObj = parser.parse(text);
                    const comicUrls = jObj.urlset.url;
                    const latestComic = comicUrls[comicUrls.length - 1 - getRandomInt(0, payload.mostRecentNComics - 1)];
                    const comicUrl = latestComic['image:image']['image:loc'];

                    this.sendSocketNotification("ZAPIRO_CARTOON", {url: comicUrl});
                });
        }
    },
});
