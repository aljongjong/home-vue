import { createStore } from "vuex";
import { board } from "./board.module";

const store = createStore({
    modules: {
        board,
    },
});

export default store;