<template>
  <table class="table">
    <div
      @dragenter.prevent="toggleActive"
      @dragleave.prevent="toggleActive"
      @dragover.prevent
      @drop.prevent="toggleActive"
      :class="{ 'active-dropzone': active }"
    >
      <thead>
        <tr>
          <th><input id="checkbox" type="checkbox" /></th>
          <th v-for="(column, index) in columns" :key="index">
            <span class="header">{{ column.field }}</span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(entry, index) in entries" :key="index">
          <td><input id="checkbox" type="checkbox" /></td>
          <td class="entry">{{ entry.name }}</td>
          <td class="entry">{{ entry.size }}</td>
          <td class="entry">{{ entry.modification }}</td>
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
          field: "NAME",
        },
        {
          label: "size",
          field: "FILE SIZE",
        },
        {
          label: "modification",
          field: "MODIFIED",
        },
      ],
      entries: [
        {
          name: "test.jpg",
          size: "2 MB",
          modification: "24.10.2021",
        },
        {
          name: "film.mp4",
          size: "45 kB",
          modification: "25.11.2021",
        },
        {
          name: "document.doc",
        },
      ],
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
#checkbox {
  opacity: 0.2;
  /* black */

  border: 1px solid #0c0c0c;
  box-sizing: border-box;
  border-radius: 4px;
}
.active-dropzone {
  opacity: 0.25;
  background-color: #fff;
}
tr:hover {
  background: #f5faff;
}
.entry {
  background: #fff;

  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  border-bottom: 1px rgb(80, 80, 80);
}
.header {
  grid-column: 2 span;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */

  display: flex;
  align-items: center;
  letter-spacing: 0.005em;
  text-transform: uppercase;

  /* black */

  color: #0c0c0c;

  opacity: 0.6;
}
th {
  align-self: center;
}
tr :nth-child(2) {
  padding-right: 25rem;
}
tr :nth-child(3) {
  padding-right: 6rem;
}
tr :nth-child(4) {
  padding-right: 10rem;
}
</style>
