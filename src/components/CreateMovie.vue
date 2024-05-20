<template id="create-movie">
    <div>
        <router-link to="/">Back to Home</router-link>
        <br>
        <h2>Create movie</h2>
        <div class="alert alert-success" v-show="success">You have added a movie.</div>
        <form v-on:submit="createTheMovie">
            <div class="form-group">
                <label>Movie title</label>
                <input type="text" v-model="title" name="title" class="form-control" required>
            </div>

            <div class="form-group">
                <label>Movie body</label>
                <textarea class="form-control" v-model="body" required></textarea>
            </div>

            <button type="submit" class="btn btn-success">Add Movie</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'CreateMovie',
    data() {
        return {
            title: '',
            body: '',
            success: ''
        };
    },
    methods: {
        createTheMovie: function (event) {
            event.preventDefault();
            console.log("creating movie");
            var data = {
                "type": [
                    {
                        "target_id": "movies",
                        "target_type": "node_type"
                    }
                ],
                'title': [
                    {
                        'value': this.title
                    }
                ],
                'body': [
                    {
                        'value': this.body
                    }
                ]
            }

            console.log(data, "data");
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic YWRtaW46YWRtaW4='
            };
            axios.post('https://drupal-vue.ddev.site/node?_format=json', data, { headers }, function (response) {
                this.success = true;
                console.log(response, "response");
            });
            this.success = true;
            this.title = '';
            this.body = '';


        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
