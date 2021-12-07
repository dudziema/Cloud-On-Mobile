<template>
  <table class="table table:border secondary-5:border">
    <thead>
      <tr>
        <th v-for="th in tableHeader" :key="th">
          <div class="between:flex center:items">
            <span>{{ th.text }}</span>
            <span></span>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="td in tableData" :key="td">
        <td>{{ td.columns }}</td>
        <td>{{ td.entries }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "FilesList",
  data() {
    return {
      mutableList: this.entries,
    };
  },
  props: {
    columns: Array,
    entries: Array,
  },
  computed: {
    tableHeader() {
      return this.columns || [];
    },
    tableData() {
      return this.entries || [this.$dataList];
    },
  },
};
</script>
