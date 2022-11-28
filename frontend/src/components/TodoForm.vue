<template>
    <Form @submit="submitTodo" :validation-schema="todoFormSchema">
        <div class="form-group">
            <label for="name">Tên</label>
            <Field name="name" type="text" class="form-control" v-model="todoLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <!-- <div class="form-group">
            <label for="email">E-mail</label>
            <Field name="email" type="email" class="form-control" v-model="todoLocal.email" />
            <ErrorMessage name="email" class="error-feedback" />
        </div> -->
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field name="address" type="text" class="form-control" v-model="todoLocal.address" />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <!-- <div class="form-group">
            <label for="phone">Điện thoại</label>
            <Field name="phone" type="tel" class="form-control" v-model="todoLocal.phone" />
            <ErrorMessage name="phone" class="error-feedback" />
        </div> -->

        <!-- add -->
        <div class="form-group">
            <label for="content">Nội dung</label>
            <Field name="content" type="text" class="form-control" v-model="todoLocal.content" />
            <ErrorMessage name="content" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="tags">Tags</label>
            <Field name="tags" type="text" class="form-control" v-model="todoLocal.tags" />
            <ErrorMessage name="tags" class="error-feedback" />
        </div>
        <div class="form-group form-check">
            <input name="complete" type="checkbox" class="form-check-input" v-model="todoLocal.complete" />
            <label for="complete" class="form-check-label">
                <strong>Hoàn thành</strong>
            </label>
        </div>


        <!-- <div class="form-group form-check">
            <input name="favorite" type="checkbox" class="form-check-input" v-model="todoLocal.favorite" />
            <label for="favorite" class="form-check-label">
                <strong>Todolist yêu thích</strong>
            </label>
        </div> -->
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button v-if="todoLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteTodo">
                Xóa
            </button>
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
    emits: ["submit:todo", "delete:todo"],
    props: {
        todo: { type: Object, required: true }
    },
    data() {
        const todoFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            // email: yup
            //     .string()
            //     .email("E-mail không đúng.")
            //     .max(50, "E-mail tối đa 50 ký tự."),
            address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
            // phone: yup
            //     .string()
            //     .matches(
            //         /((09|03|07|08|05)+([0-9]{8})\b)/g,
            //         "Số điện thoại không hợp lệ."
            //     ),
            content: yup.string().max(1000, "Nội dung chứa tối đa 1000 ký tự"),
            tags: yup.string().max(30, "Tags tối đa chứa 30 ký tự")
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // todoLocal để liên kết với các input trên form
            todoLocal: this.todo,
            todoFormSchema,
        };
    },
    methods: {
        submitTodo() {
            this.$emit("submit:todo", this.todoLocal);
        },
        deleteTodo() {
            this.$emit("delete:todo", this.todoLocal.id);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>