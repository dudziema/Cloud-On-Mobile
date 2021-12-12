<template>
  <table class="table table:border secondary-5:border">
    <thead>
      <tr>
        <th v-for="(column, index) in columns" :key="index">
          <div class="between:flex center:items">
            <span>{{ column.field }}</span>
            <span></span>
          </div>
        </th>
      </tr>
    </thead>
    <div
      @dragenter.prevent="toggleActive"
      @dragleave.prevent="toggleActive"
      @dragover.prevent
      @drop.prevent="toggleActive"
      :class="{ 'active-dropzone': active }"
    >
      <tbody>
        <tr v-for="(entry, index) in entries" :key="index">
          <td>{{ entry.filename }}</td>
        </tr>
      </tbody>
    </div>
  </table>
</template>

<script>
import { ref } from "vue";
export default {
  name: "FilesList",
  setup() {
    const active = ref(false);

    const toggleActive = () => {
      active.value = !active.value;
    };

    return { active, toggleActive };
  },
  data() {
    return {
      columns: [
        {
          label: "name",
          field: "Name",
        },
        {
          label: "action",
          field: "Action",
        },
      ],
      entries: [],
    };
  },

  created() {
    var my_this = this;
    this.$addWsOnMessageListener(xxx);
    this.$wsListFiles();
    // this.$set(this.entries, 0, 3);

    function xxx(msg) {
      console.log(msg);
      // Vue.$set(this.entries, 0, msg.payload);
      my_this.entries = msg.payload;
      // my_this.$set(my_this.$entries, 0, "gg");
    }
  },
};
</script>
<style scoped>
.active-dropzone {
  opacity: 0.25;
  background-color: #fff;
}
</style>
