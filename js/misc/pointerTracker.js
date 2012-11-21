// -*- mode: js; js-indent-level: 4; indent-tabs-mode: nil -*-
const Gdk = imports.gi.Gdk;

function PointerTracker(){
    this._init();
}

PointerTracker.prototype = {
    _init: function() {
        let display = Gdk.Display.get_default();
        let deviceManager = display.get_device_manager();
        let pointer = deviceManager.get_client_pointer();
        let [lastScreen, lastPointerX, lastPointerY] = pointer.get_position();
        this.hasMoved = function() {
            let [screen, pointerX, pointerY] = pointer.get_position();
            try {
                return !(screen == lastScreen && pointerX == lastPointerX && pointerY == lastPointerY);
            } finally {
                [lastScreen, lastPointerX, lastPointerY] = [screen, pointerX, pointerY];
            }
        }
    }
};
