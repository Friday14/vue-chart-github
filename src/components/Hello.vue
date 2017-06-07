<template lang="pug">
  doctype html
  html(lang="en")
  head
  title= pageTitle
  script(type='text/javascript').
  if (foo) bar(1 + 5)
  body
  h1 Pug - node template engine
  #container.col
  if youAreUsingPug
    p You are amazing
  else
  p Get on it!
    p.
      Pug is a terse and simple templating language with a
    strong focus on performance and powerful features.
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
