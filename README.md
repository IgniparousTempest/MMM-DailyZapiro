# Module: MMM-DailyZapiro

Cycles through the latest couple Zapiro comics. This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror) project.

## Installation
1. Navigate to the `MagicMirror/modules` directory.
2. Execute `git clone https://github.com/IgniparousTempest/MMM-DailyZapiro.git`
3. Configure the module as per below.
4. Restart MagicMirror

## Using the module

Add this to the `/config/config.js` file:

    {
        module: "MMM-DailyZapiro",
        position: "top_left",
        config: {}
    },

Copy the parent folder to `/modules/`.

## Configuration options

The following properties can be configured:

| Option              | Description                                                                                                                                                                                            |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `colour`            | Whether to show comics in their original colour (`true`), or in an inverted, high contrast, black and white (`false`). <br><br> **Possible values:** `true` or `false` <br> **Default value:** `false` |
| `mostRecentNComics` | Cycle through the n most recent comics. Setting the value to `1` will show only the latest comic. <br><br> **Possible values:** `1` to positive infinity <br> **Default value:** `3`                   |
| `updateInterval`    | How frequently a new comic is fetched in seconds. `86400` would be once ber day. <br><br> **Possible values:** `1` to positive infinity <br> **Default value:** `60`                                   |

## In action

![](./docs/screenshot.gif)

## Notes

Inspired by the MagicMirror plugin [MMM-DailyDilbert](https://github.com/andrecarlucci/MMM-DailyDilbert).

This module is written in typescript, as such the javascript files in the root are automatically generated, the actual source code is in [/src](./src).

The module scrapes the sitemap of the Daily Maverick, and as such does not show comics from his Mail and Guardian days.
