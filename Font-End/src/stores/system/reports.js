import { defineStore } from 'pinia'
import api from '@/api/axios'

export const useReportsStore = defineStore('Reports',{
    state:()=>({
        reports:[],
        selectReport:[]
    }),
    actions:{
        async Created(data){
            const response = await api.post("/CreatedReport",data)
            return response.data
        },
        async Load(){
            const response = await api.get("/Report")
            this.reports = response.data.row
        },
        async Edit(data){
            const response = await api.put("/Report",data)
            return response.data
        },
        async Delete(id){
             const response = await api.delete(`/Report/${id}`)
            return response.data
        }


    }
})
