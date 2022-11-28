<template >
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Quản lý Todolist</a>
        <div class="mr-auto navbar-nav">
            <!-- Tạo khoản cách -->
        </div>
        <router-link :to="{ name: 'login' }" class="nav-link navbar-brand" title="Login">
            <i class="fa-solid fa-right-to-bracket"></i>
        </router-link>
        <a @click="logoutUser()" class="nav-link navbar-brand" title="Logout">
            <i class="fa-solid fa-right-from-bracket"></i></a>
    </nav>
</template>

<script>
import TodoService from "@/services/todo.service";
export default {
    data() {
        return {
            message: "",
        };
    },
    methods: {
        async logoutUser() {
            try {
                await TodoService.logout();
                this.message = "Đăng xuất thành công. Trang web sẽ tự động đi đến trang Đăng nhập trong 3 giây nữa!"
                setTimeout(function () { window.location.href = "/" }, 3000)
            } catch (error) {
                console.log(error);
            }
        },
    }
};
</script>