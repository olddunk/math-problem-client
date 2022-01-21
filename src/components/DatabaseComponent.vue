<template>
  <div class="container">
    <div class="create-problem">
      <label for="create-problem">請輸入題目</label>
      <textarea cols="102" rows="3"
        id="create-problem"
        v-model="text"
        placeholder="請輸入新題目"
        v-focus
      />
      <div class="problem create">
        <vue-mathjax :formula="text"></vue-mathjax>
      </div>
      <div class="input">
        <label for="answer-length" >請輸入答案數:</label>
        <input type="text" id="answer-length" v-model="input_length" class="length">
      </div>
      <div v-if="length>0" class="card">
        <CardComponent
          v-for="(i, index) in length"
          :circleNumber="circleNumber[index]"
          :quizNumber="i"
          :key="index"
          :inputAnswer="userAnswers[index]"
          @setAnswer="setUserAnswer(index, $event)"
        ></CardComponent>
      </div>
      <button @click="createProblem()" class="submit">提交</button>
    </div>
    
    <hr />
    <h1>學測選填題精選</h1>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="problems-container">
      <div
        class="problem"
        v-for="(problem, index) in problems"
        :item="problem"
        :index="index"
        :key="problem._id"
        @dblclick="deleteProblem(problem._id)"
      >
        {{
          ` ${problem.createdAt.getDate()} / ${
            problem.createdAt.getMonth() + 1
          } / ${problem.createdAt.getFullYear()} `
        }}
        <p>
          <vue-mathjax :formula="problem.text"></vue-mathjax>
        </p>
      </div>
    </div>
  </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-AMS_HTML"></script>
<script>
  import { VueMathjax } from "vue-mathjax";
  import ProblemService from "../js/ProblemService";
  import CardComponent from "./CardComponent";
  export default {
    components: {
      "vue-mathjax": VueMathjax,
      "CardComponent": CardComponent
    },
    name: "DatabaseComponent",
    data() {
      return {
        problems: [],
        error: "",
        text: '',
        input_length: '',
        circleNumber: ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"],
        user_answers: []
      };
    },
    async created() {
      try {
        this.problems = await ProblemService.getProblems();
      } catch (error) {
        this.error = error.message;
      }
      this.init()
    },
    computed: {
      length() {
        return parseInt(this.input_length)
      },
      userAnswers: {
        get() {
          return this.user_answers;
        },
        set(user_answers) {
          this.user_answers = user_answers;
        },
      },
    },
    methods: {
      init() {
        this.userAnswers = [];
        this.text = ''
        this.input_length = ''
        for (let i = 0; i < this.length; i++) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.user_answers.push("");
        }
      },
      async createProblem() {
        let problem = {
          text: this.text, 
          length: this.length, 
          answer: this.userAnswers} 
        await ProblemService.insertProblem(problem)
        this.problems = await ProblemService.getProblems()
        this.init()
      },
      async deleteProblem(id) {
        await ProblemService.deleteProblem(id);
        this.problems = await ProblemService.getProblems();
      },
      setUserAnswer(index, userAnswer) {
        this.userAnswers[index] = userAnswer;
      }
    },
    directives: {
      focus: {
    // directive definition
        inserted: function (el) {
          el.focus()
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.container {
    max-width: 800px;
    margin: 0 auto;
  }
  p.error {
    border: 1px solid #ff5b5f;
    background-color: #ffc5c1;
    padding: 10px;
    margin-bottom: 15px;
  }
  div.problem {
    position: relative;
    border: 1px solid #5bd658;
    background-color: #bcffb8;
    padding: 10px 10px 15px 10px;
    margin: 5px 0px;
  }
  div.created-at {
    position: absolute;
    top: 0;
    left: 0;
    text-align: left;
    padding: 5px 10px 5px 10px;
    background-color: darkgreen;
    color: white;
    font-size: 13px;
  }
  div.input {
    text-align: left;
  }
  p {
    text-align: left;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 0;
  }
  div.create {
    text-align: left;
    background-color: darkgreen;
    color: white;
    margin: 5px auto;
  }
  div.input {
    margin: 3px;
  }
  button.submit {
    display: inline-block;
    text-align: left;
    margin: 15px;
  }
  input.length {
    display: inline-block;
    height: 20px;
    width: 30px;
    margin-left: 3px;
  }
</style>
