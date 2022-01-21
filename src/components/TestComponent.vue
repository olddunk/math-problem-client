<template>
  <div class="container">
    <!-- <img alt="Vue logo" src="./assets/math_test1.jpg" height="200" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <section v-if="loading">Loading...</section>
    <section v-else-if="problem">
      <div class="problem">
        <h3>第 {{currentIndex + 1}} 題：</h3>
        <div id="timer" class="timeleft" v-if="start">
          <CountdownTimer :date='stopDate' :pause='isConfirm' @overtime='overtimeHandler()'/>
        </div>
        <p class="math">
          <vue-mathjax :formula="problem.text"></vue-mathjax>
        </p>
      </div>
      <h3>答案卡:</h3>
      <CardComponent
        v-for="(i, index) in problem.answer.length"
        :circleNumber="circleNumber[index]"
        :quizNumber="i"
        :key="index"
        :inputAnswer="userAnswers[index]"
        @setAnswer="setUserAnswer(index, $event)"
      ></CardComponent>
      <div class="buttonWrap">
        <div class="button">
          <button @click="checkAnswer(problem.answer, userAnswers)"><i class="fa fa-check" aria-hidden="true"></i></button>
        </div>
        <div class="button">
          <button @click="init()"><i class="fa fa-repeat" aria-hidden="true"></i></button>
        </div>
        <div class="button prev" v-if="currentIndex > 0">
          <button @click="changeIndex(-1)"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
        </div>
        <div class="button next" v-if="currentIndex < total - 1">
          <button @click="changeIndex(1)"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
        </div>
      </div>
      <div class="result correct" v-if="isConfirm && isCorrect">
        <span><i class="fa fa-check" aria-hidden="true"></i></span>
        <audio autoplay>
          <source src="@/assets/claps_sound.mp3" type="audio/mpeg" />
        </audio>
      </div>
      <div class="result wrong" v-else-if="isConfirm && !isCorrect">
        <span><i class="fa fa-times" aria-hidden="true"></i></span>
        <audio autoplay>
          <source src="@/assets/sad_sound.mp3" type="audio/mpeg" />
        </audio>
      </div>
    </section>
  </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-AMS_HTML"></script>

<script>
  import { VueMathjax } from "vue-mathjax";
  import ProblemService from "../js/ProblemService";
  import QuizComponent from "@/components/QuizComponent";
  import CardComponent from "@/components/CardComponent";
  import CountdownTimer from "@/components/Timer.vue";

  export default {
    name: "TestComponent",
    components: {
      VueMathjax,
      QuizComponent,
      CardComponent,
      CountdownTimer
    },
    data() {
      return {
        currentIndex: 0,
        loading: false,
        problems: [],
        circleNumber: ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"],
        problem: null,
        isCorrect: false,
        isConfirm: false,
        user_answers: [],
        start: new Date(0),
        elapseTime: 30
      };
    },
    computed: {
      length() {
        return this.problem.length;
      },
      total() {
        return this.problems.length;
      },
      userAnswers: {
        get() {
          return this.user_answers;
        },
        set(user_answers) {
          this.user_answers = user_answers;
        },
      },
      stopDate() {
          let stop = this.start + this.elapseTime
          return new Date(stop * 1000) 
        }
    },
    methods: {
      
      init() {
        this.isCorrect = false;
        this.isConfirm = false;
        this.userAnswers = [];
        for (let i = 0; i < this.length; i++) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.userAnswers.push("")
        }
        this.start = Math.trunc(Date.parse(new Date()) / 1000)
      },
      checkAnswer(answers, userAnswers) {
        this.isConfirm = true;
        this.isCorrect = JSON.stringify(answers) === JSON.stringify(userAnswers);
      },
      setUserAnswer(index, userAnswer) {
        this.userAnswers[index] = userAnswer;
      },
      changeIndex(change) {
        this.currentIndex = this.currentIndex + change;
        if (this.currentIndex === this.total - 1)
          this.currentIndex = this.total - 1;
        else if (this.currentIndex === -1) this.currentIndex = 0;
        this.problem = this.problems[this.currentIndex];
        this.init();
      },
      changeId(currentId) {
        this.currentIndex = currentId - 1;
        this.problem = this.problems[this.currentIndex];
        this.init();
      },
      overtimeHandler() {
        this.isConfirm = true;
        this.isCorrect = false;
      }
    },
    async created() {
      try {
        this.problems = await ProblemService.getProblems();
      } catch (error) {
        this.error = error.message;
      }
      this.problem = this.problems[0];
      this.loading = false;
      this.init()
    }
  };
</script>

<style scoped>
  @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css");
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 800px;
    position: relative;
  }
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
  .problem {
    width: 100%;
    position: relative;
    border: 1px solid #5bd658;
    background-color: #bcffb8;
    padding: 0px 10px 15px 3px;
    margin: 5px 0px;
  }
  .problem h3 {
    height: 30px;
    margin-bottom: 0;
  }
  .problem > .math {
    position: relative;
    padding-left: 12px;
    padding-right: 12px;
    text-align: left;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 0;
    margin-top: 5px;
  }
  .problem .timeleft {
    position: absolute;
    top: -5px;
    right: 30px;
  }
  .buttonWrap {
    display: flex;
    justify-content: start;
  }
  .button {
    display: inline-block;
    text-align: left;
    margin: 15px;
  }
  button {
    color: white;
    background-color: darkgreen;
    border: none;
    font-size: 20px;
    font-weight: 900;
  }
  button:hover {
    color: black;
    background-color: #5bd658;
  }
  .result {
    width: 200px;
    height: 200px;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%, -90%);
    line-height: 200px;
    padding: 15px;
    margin: auto;
    text-align: center;
    font-size: 150px;
    background-color: rgba(46, 47, 80, 0.8);
    border-radius: 50%;
    color: white;
  }
  .correct i {
    color: #bcffb8;
  }

  .wrong i {
    color: rgb(230, 76, 84);
  }
</style>
