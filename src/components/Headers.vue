<template>
    <div class="headers">
        <div class="wrapper rows">
            <img src="../assets/logo.png" alt="">
        </div>
    </div>
</template>

<script>
  export default {
    name: "Headers",
    data() {
      return {};
    },
    computed: {},
    methods: {},
    created() {
    },

    mounted() {
    },
    updated() {
    }
  }
</script>

<style lang="scss">
    .headers{
        background-color: #061840;
        .wrapper{
            height: 80px;
            align-items: center;
            img {
                height: 40px;
            }
        }
    }
</style>
