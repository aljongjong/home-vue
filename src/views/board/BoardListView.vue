<template>
    <div class="list row">
        <div class="col-md-6">
            <h2>Board List</h2>

            <nav class="navbar navbar-light bg-light">
              <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" @keyup="searchFilter()" v-model="search">
            </nav>

            <VDatePicker 
              v-model="searchDate" 
              @click="searchFilter(); onCalendar = !onCalendar;" 
              title-position="left" 
              expanded 
              :attributes="attributes" 
            />
            
            <br><br>

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
                  <!-- <span v-for="(word, index) in words(b.title)" :key="index">
                    <span v-if="isSearch(word)" style="color:red;">{{ word }}</span>
                    <span v-else>{{ word }}</span>
                  </span> -->
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
import BoardDataService from "../../services/BoardDataService";
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
      searchDate: "",
      attributes: [
        {
            key: 'today',
            highlight: {
              fillMode: 'outline'
            },
            dates: new Date(),
        }
      ],
      onCalendar: false,
    };
  },
  computed: {
    updateCalendar: (addEvent) => {
      this.attributes.push
    }
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
      this.attributes[this.attributes.map(e => e.key).indexOf(key)].popover.label = data.title;
    },

    updatePublish(key, status) {
      this.board[this.board.map(e => e.key).indexOf(key)].published = status;
      this.attributes[this.attributes.map(e => e.key).indexOf(key)].dot.color = status ? 'blue' : 'red';
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
      if (($('#boardList').innerHeight() + ($('#boardList').scrollTop()) >= $('#boardList')[0].scrollHeight) && (this.search == "") && (this.onCalendar == false)) {

        if (this.endSeq < this.$store.getters['board/allBoardContents'].length) {
          this.startSeq += 10; this.endSeq += 10;
          let _board = [];
  
          this.$store.getters['board/allBoardContents'].forEach((val, idx) => {
            if (idx >= this.startSeq && idx <= this.endSeq) _board.push(val);
          });
          this.board.push(..._board);
        }
      }
    },

    searchFilter() {
      let _board = [];

      this.$store.getters['board/allBoardContents']
          .filter(e => e.title.includes(this.search))
          .map(el => {
            if (this.searchDate != "" && this.searchDate != null) {
              let d = new Date(this.searchDate);

              if (d.toLocaleDateString() == el.createDate.substr(0, el.createDate.lastIndexOf(".")+1)) {
                _board.push(el); 
              }
            } else {
              _board.push(el);
            }
          }
          );
      this.board = [];
      this.board.push(..._board);
    },

    // words(string) {
    //   return string.split(/\s+/);
    // },

    // isSearch(string) {
    //   return `/${string}/i`.test(string);
    // },
    
  },
  mounted() {
    BoardDataService.getAll().limitToFirst(10).on("value", this.onDataChange);
    BoardDataService.getAll().once("value", (snap) => {
      snap.forEach((obj) => {
        let attribute = {
            key: '',
            dot: {
              color: '',
            },
            popover: {
              label: '',
            },
            dates: '',
        };
        let key = obj.key;
        let data = obj.val();
        let d = new Date(data.createDate);

        attribute.key = key;
        attribute.popover.label = data.title;
        attribute.dates = d.toLocaleDateString();
        attribute.dot.color = data.published ? 'blue' : 'red';

        this.attributes.push(attribute);
      })
    })
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

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

.list-group-item.active {
  background-color: #262626;
  border-color: #262626;
}

.vc-dot:nth-child(n+4) {
  display: none;
}

.vc-dot:nth-child(4) {
  display: block;
  background-image: url(https://png.pngtree.com/png-vector/20190214/ourmid/pngtree-vector-plus-icon-png-image_515260.jpg);
  background-size: cover;
}
</style>