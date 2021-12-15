<template>
  <router-view />
</template>
<style scoped>
@font-face {
  font-family: "SF-Pro-Text";
  src: url(./assets/fonts/SF-Pro-Text-Regular.otf);
}
@font-face {
  font-family: "Poppins";
  src: url(./assets/fonts/Poppins-ExtraLight.ttf);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  padding: 0;
  /* min-height: 100%; */
  height: 100%;
}

#nav {
  width: 100%;
  display: flex;
  align-items: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
