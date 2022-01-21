<template>
    <div class="container">
      <div class="timer">
        <div v-if="days <= '0' &&  hours <= '0' && minutes <= '0' && seconds <= '0'">
            <p style="color:white;">
            <span><i class="fa fa-times-circle-o" aria-hidden="true"></i></span>
            </p>
        </div>
        <div v-else>
            <p> <i class="fa fa-clock-o" aria-hidden="true"></i>
                <span v-if="Math.trunc(days)>0">{{ Math.trunc(days) }}天</span>
                <span v-if="Math.trunc(hours)>0">{{ Math.trunc(hours) }}時</span>
                <span>{{ Math.trunc(minutes) }}:</span>
                <span>{{ Math.trunc(seconds) }}</span>
            </p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'CountdownTimer',
    props: {
        date: {
            type: Date
        },
        pause: {
            type: Boolean
        }
    },
    data() {
        return {
            now: 0,
            count: 0,
            timerId: null
        }
    },

    methods: {
        timer_loop() {
            this.count++
            this.now = Math.trunc(new Date().getTime() / 1000)
            //console.log(this.now);
            this.timerId = setTimeout(this.timer_loop, 1000)
        },
    },
    mounted() {
        this.timer_loop()
    },
    computed: {
        seconds() {
            return (this.modifiedDate - this.now) % 60
        },
        minutes() {
            return ((this.modifiedDate - this.now) / 60) % 60
        },
        hours() {
            return ((this.modifiedDate - this.now) / 60 / 60) % 24
        },
        days() {
            return ((this.modifiedDate - this.now) / 60 / 60 / 24)
        },
        modifiedDate: function () {
            return Math.trunc(Date.parse(this.date) / 1000)
        },
        overtime: function() {
          return this.now > this.modifiedDate
        }
    },
    watch: {
      date: function() {
        this.timer_loop()
      },
      overtime: {
        handler: function(val) {
          clearTimeout(this.timerId)
          if (val === true) {
            this.$emit('overtime')
          }
        }
      },
      pause: {
        handler: function(val) {
          if (val === true) clearTimeout(this.timerId)
        }
      }
    }
}
</script>

<style scoped>
.container {
  padding: 0px;
}
.timer {
  background-color: #0B1015;
  height: 30px;
  line-height: 30px;
  padding: 0 5px;
  box-sizing: content-box;
  color: #41B883;
  font-weight: 700;
}
</style>