<template>
    <div>
        <header-logo />
        <RouterLink to="/home">
            <button class="btn btn-primary btn-med" id="home_btn" role="button"><strong>Home</strong></button>
        </RouterLink>
        <div class="col-md-4">
            <h2 class="addPost_header"><strong>Create a Post</strong></h2>
            <form class="addpost_form">
                <label for="firstName-input" class="form-label"></label>
                  <input type="text" class="form-control" id="author" placeholder="Name" maxlength="15" v-model="author" required />
                <label for="title-input" class="form-label"></label>
                  <input type="text" class="form-control" id="title" placeholder="Title" minlength="3" v-model="title" required />
                <label for="postText-input" class="form-label"></label>
                  <input type="text" class="form-control" id="postText" placeholder="Write post" minlength="25" v-model="postText" required />
                <div id="file">
                    <input type="file" accept="image/*" ref="file" @change="getImage" />
                </div>
                <img v-if="file" class="image" :src="fileSource" />
                <button type="submit" id="create_post_btn" v-on:click.prevent="createPost()">Create Post</button>
            </form>
        </div>
    </div>
</template>


<script>
import HeaderLogo from '../components/HeaderLogo.vue';

export default {
    data() {
        return {
            title: "",
            author: "",
            postText: "",
            image: "",
            file: "",
            fileSource: "",
        };
    },
    created() {
        this.createPost()
    },
    methods: {
        getImage() {
            this.file = this.$refs.file.files[0];
            this.fileSource = URL.createObjectURL(this.$refs.file.files[0]);
        },

        createPost() {
            let formData = [];
            let requestOptions = {};
            let post = {};

            if (this.file != null) {
                post = JSON.stringify({
                    title: this.title,
                    author: this.author,
                    postText: this.postText,
                });

                formData = new FormData();
                formData.set('file', this.file);
                formData.set('post', post);
                console.log(formData.post);

                requestOptions = {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
                    },
                    body: formData,
                }
            } else {
                formData = {
                    title: this.title,
                    author: this.author,
                    postText: this.postText
                };

                requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
                    },
                    body: JSON.stringify(formData),
                };
            }
            if (this.title && this.author && this.postText != null) {
                fetch("http://localhost:3000/api/posts/", requestOptions)
                .then((res) => {
                    return res.json()
                    .then((data) => {
                        if (res.ok) {
                            this.$router.push("/home");
                            alert('post created successfully')
                        }
                    });
                })
                .catch((error) => {
                    console.error('There was an error!', error);
                });
            }
        }

    },
    components: {
        HeaderLogo
    }
};
</script>

<style scoped>
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

label, input {
    padding: .5rem;
}
</style>