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

| Option              | Description                                                                                                                                                               |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `mostRecentNComics` | Cycle through the n most recent comics. Setting the value to `1` will show only the latest comic. <br><br> **Possible values:** `1` to `9999` <br> **Default value:** `3` |

## In action

![](./docs/screenshot.gif)
