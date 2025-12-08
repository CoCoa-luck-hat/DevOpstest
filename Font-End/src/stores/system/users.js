import { defineStore } from 'pinia'
import api from '@/api/axios'

export const useUsersStore = defineStore('Users',{
    state:()=>({
        users:[],
        selectUser:[]
    }),
    actions:{
        async Load(){
            const response = await api.get("/SelectUsers")
            this.users = response.data.row
        },
        async Create(data){
            const response = await api.post("/admin/user",data)
            return response.data
        },
        async Edit(data,id){
            const response = await api.put(`/admin/user/${id}`,data)
            return response.data
        },
        async Delete(id){
            const response = await api.delete(`/admin/user/${id}`)
            return response.data
        },

    }
})
