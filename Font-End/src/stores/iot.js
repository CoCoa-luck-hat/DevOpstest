import { defineStore } from 'pinia'
import axios from 'axios'

export const useIotStore = defineStore('Iot', {
    state: () => ({
        latest: {
            "id": 740,
            "temperature": 0.0,
            "humidity": 0,
        },
        stats: {
            "min_temp": 27.1,
            "max_temp": 32.3,
            "min_hum": 0,
            "max_hum": 100
        },
        Connent : false
    }),
    actions: {
        async Loading(){
            const response = await axios.get('http://192.168.199.41:1880/api/soil-data')
            this.latest = response.data.latest
            this.stats = response.data.stats
            this.Connent = true
        }

    }
})
