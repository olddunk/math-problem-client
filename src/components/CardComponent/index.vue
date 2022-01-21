<script>
  export default {
    name: "CardComponent",
    props: {
      circleNumber: {
        type: String,
        require: true,
      },
      quizNumber: {
        type: Number,
        require: true,
      },
      inputAnswer: {
        type: String,
        require: true,
      }
    },
    data() {
      return {
        cardItem: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "–", "±"],
        user_answer: null
      };
    },
    computed: {
      userAnswer: {
        get() {
          return this.user_answer;
        },
        set(user_answer) {
          this.user_answer = user_answer
        }
      }
    },
    watch: {
      inputAnswer: function(inputAnswer) {
        this.userAnswer = inputAnswer
      }
    },
    methods: {
      changeHandler() {
        this.userAnswer = this.userAnswer || "";
        this.$emit("setAnswer", this.userAnswer);
      }
    },
  };
</script>
<template src="./template.html"></template>
<style src="./style.css" scoped></style>