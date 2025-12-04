import { defineStore } from 'pinia'

export const useToastStore = defineStore('Toast',{
    state:()=>({
        toasts:[]
    }),
    actions:{
        PlusToast(message,type){
            const id = Date.now().toString(36) + Math.random().toString(36).slice(2,8)
            const toast = {
                id:id,
                message:message,
                type:type
            }
            this.toasts.push(toast)
            setTimeout(()=>{
                this.RemoveToast(id)
            },4000)
        },
        RemoveToast(id){
            const index = this.toasts.findIndex((t)=>t.id===id)
            this.toasts.splice(index,1)
        }

    }
})
