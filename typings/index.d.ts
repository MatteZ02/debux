import { constructOptions, Debux } from "../src/index";
export * from "../src/index";

declare module "debux" {
    export default function(options?: constructOptions): Debux;
}
