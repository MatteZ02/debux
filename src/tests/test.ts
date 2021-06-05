//@ts-ignore
import debux from "..";

const debug = debux({ maxCacheSize: 10, logLevel: 3 });

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

console.log(debux());
