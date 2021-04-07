import Debux, { level } from "..";

const debug = new Debux({ maxCacheSize: 10, logLevel: level.all });

debug.log("this is a log", {
    process: "process",
    class: "className",
    function: "function",
    event: "event"
});

debug.error("this is an error", {
    process: "process",
    class: "className",
    function: "function",
    event: "event"
});

debug.warn("this is a warning", {
    process: "process",
    class: "className",
    function: "function",
    event: "event"
});

debug.info("this is info", {
    process: "process",
    class: "className",
    function: "function",
    event: "event"
});

console.log(debug.logs);
