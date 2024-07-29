import {createStore} from "./createStore.js";
import {immer} from "zustand/middleware/immer";
import {shallow} from "zustand/shallow";

const initialTransportLocationStore = {
    cities: [],
};


export const useTransportLocationStore = createStore(
    immer((set) => ({
        ...initialTransportLocationStore,

        setCities: (cities) => set({
            cities,
        }),
    })), 'TransportLocationStore', shallow);