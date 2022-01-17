<template>
  <div class="selectfile">
    <label class="select" for="selectFile">+ Add new file</label>
    <input
      ref="file"
      type="file"
      id="selectFile"
      class="selectFiles"
      @change="previewFiles"
    />
  </div>
</template>

<script>
export default {
  name: "SelectFile",
  methods: {
    previewFiles(event) {
      console.log("selfile");
      console.log(event.target.files);
    },
  },
};
</script>
<style scoped>
@media screen and (min-width: 0px) and (max-width: 576px) {
  .select {
    position: fixed;
    font-size: 0.6rem;
    line-height: 1rem;
    padding: 0.4rem;
    border-radius: 8px;
  }
}
@media screen and (min-width: 577px) and (max-width: 768px) {
  .select {
    position: fixed;
    font-size: 0.9rem;
    line-height: 1rem;
    padding: 0.4rem;
    border-radius: 8px;
    padding-right: 1rem;
    padding-left: 1rem;
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  .select {
    position: fixed;
    font-size: 1rem;
    line-height: 1rem;
    padding: 0.8rem;
    border-radius: 8px;
    padding-right: 1rem;
    padding-left: 1rem;
  }
}
@media screen and (min-width: 992px) and (max-width: 1200px) {
  .select {
    position: fixed;
    font-size: 1rem;
    line-height: 1rem;
    padding: 0.8rem;
    border-radius: 8px;
    padding-right: 2rem;
    padding-left: 2rem;
  }
}
@media screen and (min-width: 1201px) {
  .select {
    position: fixed;
    padding-left: 3rem;
    padding-right: 3rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 16px;
    line-height: 24px;
    border-radius: 12px;
  }
}

.select {
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  color: #ffffff;
  background: #0e70f1;

  letter-spacing: 0.01em;
}
input {
  display: none;
}
</style>
