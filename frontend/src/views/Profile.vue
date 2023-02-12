<template>
    <HeaderLogo />
    <RouterLink to="/home">
        <button class="btn btn-primary btn-med" id="home-btn" role="button"><strong>Home</strong></button>
    </RouterLink>
    <button class="btn btn-primary btn-lg" id="delete_account_btn" v-on:click.prevent="deleteAccount()"
        role="button"><strong>Delete Account</strong></button>
    <!-- <div class="posts">
        <div v-for="post in posts" :key="post.userid" class="card">
            <div class="card-body">
                <h4 class="card-title"><strong>{{ post.title }}</strong></h4>
                <h5 class="card-subtitle mb-4 text-strong">posted by {{ post.author }}</h5>
                <p class="card-text mb-4">{{ post.posttext }}</p>
                <div class="card-img">
                    <img v-bind:src="post.image" />
                </div>
                <p class="card-subtitle text-muted">{{ post.creationdate }}</p>
            </div>
        </div>
    </div> -->
    <RouterView />
</template>

<script>
import HeaderLogo from '@/components/HeaderLogo.vue';

export default {
    data() {
        return {
            posts: []
        }
    },
    // created() {
    //    this.getPosts()
    // },

    methods: {
        getPosts() {
            const userId = JSON.parse(localStorage.getItem("user")).userId
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
                },
            }

            fetch("http://localhost:3000/api/posts/" + userId, requestOptions)
                .then((res) => {
                    return res.json()
                        .then((data) => {
                            this.posts = data;
                            console.log(data);
                        });
                })
                .catch((error) => {
                    console.error("There was an error!", error);
                });
        },
        deleteAccount() {
            const requestOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
                },
            };
            fetch("http://localhost:3000/api/users/" + JSON.parse(localStorage.getItem("user")).userId, requestOptions)
                .then((res) => {
                    return res.json()
                        .then((data) => {
                            console.log(data);
                            if (res.ok) {
                                this.$router.push("/");
                                alert("Your account has been deleted");
                            }
                        });
                })
                .catch((error) => {
                    console.error("There was an error!", error);
                });
        },
    },

    components: {
        HeaderLogo,

    }
}



</script>


<style scoped>
#home_btn {
    margin: 2rem 0 4rem 8rem;
    font-size: 18px;
}

#delete_account_btn {
    margin: 2rem 0 4rem 3rem;
    font-size: 16px;
}

.card {
    margin-left: 22rem;
    margin-bottom: 2rem;
    width: 50%;
}

.card-body {
    background: linear-gradient(to bottom right, #9ea5f4, #fff);
    box-shadow: 6px 6px 3px rgba(65, 64, 64, 0.867);
    padding: 2rem;
    width: 100%;
}

img {
    height: auto;
    width: 100%;
    margin-bottom: 1rem;
}

@media screen and (max-width: 768px) {
    #home_btn {
        margin: 1rem 0 2rem 3rem;
        font-size: 18px;
    }

    #delete_account_btn {
        margin: 1rem 0 2rem 1rem;
        font-size: 16px;
    }

    .card {
        display: flex;
        justify-content: center;
        margin: .5rem;
        width: 95%;
        box-shadow: none;
    }
}
</style>