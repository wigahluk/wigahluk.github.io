import {Observable} from 'rxjs'
import DOMElement = __React.DOMElement;

interface ILocation {
    hash: string;
}

interface IWindow {
    addEventListener(string, Function, boolean): void;
    location: ILocation;
}

const rHash = /^#(.*)$/;

const getPath = (win: IWindow): string => {
    const hash = window.location.hash;
    if (!hash) { return '/'; }
    const ms = rHash.exec(hash);
    if (!ms) { return hash }
    return ms[1] || '/';
};

export class HashListener extends Observable<string> {
    constructor(win: IWindow) {
        //noinspection TypeScriptValidateTypes
        super(subscriber => {
            // Emit as soon as you get a subscriber
            subscriber.next(getPath(win));
            win.addEventListener('hashchange', () => {
                subscriber.next(getPath(win));
            }, false);
        });
    }
}
