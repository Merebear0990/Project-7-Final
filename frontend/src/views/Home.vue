<template>
    <div>
        <HeaderLogo />
        <div class="navigation-btns">
            <router-link to="/addpost">
                <button class="btn btn-primary btn-med text-strong" id="btn_profile" role="button"><strong>Add
                        Post</strong></button>
            </router-link>
            <RouterLink to="/profile">
                <button class="btn btn-secondary btn-med text-strong" id="btn_profile"
                    role="button"><strong>Profile</strong></button>
            </RouterLink>
        </div>
        <PostCard />
        <RouterView />
    </div>
</template>

<script>

import PostCard from '@/components/PostCard.vue';
import HeaderLogo from "../components/HeaderLogo.vue"

export default {
    data() {
        return {
            login: {
                email: "",
                password: "",
            }
        };
    },
    components: {
        PostCard,
        HeaderLogo
    }
}
</script>

<style scoped>

#btn_addPost {
    margin: 2rem 0 0 8rem;
}
#btn_profile {
    margin: 2rem 0 0 3rem;
}

@media screen and (max-width: 768px) {
    #btn_addPost {
        margin-left: 18%;
    }

    #btn_profile,
    #btn_addPost {
        margin-top: 0;
        margin-bottom: 1rem;
    }
}
</style>