Vue.component('post-element', {
    props: ['title', 'body', 'index'],
    template: `
        <div class="card posts"> 
            <div class="card-header post-header" :id="'heading' + index">
                <h5 class="mb-0">
                    <button :id="index" @click="callComments($event)" class="btn btn-link title-post" type="button" data-toggle="collapse" :data-target="'#collapse' + index" aria-expanded="true" :aria-controls="'collapse' + index">
                        {{ title }}
                    </button>
                </h5>
                <footer class="blockquote-footer"  @click.native="showComments">Post #{{ index }}</footer>
            </div>
            <div :id="'collapse' + index" class= "collapse" :aria-labelledby="'heading' + index" data-parent="#accordionExample">
                <div class="card-body">{{ body }}</div>
            </div> 
        </div >
    `,
    methods : {
        callComments: function (event) {
            // comments = {}
            targetId = event.currentTarget.id;
            console.log(targetId);
            this.$root.post_id = targetId;
            console.log(this.$root.post_id);

            this.$root.showComments();            
        }
    }
})

var bus = new Vue()
Vue.component('comment-element', {
    props: ['user', 'body', 'index'],
    template: `
        <div class="card mb-3 comment-cont">
            <div class="card-header text-light badge-cont">
                <span class="badge badge-primary badge-name">
                    {{user}}
                </span> 
            </div>
            <div class="x card-body comment-body">
                <p class="card-text"> {{body}} </p>
            </div>
        </div>
    `
})

function getPostsAPI() {
    return fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json());
}

function getCommentsAPI(){
    return fetch('https://jsonplaceholder.typicode.com/comments').then(response => response.json());
}

new Vue({
    el: '#app',
    data: {
        posts: [],
        comments: [],
        id_post: 0,
        new_comment: ""
    },
    methods: {
        showPosts: function () {
            getPostsAPI().then(posts => this.posts = posts);
        },
        showComments: function () {
            getCommentsAPI().then(comments => this.comments = comments);
        },
        addPost: function (){
            postId = this.id_post;
            id = this.comments.length;
            name = "newuser";
            email = "my_email@mail.com";
            body = this.new_comment;

            new_array = this.posts.push(postId);

            localStorage.setItem('posts', JSON.stringify(new_array));
        }
    },
    mounted: function () {
        console.log("BeforeMount")
        this.showPosts();
        this.showComments();
    },
    
    updated: function(){
        // this.showComments();
        // console.log("Updated");
        // console.log(id_post)
        // console.log(JSON.stringify(this.posts));
        // console.log(JSON.stringify(this.comments));
    }
})