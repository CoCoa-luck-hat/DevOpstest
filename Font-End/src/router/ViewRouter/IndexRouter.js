import login from "@/view/IndexView/page/login.vue";
import register from "@/view/IndexView/page/register.vue";

export const IndexRouter = [
    {
        path: '',
        name: 'login',
        component: login
    },
    {
        path: 'register',
        name: 'register',
        component: register
    }
]

export default IndexRouter