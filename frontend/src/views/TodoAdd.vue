<template>
    <div class="page">
        <h4>Thêm TodoList</h4>
        <TodoForm :todo="todo" @submit:todo="addTodo" />
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
    
    data() {
        return {
            todo: {},
            message: "",
        };
    },
    methods: {
        async addTodo (data){
            try{
                await TodoService.create(data);  
                this.message = "Thêm Todolist thành công"
            }catch(error){
                console.log(error);
            }
        },
    },
};
</script>