<template>
    <div>

        <h2>Delete Movie</h2>
        <p>Are you sure?</p>
        <button v-on:click="deleteTheMovie" class="btn btn-danger">Delete</button>


    </div>
</template>

<script>

import axios from 'axios';
var apiURL = "https://drupal-vue.ddev.site/node/";
export default {
    name: 'DeleteMovie',
    methods: {
        deleteTheMovie: function () {
            console.log(this.$router);
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic YWRtaW46YWRtaW4='
            };
            axios.delete(apiURL + this.$route.params.delete,{ headers }, function (response) {
                console.log("Deleted");
                console.log(response,"response");
                //this.$router.push('home')
                //window.location.href = '/';

            });
            this.$router.push('/');
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
