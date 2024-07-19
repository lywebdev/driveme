import {createStore} from "./createStore.js";
import {immer} from "zustand/middleware/immer";
import {shallow} from "zustand/shallow";

export const useTransportTypeStore = createStore(
    immer((set) => ({
        transportTypes: [],
        setTransportTypes: (transportTypes) => set({
            transportTypes: transportTypes,
        }),
        isLoading: false,
        setIsLoading: (isLoading) => set({
            isLoading: isLoading,
        }),
    })), 'TransportTypeStore', shallow);