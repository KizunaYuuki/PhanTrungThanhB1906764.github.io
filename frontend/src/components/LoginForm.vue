<template>
    <Form @submit="submitLogin" :validation-schema="LoginFormSchema">
        <div class="form-group">
            <label for="username">Tên người dùng</label>
            <Field name="username" type="text" class="form-control" v-model="userLocal.username" />
            <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="userLocal.password" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Đăng nhập</button>
        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:user"],
    props: {
        user: { type: Object, required: true }
    },
    data() {
        const LoginFormSchema = yup.object().shape({
            username: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            password: yup
                .string()
                .required("Mật khẩu phải có giá trị.")
                .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
                .max(30, "Mật khẩu chứa tối đa 30 ký tự"),
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // userLocal để liên kết với các input trên form
            userLocal: this.user,
            LoginFormSchema,
        };
    },
    methods: {
        submitLogin() {
            this.$emit("submit:user", this.userLocal);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>