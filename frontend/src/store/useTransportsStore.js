import {createStore} from "./createStore.js";
import {immer} from "zustand/middleware/immer";
import {shallow} from "zustand/shallow";

const initialTransportStore = {
    transports: [],
    errors: [],
    pagination: {},
    isLoading: false,
};


export const useTransportsStore = createStore(
    immer((set) => ({
        ...initialTransportStore,

        setTransports: (transports, pagination) => set({
            transports: transports,
            pagination: pagination,
        }),
        setIsLoading: (isLoading) => set({
            isLoading,
        }),
    })), 'TransportStore', shallow);