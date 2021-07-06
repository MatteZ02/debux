import chalk from "chalk";

export enum level {
    nothing = 0,
    error = 1,
    warning = 2,
    info = 3,
    all = 4
}

type cmd = "log" | "error" | "warn" | "info";

export interface Options {
    process?: string;
    class?: string;
    function?: string;
    event?: string;
}

export interface constructOptions {
    maxCacheSize?: number;
    logLevel?: level;
}

const seperator = " | ";

const defaultOptions = {
    maxCacheSize: 1000,
    logLevel: level.all
};

let existing: null | Debux = null;

module.exports = function(options?: constructOptions): Debux {
    return existing || (existing = new Debux(options));
};

export class Debux {
    private maxCacheSize: number;
    private cache: string[];
    private logLevel: number;
    constructor(options?: constructOptions) {
        this.maxCacheSize = options?.maxCacheSize ?? defaultOptions.maxCacheSize;
        this.cache = [];
        this.logLevel = options?.logLevel ?? defaultOptions.logLevel;
    }
    public log(s: string | null, options?: Options): void {
        this.addCache(this.constructEntry(s, "log", options));
        if (this.logLevel == level.all)
            return Debux.consoleLog(this.constructMessage(s, "log", options));
    }

    public error(s: string, options?: Options): void {
        this.addCache(this.constructEntry(s, "error", options));
        if (this.logLevel >= level.error)
            return Debux.consoleLog(this.constructMessage(chalk.red(s), "error", options));
    }

    public warn(s: string, options?: Options): void {
        this.addCache(this.constructEntry(s, "warn", options));
        if (this.logLevel >= level.warning)
            return Debux.consoleLog(this.constructMessage(chalk.yellow(s), "warn", options));
    }

    public info(s: string, options?: Options): void {
        this.addCache(this.constructEntry(s, "info", options));
        if (this.logLevel >= level.info)
            return Debux.consoleLog(this.constructMessage(s, "info", options));
    }

    public get logs(): string[] {
        return this.cache;
    }

    private static consoleLog(s: string): void {
        console.log(s);
    }

    private constructMessage(s: string | null, cmd: cmd, options?: Options): string {
        let msg: string =
            chalk.cyan(new Date().toUTCString()) + seperator + this.getCMDString(cmd);
        if (typeof options?.process == "string") msg += chalk.magenta(options.process) + seperator;
        if (typeof options?.class == "string") msg += chalk.yellow(options.class) + seperator;
        if (typeof options?.event == "string") msg += chalk.green(options.event) + seperator;
        if (typeof options?.function == "string") msg += chalk.blue(options.function) + seperator;
        if (!s) return msg.slice(0, msg.length - 3);
        else return msg + s;
    }

    private constructEntry(s: string | null, cmd: cmd, options?: Options): string {
        let msg: string =
            new Date().toUTCString() + seperator + cmd + seperator;
        if (typeof options?.process == "string") msg += options.process + seperator;
        if (typeof options?.class == "string") msg += options.class + seperator;
        if (typeof options?.event == "string") msg += options.event + seperator;
        if (typeof options?.function == "string") msg += options.function + seperator;
        if (!s) return msg.slice(0, msg.length - 3);
        else return msg + s;
    }

    private getCMDString(cmd: cmd): string {
        switch (cmd) {
            case "info":
                return chalk.black(chalk.bgBlue("Info")) + seperator;
            case "warn":
                return chalk.black(chalk.bgYellow("Warning")) + seperator;
            case "error":
                return chalk.black(chalk.bgRed("Error")) + seperator;
            default:
                return "";
        }
    }

    private addCache(log: string): void {
        this.cache.push(log);
        if (this.cache.length > this.maxCacheSize) this.cache.shift();
    }
}
