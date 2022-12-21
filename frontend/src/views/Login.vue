<template>
    <LoginCard />
    <router-view />
</template>

<script>
import LoginCard from '../components/LoginCard.vue';

export default {
    name: 'login',
    components: {
        LoginCard
    }
}
</script>