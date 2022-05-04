import { Frame, NavigationEntry } from "@nativescript/core";

export function ononon(args){
    const frame = <Frame>args.object;

    const navigationEntry: NavigationEntry = {
        moduleName: "./edit-page",
        context: args.context,
    };
    frame.navigate(navigationEntry);
}