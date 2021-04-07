import { constructOptions, Options } from "../src/index";
export * from "../src/index";

declare module "debux" {
    export default class Debux {
        constructor(options: constructOptions);
        private maxCacheSize: number;
        private cache: string[];
        private logLevel: number;
        public log(s: string, options?: Options): void;
        public error(s: string, options?: Options): void;
        public warn(s: string, options?: Options): void;
        public info(s: string, options?: Options): void;
        public get logs(): string[];
        private static consoleLog(s: string): void;
        private constructMessage(s: string, options?: Options): string;
        private addCache(log: string): void;
    }
}
