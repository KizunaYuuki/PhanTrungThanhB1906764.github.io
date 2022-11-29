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
            message: localStorage.getItem('username'),
        };
    },
    methods: {
        async loginUser(data) {
            try {
                await TodoService.login(data);
                this.message = "Đăng nhập thành công"
                setTimeout(function () { window.location.href = "/" }, 10)
                document.getElementById("btnlogin").innerText = data.username
                localStorage.setItem('username', data.username);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>