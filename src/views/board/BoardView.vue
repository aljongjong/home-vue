<template>
    <div v-if="currentBoard" class="edit-form">
        <h4>Board</h4>
        <form>
            <div class="form-group">
              <label for="title">Title</label>
              <input
              type="text"
              class="form-control"
              id="title"
              v-model="currentBoard.title"
                />
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea
              class="form-control"
              id="description"
              v-model="currentBoard.description"
              placeholder="내용을 입력하세요."
              ></textarea>
            </div>

            <div class="form-group">
              <label for="createDate">작성일</label>
              <p 
              id="createDate"
              v-text="currentBoard.createDate"
              >
              </p>
            </div>

            <div class="form-group">
              <label><strong>Status:</strong></label>
              {{ currentBoard.published ? "Published" : "Pending" }}
            </div>
        </form>

        <button
        class="badge badge-secondary mr-2"
        v-if="currentBoard.published"
        @click="updatePublished(false)"
        >
        UnPublish
        </button>

        <button
        v-else
        class="badge badge-primary mr-2"
        @click="updatePublished(true)"
        >
        Publish
        </button>

        <button class="badge badge-danger mr-2" @click="deleteBoard">
        Delete
        </button>

        <button type="submit" class="badge badge-success" @click="updateBoard">
        Update
        </button>
        <p>{{ message }}</p>
    </div>

    <div v-else>
        <br />
        <p>Please click on a Board.</p>
    </div>
</template>

<script>
import BoardDataService from "../../services/BoardDataService";

export default {
  name: "board",
  props: ["board"],
  data() {
    return {
      currentBoard: null,
      message: "",
    };
  },
  watch: {
    board: function(board) {
      this.currentBoard = { ...board };
      this.message = "";
    },
  },
  methods: {
    updatePublished(status) {
      BoardDataService.update(this.currentBoard.key, {
        published: status,
      })
        .then(() => {
          this.$emit("updatePublish", this.currentBoard.key, status);
          this.currentBoard.published = status;
          this.message = "The status was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateBoard() {
      const data = {
        title: this.currentBoard.title,
        description: this.currentBoard.description,
      };

      BoardDataService.update(this.currentBoard.key, data)
        .then(() => {
          this.$emit("updateList", this.currentBoard.key, data);
          this.message = "The Board was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteBoard() {
      if (confirm("삭제하시겠습니까?")) {
        BoardDataService.delete(this.currentBoard.key)
          .then(() => {
            this.$emit("refreshList", this.currentBoard.key);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
  mounted() {
    this.message = "";
    this.currentBoard = { ...this.board }
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>