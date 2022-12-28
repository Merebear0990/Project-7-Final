<template>
    <div v-for="post in posts" :key="post.postid" class="card">
        <div class="card-body">
            <RouterLink :to="{ path: '/' + post.postid }">
                <h4 class="card-title"><strong>{{ post.title }}</strong></h4>
            </RouterLink>
                <h5 class="card-subtitle mb-4 text-strong">posted by {{ post.author }}</h5>
                <p class="card-text mb-4">{{ post.posttext }}</p>
                    <div class="card-img">
                        <img v-bind:src="post.image" />
                    </div>
                <p class="card-subtitle text-muted">{{ post.creationdate }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            posts: [],
            
        }
    },
    created() {
        this.fetchPosts()
    },
    
    methods: {
        getImage() {
            return `/backend/images/${post.image}`
        },
        fetchPosts() {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
                }, 
            };
        fetch("http://localhost:3000/api/posts/", requestOptions)
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
    },
}
</script>


<style scoped>
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}
.card {
    display: flex;
    flex-wrap: wrap;
    margin: 5rem 5rem 0 23rem;
    width: 45%;
    background: linear-gradient(to bottom right, #9ea5f4, #ffffff);
    box-shadow: 6px 6px 3px rgba(65, 64, 64, 0.867);
}
i {
    display: inline-block;
    position: absolute;
    margin-left: 85%;
    padding: .5rem;
}
.card-body {
    padding: 2rem;
}
img {
    height: auto;
    width: 100%;
    margin: .5rem;
    object-fit: cover;
}
@media screen and (max-width: 768px) {
    .card {
        display: flex;
        justify-content: center;
        margin: .5rem;
        width: 95%;
        box-shadow: none;
    }
    i {
        margin-left: 75%;
        padding: 0;
    }
}
</style>
Footer
© 2022 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
