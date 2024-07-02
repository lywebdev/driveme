import {createStore} from "./createStore.js";
import {immer} from "zustand/middleware/immer";
import {shallow} from "zustand/shallow";
import transportsData from "@data/transport/transports.js";

export const useExampleTransportsStore = createStore(
    immer((set) => ({
        transports: transportsData,
        setTransports: (transports) => set({
            transports: transports,
        }),
    })), 'ExampleTransportStore', shallow);