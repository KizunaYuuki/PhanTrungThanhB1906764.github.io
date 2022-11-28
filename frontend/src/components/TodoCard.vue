<script>
export default {
    props: {
        todo: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ todo.name }}
        </div>
        <!-- <div class="p-1">
            <strong>E-mail:</strong>
            {{ todo.email }}
        </div> -->
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ todo.address }}
        </div>
        <!-- <div class="p-1">
            <strong>Điện thoại:</strong>
            {{ todo.phone }}
        </div> -->
        <!-- <div class="p-1">
            <strong>Todolist yêu thích:&nbsp;</strong>
            <i v-if="todo.favorite" class="fas fa-check"></i>
            <i v-else class="fas fa-times"></i>
        </div> -->
        <div class="p-1">
            <strong>Nội dung:</strong>
            {{ todo.content }}
        </div>
        <div class="p-1">
            <strong>Tags:</strong>
            {{ todo.tags }}
        </div>
        <div class="p-1">
            <strong>Hoàn thành:&nbsp;</strong>
            <i v-if="todo.complete" class="fas fa-check"></i>
            <i v-else class="fas fa-times"></i>
        </div>
    </div>
</template>