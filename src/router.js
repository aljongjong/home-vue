import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        alias: "/home",
        name: "home",
        component: () => import("./views/HomeView.vue")
    },
    {
        path: "/board",
        name: "board",
        component: () => import("./views/BoardListView"),
    },
    {
        path: "/add",
        name: "add",
        component: () => import("./views/AddBoardView")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;