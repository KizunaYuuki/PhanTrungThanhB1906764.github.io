<template>
    <div class="page">
        <h4>Đăng ký người dùng</h4>
        <RegisterForm :user="user" @submit:user="registerUser" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import RegisterForm from "@/components/RegisterForm.vue";

import TodoService from "@/services/todo.service";
export default {
    components: {
        RegisterForm,
    },
    
    data() {
        return {
            user: {},
            message: "",
        };
    },
    methods: {
        async registerUser (data){
            try{
                // let doc = await TodoService.create(data);
                await TodoService.register(data);
                this.message = "Đăng ký người dùng Thành công. Trang web sẽ tự động đi đến trang Đăng nhập trong 3 giây nữa!"
                setTimeout( function() { window.location.href = "/login" }, 3000 )

            } catch(error){
                console.log(error);
            }
        },
    },
};
</script>