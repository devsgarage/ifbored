<template>
    <Layout>
        <h1>Make A Suggestion</h1>
        <p><i>TBD: text describing why and what types of suggestions to submit</i></p>
        <h2 v-html="thankYouText" />
        <form id="suggestionSection" @submit.prevent="formSubmit">
            <div id="sectionTitle">Suggestion</div>
            <div class="inputGroup">
                <label id="titleId">Title</label>
                <input id="suggestionTitle" placeholder="Title" v-model="suggestion.title" aria-labelledby="sectionTitle titleId" />
            </div>
            <div class="inputGroup">
                <label id="descriptionId">Description</label>
                <textarea id="suggestionDescription" rows="5" cols="50" placeholder="Description" v-model="suggestion.description" aria-labelledby="sectionTitle descriptionId" />
            </div>
            <div class="inputGroup">
                <label id="resourceId">Resource URL</label>
                <input id="suggestionLink" placeholder="URL to resource" v-model="suggestion.link" aria-labelledby="sectionTitle resourceId"/>
            </div>
            <div class="inputGroup">
                <label id="tagId">Tags</label>
                <input id="tags" placeholder="Comma delimted tags (e.g. JavaScript, Vue, Gridsome)" v-model="suggestion.tags" aria-labelledby="sectionTitle tagId"/>
            </div>
            <button id="btnSubmit" type="submit">Submit suggestion</button>
        </form>
    </Layout>
</template>

<script>

import axios from 'axios'

export default {    
    data() {
      return {
        suggestion: {},
        thankYouText: ""
      }
    },
    methods: {
      async formSubmit(e) {   
        let suggestionToSend = {
            title: this.suggestion.title,
            description: this.suggestion.description,
            resource: this.suggestion.link,
            tags: this.suggestion.tags
            };
        console.log(suggestionToSend);
        try{
            let result = await axios.post('http://localhost:65326/make-a-suggestion/', suggestionToSend );
            this.thankYouText = "Thank you for you suggestion: " + this.suggestion.title;
            this.suggestion = {};
        } catch(error) {
            console.log(error);
        }
      }
    }
}
</script>

<style>

#suggestionSection {
    border-style: solid;
    margin-top: 1.5rem;
}

#sectionTitle {    
    font-size: 1.5rem;
    margin-top: -1.4rem;
    background: white;
    margin-bottom: .4rem;
    width: fit-content;
    margin-left: .5rem;
}

#btnSubmit {
    margin-left: .5rem;
    margin-bottom: 1rem;
}

.inputGroup{
    display: block;
    margin-left: .5rem;
    margin-bottom: 1rem;
}

.inputGroup label {
    font-size: .75rem;
    font-weight: bold;
    display: block;
}

.inputGroup input {
    width: 23.5rem;
}

.inputGroup textarea {
    width: 23.5rem;
}

</style>