# Debux

Easy-to-use library for debugging your code

NOTE! This library is still in development and may not work as expected!

![image](https://user-images.githubusercontent.com/51192395/124608268-411fa700-de77-11eb-9b98-d27ef98dd953.png)

# Support

You can contact us on our [Discord server](https://discord.gg/2qFkF3qqmu)

# Usage

calling `debux()` will always return the same instance on debux that was initialized within the same process!

```js
const debux = require("debux");

const debug = debux();

debug.log("This is a log");
```

Different methods
```js
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

debug.logs() // will log all logs in the cache
/*
[
  'Tue, 06 Jul 2021 13:18:24 GMT | log | process | className | event | function | this is a log',
  'Tue, 06 Jul 2021 13:18:24 GMT | error | process | className | event | function | this is an error',
  'Tue, 06 Jul 2021 13:18:24 GMT | warn | process | className | event | function | this is a warning',
  'Tue, 06 Jul 2021 13:18:24 GMT | info | process | className | event | function | this is info'
]
De
*/
```

## Options

### log
`debux.log(string | null, Options?)` logs a simple informative log
### error
`debux.error(string, Options?)` logs an error
### warn
`debux.warn(string, Options?)` logs a warning
### info
`debux.info(string, Options?)` logs information about code

```ts
interface Options {
    process?: string;// the process this log was created on
    class?: string;// the class this log was created in
    function?: string;// the function this log came from
    event?: string;// the event this log is apart of
}

interface constructOptions {
    maxCacheSize?: number;// how many logs to cache at a time
    logLevel?: level;// which logs should be logged into console directly
    includeMilliseconds?: boolean;// whether to include milliseconds in the date string
}

export enum level {
    nothing = 0,// won't log anything to console
    error = 1,// only logs errors
    warning = 2,// logs warnings and errors
    info = 3,// logs info, warnings and errors
    all = 4// logs everything
}
```


Copyright (c) 2021 MatteZ02