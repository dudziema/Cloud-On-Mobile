<template>
  <tr>
    <td><input id="checkbox" type="checkbox" /></td>
    <td class="entry">{{ entry.name }}</td>
    <td class="entry">{{ entry.size }}</td>
    <td class="entry">{{ entry.modification }}</td>
    <td class="download">
      <button
        class="download-button"
        v-if="entry.onHover"
        v-on:click="downloadFile(entry.filename)"
      >
        <DownloadIcon class="download-icon" />
      </button>
    </td>
    <td class="trash">
      <button
        class="trash-button"
        v-if="entry.onHover"
        v-on:click="deleteFile(entry.filename)"
      >
        <TrashIcon class="trash-icon" />
      </button>
    </td>
  </tr>
</template>
<script>
import TrashIcon from "@/components/TrashIcon.vue";
import DownloadIcon from "@/components/DownloadIcon.vue";

export default {
  name: "File",
  components: {
    TrashIcon,
    DownloadIcon,
  },
  props: {
    entry: {
      type: Object,
      required: true,
    },
  },
  methods: {
    downloadFile(path) {
      this.$wsDownloadFile(path);
    },
    deleteFile(path) {
      this.$wsDeleteFile(path);
      this.$wsListFiles();
    },
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
.entry {
  background: #fff;
  height: 3rem;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid rgb(231, 231, 231);
  color: rgb(87, 87, 87);
}
.trash {
  padding-left: 1rem;
  height: 8%;
  opacity: 0.6;
  border-bottom: 1px solid rgb(231, 231, 231);
  color: rgb(87, 87, 87);
  width: 3rem;
}
.download {
  padding-left: 1rem;
  height: 8%;
  border-bottom: 1px solid rgb(231, 231, 231);
  color: rgb(87, 87, 87);
  width: 3rem;
}
.trash-button,
.download-button {
  border: none;
  background: none;
}
tbody > tr:hover td {
  background: #f5faff;
  height: 3rem;
}
</style>
