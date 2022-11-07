import NodeHelper from "node_helper";
import Log from "logger";
import fetch from "node-fetch";
import {XMLParser} from "fast-xml-parser";

interface ZapiroComicUrl {
    loc: string;
    lastmod: string;
    'image:image': {
        'image:loc': string;
    };
}

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
            Log.info(`${this.name}: Retrieving a new comic`);
            // The sitemap contains the first 1000 comics, and sitemap2 contains the latest comics.
            let urls = ['https://www.dailymaverick.co.za/cartoon-sitemap2.xml'];
            // Retrieve older comics if we want to iterate over the entire catalogue.
            if (payload.mostRecentNComics > 100)
                urls = ['https://www.dailymaverick.co.za/cartoon-sitemap.xml', ...urls]
            const promises = urls.map((url) => fetch(url).then((response) => response.text()));
            Promise.all(promises).then((xmlDocs) => {
                const parser = new XMLParser();
                let comicDirectory: ZapiroComicUrl[] = [];
                for (const xml of xmlDocs) {
                    const jsObj = parser.parse(xml);
                    const comicUrls = jsObj.urlset.url;
                    comicDirectory = [...comicDirectory, ...comicUrls]
                }
                const mostRecentNComics = payload.mostRecentNComics > comicDirectory.length ? comicDirectory : payload.mostRecentNComics;
                const latestComic = comicDirectory[comicDirectory.length - 1 - getRandomInt(0, mostRecentNComics - 1)];
                const comicUrl = latestComic['image:image']['image:loc'];

                this.sendSocketNotification("ZAPIRO_CARTOON", {url: comicUrl});
            });
        }
    },
});
