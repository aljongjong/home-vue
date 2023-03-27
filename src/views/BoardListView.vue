<template>
    <div class="list row">
        <div class="col-md-6">
            <h4>Board List</h4>
            <ul class="list-group" id="boardList" 
                style="max-height: 300px; overflow: scroll; -webkit-overflow-scrolling: touch;" 
                @scroll="scrollend()"
            >
                <li
                  class="list-group-item"
                  :class="{ active: index == currentIndex }"
                  v-for="(b, index) in board"
                  :key="index"
                  @click="setActiveBoard(b, index)"
                  :data-key="b.key"
                >
                {{ b.title }}
                </li>
            </ul>

            <button class="m-3 btn btn-sm btn-danger" @click="removeAllBoard">
                Remove All
            </button>
            
            <router-link to="/add" class="m-3 btn btn-sm btn-info">게시판 글쓰기</router-link>
        </div>
        <div class="col-md-6">
            <div v-if="currentBoard">
                <board-details
                :board="currentBoard"
                @refreshList="refreshList"
                />
            </div>
            <div v-else>
                <br />
                <p>Please click on a Board.</p>
            </div>
        </div>
    </div>
</template>

<script>
import BoardDataService from "../services/BoardDataService";
import BoardDetails from "./BoardView";
import $ from 'jquery';

export default {
  name: "board-list",
  components: { BoardDetails },
  data() {
    return {
      board: [],
      currentBoard: null,
      currentIndex: -1,
      startSeq: 0,
      endSeq: 9,
    };
  },
  methods: {
    onDataChange(items) {
      let _board = [];

      items.forEach((item) => {

        let key = item.key;
        let data = item.val();

        _board.push({
          key: key,
          title: data.title,
          description: data.description,
          published: data.published,
        });
      });

      this.board = _board;
    },

    refreshList(key) {
      this.currentBoard = null;
      this.currentIndex = -1;
      this.board.forEach((val, idx) => {
        if (val.key === key) {
          this.board.splice(idx, 1);
        }
      })
    },

    setActiveBoard(board, index) {
      this.currentBoard = board;
      this.currentIndex = index;
    },

    removeAllBoard() {
      BoardDataService.deleteAll()
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async scrollend() {
      if ($('#boardList').innerHeight() + ($('#boardList').scrollTop()) >= $('#boardList')[0].scrollHeight) {
        console.log("next page items...");
        this.startSeq += 10; this.endSeq += 10;

        this.$store.getters['board/allBoardContents'].forEach((val, idx) => {
          if (idx >= this.startSeq && idx <= this.endSeq) {
            this.board.push(val);
          }
        })
        
      }
    },
  },
  mounted() {
    BoardDataService.getAll().limitToFirst(10).on("value", this.onDataChange);
    
  },
  beforeDestroy() {
    BoardDataService.getAll().off("value", this.onDataChange);
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>