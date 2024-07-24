import { createStore } from "./createStore.js";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";
import axios from "axios";
import { API_URL } from "@config/http.js";

export const useTransportTypeStore = createStore(
    immer((set) => ({
        transportTypes: [],
        backendErrors: [],
        isLoading: false,
        setTransportTypes: (transportTypes) =>
            set({
                transportTypes: transportTypes,
            }),
        setIsLoading: (isLoading) =>
            set({
                isLoading: isLoading,
            }),
        setErrors: (errors) =>
            set({
                backendErrors: errors,
            }),
        fetchTransportTypes: async () => {
            set({ isLoading: true });
            try {
                const response = await axios.get(`${API_URL}/transport-types`);
                set({ transportTypes: response.data.data, isLoading: false });
            } catch (e) {
                set({ isLoading: false, backendErrors: e.response.data.errors });
            }
        },

        createTransportType: async (transportType) => {
            console.log(transportType);
            set({ isLoading: true });
            try {
                const response = await axios.post(`${API_URL}/transport-types`, transportType);
                set((state) => ({
                    transportTypes: [...state.transportTypes, response.data.data],
                    isLoading: false
                }));
            } catch (e) {
                set({ isLoading: false, backendErrors: e.response.data.errors });
            }
        },

        updateTransportType: async(id, transportType) => {
            set({ isLoading: true });
            try {
                const response = await axios.put(`${API_URL}/admin/transport-types/${id}`, transportType);
                set((state) => ({
                    transportTypes: state.transportTypes.map(transportType => transportType._id === id ? response.data.data : transportType),
                    isLoading: false
                }));
            } catch (e) {
                set({ isLoading: false, backendErrors: e.response.data.errors });
            }
        },

        deleteTransportType: async(id) => {
            set({ isLoading: true });
            try {
                await axios.delete(`${API_URL}/admin/transport-types/${id}`);
                set((state) => ({
                    transportTypes: state.transportTypes.filter(transportType => transportType._id !== id),
                    isLoading: false
                }));
            } catch (e) {
                set({ isLoading: false, backendErrors: e.response.data.errors });
            }
        }
    })),
    "TransportTypeStore",
    shallow
);
