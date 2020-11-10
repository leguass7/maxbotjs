"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = class Maxbot {
    constructor(t) {
        return this.config = {
            token: ""
        }, t && this.setMe(t), this;
    }
    setMe(t, e) {
        const {config: s} = this;
        if ("object" == typeof t) {
            const e = Object.keys(t);
            for (let o = 0; o < e.length; o++) e[o] in s && (s[e[o]] = t[e[o]]);
        } else "string" == typeof t && t in s && (s[t] = "function" == typeof e ? e() : e);
        return this;
    }
    getMe() {
        return this.config;
    }
    getStatus() {}
    getContact(t) {}
    getProt(t) {}
    putContact(t) {}
    setContact(t) {}
    sendText(t, e) {}
};
