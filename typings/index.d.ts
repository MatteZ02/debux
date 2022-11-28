import { ConstructOptions, Debux } from "../src/index";
export * from "../src/index";

declare module "debux" {
    export default function(options?: ConstructOptions): Debux;
}
