<!--suppress ALL -->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <table border="1" style="width: 600px;">
      <tr>
        <td>姓名</td>
        <td>年龄</td>
        <td>操作</td>
      </tr>
      <tr v-for="user in userData" v-bind="user.name">
        <td>{{user.name}}</td>
        <td><input v-model.number="user.age" type="number"></td>
        <td><button @click="add(user,1)">新增</button></td>
      </tr>
      <tr>
        <td>合计</td>
        <td>{{total()}}</td>
        <td></td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {//数据
    return {
      userData: [
        {name: 'demo', age: 10},
        {name: 'demo1', age: 11},
        {name: 'demo2', age: 12}
      ],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed:{//数据转换

    },
  methods: {//方法
    add (user, num){
      user.age += num
    },
    total(){
      return this.userData.reduce((sum,item)=>{
        return sum+item.age;
      },0 )},
  },
  created:{}
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
