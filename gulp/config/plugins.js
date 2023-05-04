import replace from "gulp-replace"; // Finding and changing
import plumber from "gulp-plumber"; // Error processing
import notify from "gulp-notify"; // Messages (Tips)
import browsersync from "browser-sync" // local server
import newer from "gulp-newer"; // Update check
import ifPlugin from "gulp-if"; // Conditional branching

// Exporting object
export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin
}