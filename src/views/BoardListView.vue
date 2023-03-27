<template>
    <div class="list row">
        <div class="col-md-6">
            <h4>Board List</h4>

            <nav class="navbar navbar-light bg-light">
              <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" @keyup="searchFilter()" v-model="search">
              <!-- <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> -->
            </nav>
            
            <ul class="list-group" id="boardList" 
                style="max-height: 300px; overflow: scroll; -webkit-overflow-scrolling: touch;" 
                @scroll="scrollend()"
            >
                <li
                  class="list-group-item"
                  :class="{ active: index == currentIndex, 'text-primary': b.published === true }"
                  v-for="(b, index) in board"
                  :key="index"
                  @click="setActiveBoard(b, index)"
                  :data-key="b.key"
                >
                {{ b.title }}
                </li>
            </ul>

            <button class="m-3 btn btn-sm btn-danger float-left" @click="removeAllBoard">
                전체 삭제
            </button>
            
            <router-link to="/add" class="m-3 btn btn-sm btn-info float-right">글쓰기</router-link>
        </div>

        <div class="col-md-6">
            <div v-if="currentBoard">
                <board-details
                :board="currentBoard"
                @updateList="updateList"
                @updatePublish="updatePublish"
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
      search: "",
    };
  },
  methods: {
    onDataChange(items) {
      let _board = [];

      items.forEach((item) => {

        let key = item.key;
        let data = item.val();
        let d = new Date(data.createDate);

        _board.push({
          key: key,
          title: data.title,
          description: data.description,
          published: data.published,
          createDate: d.toLocaleDateString() + " " + d.toLocaleTimeString()
        });
      });

      this.board = _board;
    },

    updateList(key, data) {
      this.board[this.board.map(e => e.key).indexOf(key)].title = data.title;
      this.board[this.board.map(e => e.key).indexOf(key)].description = data.description;
    },

    updatePublish(key, status) {
      this.board[this.board.map(e => e.key).indexOf(key)].published = status;
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
      if (confirm("전체 삭제하시겠습니까?")) {
        BoardDataService.deleteAll()
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },

    async scrollend() {
      if ($('#boardList').innerHeight() + ($('#boardList').scrollTop()) >= $('#boardList')[0].scrollHeight) {
        console.log("next page items...");
        this.startSeq += 10; this.endSeq += 10;
        let _board = [];

        this.$store.getters['board/allBoardContents'].forEach((val, idx) => {
          
          if (idx >= this.startSeq && idx <= this.endSeq) {
            _board.push(val);
          }
        });
        this.board.push(..._board);
      }
    },

    searchFilter() {
      let _board = [];

      this.$store.getters['board/allBoardContents']
          .filter(e => e.title.includes(this.search))
          .map(el =>
            _board.push(el)
          );
      this.board = [];
      this.board.push(..._board);
    }
  },
  mounted() {
    BoardDataService.getAll().limitToFirst(10).on("value", this.onDataChange);
  },
  beforeDestroy() {
    BoardDataService.getAll().off("value", this.onDataChange);
  }
};
/**
 * error
 * 1. (수정완료) 컨텐츠 업데이트 또는 published 시, firebase 상에선 변경되지만, 화면 리스트나 상세에서는 변경이 안됨 (최초 불러오는 10개의 컨텐츠는 이상 없음) onDataChange와 연관?
 * 2. 스크롤 중간에(모든 컨텐츠를 불러오기전) 컨텐츠 업데이트 후, 이어서 스크롤 시? 이상 현상
 */
</script>

<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

.list-group-item.active {
  background-color: #262626;
  border-color: #262626;
}
</style>