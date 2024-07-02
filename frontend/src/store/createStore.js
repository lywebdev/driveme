import {create} from 'zustand';
import {createWithEqualityFn} from "zustand/traditional";
import {devtools} from "zustand/middleware";

export const createStore = (fn, name, shallowFunction) => {
    if (import.meta.env.MODE === 'development') {
        if (shallowFunction !== undefined) {
            return createWithEqualityFn(devtools(fn, {name}), shallowFunction);
        }

        return create(devtools(fn, {name}));
    }

    if (shallowFunction !== undefined) {
        return createWithEqualityFn(fn, shallowFunction);
    }

    return create(fn);
};