<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-AMS_HTML"></script>
<script>
  import { VueMathjax } from "vue-mathjax";
  export default {
    components: {
      "vue-mathjax": VueMathjax,
    },
    name: "QuizComponent",
    props: {
      id: {
        type: Number,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  };
</script>
<template src="./template.html"></template>
<style src="./style.css"></style>