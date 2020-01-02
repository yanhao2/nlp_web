<template>
    <div>
        依存文法
    </div>
</template>

<script>
  import api from "../api/api";

  export default {
    name: "DependencyGrammar",
    props: ['formData'],
    data() {
      return {};
    },
    computed: {},
    methods: {
      async LoadData(record) {
        try {
          let formData = new FormData();
          formData.append('title', record.title);
          formData.append('content', record.content);
          let result = await api.dependencyGrammarList(formData)
          console.log(result)
          if (result.code === 200) {

          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    created() {
      if (this.formData.title && this.formData.content) {
        this.LoadData(this.formData)
      }
    },

    mounted() {
    },
    updated() {
    }
  }
</script>

<style scoped>

</style>
