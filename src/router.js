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
        component: () => import("./views/board/BoardListView"),
    },
    {
        path: "/add",
        name: "add",
        component: () => import("./views/board/AddBoardView")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;