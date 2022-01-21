<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>數學相關連結</h2>
    <ul>
      <li>
        <a
          href="https://www.geogebra.org/?lang=zh-TW"
          target="_blank"
        >
          Gogebra 軟體
        </a>
      </li>
      <li>
        <a
          href="https://math.pro/db/"
          target="_blank"
        >
          Math Pro 數學補給站
        </a>
      </li>
      <li>
        <a
          href="https://web.math.sinica.edu.tw/mathmedia/"
          target="_blank"
        >
          數學傳播
        </a>
      </li>
      <li>
        <a
          href="https://ghresource.mt.ntnu.edu.tw/nss/p/Mathematics"
          target="_blank"
        >
          高中數學學科中心
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://www.mtedu.utaipei.edu.tw/forum.php"
          target="_blank"
        >
          高中數學教師知識庫
        </a>
      </li>
    </ul>
    <h2>數學題庫圈</h2>
    <ul>
      <li>
        <a
          href="https://www.junyiacademy.org/"
          target="_blank"
        >
          均一教育平台
        </a>
      </li>
      <li>
        <a
          href="http://www.math.nsysu.edu.tw/~problem/"
          target="_blank"
        >
          中山大學雙週一題
        </a>
      </li>
      <li>
        <a
          href="http://www.imo-official.org/problems.aspx"
          target="_blank"
        >
          數學奧林匹亞官方題庫
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '歡迎來到老騾數學教育工作坊'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
