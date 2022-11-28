<template>
    <div class="page row">
        <div class="col-md-10 ">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Todolists
            </h4>
            <Todo_List v-if="filteredTodosCount > 0" :todos="filteredTodos"
                v-model:activeIndex="activeIndex" />
            <p v-else>Không có Todolist nào!</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddTodo">
                    <i class="fas fa-plus"></i> Thêm
                </button>
                <button class="btn btn-sm btn-danger" @click="removeAllTodos">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeTodo">
                <h4>
                    Todolist Chi tiết 
                </h4>
                <TodoCard :todo="activeTodo" />
                <router-link :to="{
                    name: 'todo.edit',
                    params: { id: activeTodo._id },
                }">
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i> </span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import TodoCard from "@/components/TodoCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import Todo_List from "@/components/Todo_List.vue";
import TodoService from "@/services/todo.service";
export default {
    components: {
        TodoCard,
        InputSearch,
        Todo_List,
    },
    data() {
        return {
            todos: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        // Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng todo thành chuỗi để tiện cho tìm kiếm.
        todoStrings() {
            return this.todos.map((todo) => {
                const { name, email, address, phone } = todo;
                return [name, email, address, phone].join("");
            });
        },
        // Trả về các todo có chứa thông tin cần tìm kiếm.
        filteredTodos() {
            if (!this.searchText) return this.todos;
            return this.todos.filter((_todo, index) =>
                this.todoStrings[index].includes(this.searchText)
            );
        },
        activeTodo() {
            if (this.activeIndex < 0) return null;
            return this.filteredTodos[this.activeIndex];
        },
        filteredTodosCount() {
            return this.filteredTodos.length;
        },
    },
    methods: {
        async retrieveTodos() {
            try {
                this.todos = await TodoService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveTodos();
            this.activeIndex = -1;
        },
        async removeAllTodos() {
            if (confirm("Bạn muốn xóa tất cả Todolist?")) {
                try {
                    await TodoService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddTodo() {
            this.$router.push({ name: "todo.add" });
        },

        async logoutUser() {
            try {
                await TodoService.logout();
                // this.message = "Đăng xuất thành công. Trang web sẽ tự động đi đến trang Đăng nhập trong 3 giây nữa!"
                setTimeout(function () { window.location.href = "/" }, 3000)
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.refreshList();
    },
};


</script>
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>    