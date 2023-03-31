import BoardDataService from "@/services/BoardDataService";
import router from "@/router";

export const board = {
    namespaced: true,
    state: {
        initialState: [],
        submitted: false,
    },
    actions: {
        // 1. 
        async writeBoard({ commit }, payload) {
            await BoardDataService.getLastIndexNo()
            .then((snap) => {
                if (snap.hasChildren())
                snap.forEach((lastObj) => {
                    payload.no = lastObj.val().no+1;
                })
                else {
                    payload.no = 1;
                }
            })

            BoardDataService.create(payload)
            .then(() => {
                commit('WRITE_BOARD', payload)
            })
            .catch(e => {
                console.log(e);
            });
        },

        // 2. 
        newBoard({ commit }) {
            commit('NEW_BOARD')
        }
    },
    mutations: {
        // 1.
        WRITE_BOARD(state, payload) {
            state.initialState.push(payload);
            state.submitted = false;
            router.push('/board')
        },

        // 2.
        NEW_BOARD(state) {
            state.submitted = false;
        }
    },
    getters: {
        allBoardContents: state => {
            BoardDataService.getAll().orderByChild("createDate").once("value", (snap) => {
                let _board = [];
                snap.forEach((obj) => {
                    let key = obj.key;
                    let data = obj.val();
                    let d = new Date(data.createDate);

                    _board.push({
                        key: key,
                        title: data.title,
                        description: data.description,
                        published: data.published,
                        createDate: d.toLocaleDateString() + " " + d.toLocaleTimeString()
                    });
                });
                state.initialState = _board;
            })
            return state.initialState;
        }
    }
}