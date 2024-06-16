import { defineStore } from "pinia";

export const useEventsStore = defineStore("useEventsStore", () => {
    const count = 1
    
    return {
        count
    }
})