<template>
    <div v-if="todo" class="page">
        <h4>Chỉnh sữa Todolist</h4>
        <TodoForm :todo="todo" @submit:todo="updateTodo" @delete:todo="deleteTodo" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import TodoForm from "@/components/TodoForm.vue";
import TodoService from "@/services/todo.service";
export default {
    components: {
        TodoForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            todo: null,
            message: "",
        };
    },
    methods: {
        async getTodo(id) {
            try {
                this.todo = await TodoService.get(id);
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateTodo(data) {
            try {
                await TodoService.update(this.todo._id, data);
                this.message = "Todolist được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        async deleteTodo() {
            if (confirm("Bạn muốn xóa Todolist này?")) {
                try {
                    await TodoService.delete(this.todo._id);
                    this.$router.push({ name: "todolist" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getTodo(this.id);
        this.message = "";
    },
};
</script>