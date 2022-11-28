<template>
    <div class="page">
        <h4>Đăng nhập</h4>
        <LoginForm :user="user" @submit:user="loginUser" />
        <p>{{ message }}</p>
        <p>Chưa có tài khoản?
            <router-link :to="{ name: 'register' }" class="" title="Register">
                Register
            </router-link>
        </p>
    </div>
</template>
<script>
import LoginForm from "@/components/LoginForm.vue";
import TodoService from "@/services/todo.service";
export default {
    components: {
        LoginForm,
    },

    data() {
        return {
            user: {},
            message: "",
        };
    },
    methods: {
        async loginUser(data) {
            try {
                await TodoService.login(data);
                this.message = "Đăng nhập thành công. Trang web sẽ tự động đi đến trang chủ trong 3 giây nữa!"
                setTimeout(function () { window.location.href = "/" }, 3000)
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>