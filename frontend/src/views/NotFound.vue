<template>
    <div class="page">
        <p>
            Oops, không thể tìm thấy trang. Trở về
            <router-link to="/">Trang chủ</router-link>
            hoặc trang web sẽ tự động đi đến trang chủ trong 3 giây nữa!"
        </p>
    </div>
</template>        
<script>
setTimeout(function () { window.location.href = "/" }, 3000)
</script>