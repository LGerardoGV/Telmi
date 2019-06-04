
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
                <footer class="blockquote-footer">Post #{{ index }}</footer>
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
            this.$root.id_post = targetId;
            console.log(this.$root.id_post);

            // this.$root.showComments();            
        }
    }
})

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

new Vue({
    el: '#app',
    data: {
        posts: [],
        comments: [],
        id_post: '',
        new_comment: "",
        
    },
    methods: {
        addPost: function (){
            postId = this.id_post;
            id = this.comments.length;
            name = "newuser";
            email = "my_email@mail.com";
            body = this.new_comment;

            new_array = this.posts.push(postId);

            // localStorage.setItem('posts', JSON.stringify(new_array));
        },
        getPostsAPI: function(){
            // Access the API
            fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            // Response saved in posts array
            .then(response => this.posts = response);
        },
        getCommentsAPI: function(){
            // Access the API
            return fetch('https://jsonplaceholder.typicode.com/comments').then(response => response.json())
            // Response saved in comments array
            .then(response => this.comments = response);          
        }
    },
    beforeCreate: function(){
    },
    created: function(){
    },
    beforeMount: function(){
        this.getPostsAPI();
        this.getCommentsAPI();
    },
    mounted() {
        
    },
    beforeUpdate: function (){
    },
    updated: function(){
    },
    watch:{
        posts: function(){
            // All posts provided by API are saved in LocalStorage
            if(!localStorage.getItem('posts')){
                localStorage.setItem('posts', JSON.stringify(this.posts));
            }
        },
        comments: function(){
            if(!localStorage.getItem('commnets')){
                localStorage.setItem('comments', JSON.stringify(this.comments));
            }
        },
        id_post: function(){
            console.log("cambio")
            this.id_post = this.id_post;
        }
    }
})


/*PENSAR LA MANERA DE LLAMAR LA FUNCIÓN addtoLocalStorage DE MANERA QUE SE AGREGUE LA INFORMACIÓN AL LOCALSTORAGE, ES PROBABLE QUE LLAMEMOS UNA FUNCIÓN FUERA DE VUE QUE CONSUMA EL API Y LO GUARDE EN LOCALSTORAGE PARA DESPUÉS MANIPULARLO EN VUE, COLOCANDO VALIDACIONES SI ESTE YA EXISTE O SEGUIR INVESITGANDO COMO FUNCIONAN EL CICLO DE VIDA*/