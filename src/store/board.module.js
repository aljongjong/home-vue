import BoardDataService from "@/services/BoardDataService";

const initialState = [];
BoardDataService.getAll().orderByChild("createDate").once("value", (snap) => {
    // snap.forEach(obj => initialState.push(obj.val()));
    initialState.push(snap.val());
})

export const board = {
    namespaced: true,
    state: {
        initialState,
        submitted: false,
    },
    actions: {
        // 1. 글쓰기
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
        // 1. 글쓰기
        WRITE_BOARD(state, payload) {
            state.initialState.push(payload);
            state.submitted = true;
        },

        // 2.
        NEW_BOARD(state) {
            state.submitted = false;
        }
    },
    getters: {
        allBoardContents: state => {

            return state.initialState;
        }
    }
}