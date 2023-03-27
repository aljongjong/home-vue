<template>
    <div class="submit-form">
        <div v-if="!$store.state.board.submitted">
            <div class="form-group">
                <label for="title">Title</label>
                <input
                type="text"
                class="form-control"
                id="title"
                required
                v-model="board.title"
                name="title"
                />
            </div>

            <div class="form-group">
                <label for="description">Description</label>
                <textarea
                class="form-control"
                id="description"
                required
                v-model="board.description"
                name="description"
                ></textarea>
            </div>

            <button @click="saveBoard" class="btn btn-success">Submit</button>
        </div>

        <div v-else>
            <h4>게시글이 작성되었습니다.</h4>
            <button class="btn btn-info float-left" @click="newBoard, $router.push('/board')">List</button>
            <button class="btn btn-success float-right" @click="newBoard">Add</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "add-board",
  data() {
    return {
      board: {
        title: "",
        description: "",
        published: false
      },
    };
  },
  methods: {
    // ...mapActions(['board/writeBoard']),
    async saveBoard() {

      var data = {
        title: this.board.title,
        description: this.board.description,
        published: false,
        no: "",
        createDate: Date.now(),
      };
      
      // this['board/writeBoard'](data);
      this.$store.dispatch("board/writeBoard", data);
    },
    
    newBoard() {
      this.board = {
        title: "",
        description: "",
        published: false
      };
      this.$store.dispatch("board/newBoard");
    }
  }
};
</script>