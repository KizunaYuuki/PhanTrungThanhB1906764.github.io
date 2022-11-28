import { createWebHistory, createRouter } from "vue-router";
import Todolist from "@/views/Todolist.vue";
const routes = [
    {
        path: "/",
        name: "todolist",
        component: Todolist,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/Login.vue"),
    },
    {
        path: "/logout",
        name: "logout",
        component: Todolist,
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/views/Register.vue"),
    },
    {
        path: "/todolists/:id",
        name: "todo.edit",
        component: () => import("@/views/TodoEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/todolists/add",
        name: "todo.add",
        component: () => import("@/views/TodoAdd.vue"),
    }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;