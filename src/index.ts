import chalk from "chalk";

export enum level {
    nothing = 0,
    error = 1,
    warning = 2,
    info = 3,
    all = 4
}

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

module.exports = class Debux {
    private maxCacheSize: number;
    private cache: string[];
    private logLevel: number;
    constructor(options?: constructOptions) {
        this.maxCacheSize = options?.maxCacheSize ?? defaultOptions.maxCacheSize;
        this.cache = [];
        this.logLevel = options?.logLevel ?? defaultOptions.logLevel;
    }
    public log(s: string | null, options?: Options): void {
        this.addCache(s ?? "null");
        if (this.logLevel == level.all) return Debux.consoleLog(this.constructMessage(s, options));
    }

    public error(s: string, options?: Options): void {
        this.addCache(s);
        if (this.logLevel > level.error)
            return Debux.consoleLog(this.constructMessage(chalk.red(s), options));
    }

    public warn(s: string, options?: Options): void {
        this.addCache(s);
        if (this.logLevel > level.warning)
            return Debux.consoleLog(this.constructMessage(chalk.yellow(s), options));
    }

    public info(s: string, options?: Options): void {
        this.addCache(s);
        if (this.logLevel > level.info)
            return Debux.consoleLog(this.constructMessage(chalk.blue(s), options));
    }

    public get logs(): string[] {
        return this.cache;
    }

    private static consoleLog(s: string): void {
        console.log(s);
    }

    private constructMessage(s: string | null, options?: Options): string {
        let msg: string = chalk.cyan(new Date().toUTCString()) + seperator;
        if (typeof options?.process == "string") msg += chalk.magenta(options.process) + seperator;
        if (typeof options?.class == "string") msg += chalk.yellow(options.class) + seperator;
        if (typeof options?.event == "string") msg += chalk.green(options.event) + seperator;
        if (typeof options?.function == "string") msg += chalk.blue(options.function) + seperator;
        if (!s) return msg.slice(0, msg.length - 3);
        else return msg + s;
    }

    private addCache(log: string): void {
        this.cache.push(new Date().toUTCString() + seperator + log);
        if (this.cache.length > this.maxCacheSize) this.cache.shift();
    }
};
