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
            <span class="header">{{ column.field }} </span>
          </th>
        </tr>
      </thead>

      <tbody>
        <File
          v-for="(entry, index) in entries"
          :key="index"
          :entry="entry"
          @mouseover="showButton(entry)"
          @mouseleave="hideButton(entry)"
        />
      </tbody>
    </div>
  </table>
</template>

<script>
import { ref } from "vue";
import File from "@/components/File.vue";

export default {
  name: "FilesList",
  components: {
    File,
  },
  setup() {
    // Active area for drop and upload file
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
        {
          label: "trash_download",
          field: "",
        },
      ],
      entries: [],
    };
  },
  methods: {
    showButton(entry) {
      entry.onHover = true;
    },
    hideButton(entry) {
      entry.onHover = false;
    },
  },
  created() {
    this.entries.forEach((element) => {
      element.onHover = false;
    });

    var my_this = this;
    this.$addWsOnMessageListener(loadEntries);
    this.$wsListFiles();
    function loadEntries(msg) {
      console.log(msg);
      my_this.entries = msg.payload;
    }
  },
};
</script>
<style scoped>
.table {
  border-spacing: 0px;
}

.active-dropzone {
  opacity: 0.25;
  background-color: #fff;
}

.header {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  font-family: Poppins;
  font-style: normal;
  font-weight: 900;
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
  padding-right: 3rem;
}
</style>
