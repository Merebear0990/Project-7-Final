<template>
    <HeaderLogo />
    <RouterLink to="/home">
        <button class="btn btn-primary btn-med" id="home_btn" role="button"><strong>Home</strong></button>
    </RouterLink>
    <OnePost />
    <RouterView />
</template>

<script>
import HeaderLogo from '@/components/HeaderLogo.vue';
import OnePost from '@/components/OnePost.vue';

export default {
    data() {
        return{
            posts: []
        }
    },

    components: {
        HeaderLogo,
        OnePost
    }
}
</script>