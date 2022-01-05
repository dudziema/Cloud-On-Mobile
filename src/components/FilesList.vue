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
        <tr
          v-for="(entry, index) in entries"
          :key="index"
          @mouseover="showButton(entry)"
          @mouseleave="hideButton(entry)"
        >
          <td><input id="checkbox" type="checkbox" /></td>
          <td class="entry">{{ entry.name }}</td>
          <td class="entry">{{ entry.size }}</td>
          <td class="entry">
            {{ entry.modification }}
          </td>
          <td class="download">
            <button v-if="entry.onHover" class="download-button">
              <DownloadIcon class="download-icon" />
            </button>
          </td>
          <td class="trash">
            <button v-if="entry.onHover" class="trash-button">
              <TrashIcon class="trash-icon" />
            </button>
          </td>
        </tr>
      </tbody>
    </div>
  </table>
</template>

<script>
import { ref } from "vue";
import TrashIcon from "@/components/TrashIcon.vue";
import DownloadIcon from "@/components/DownloadIcon.vue";

export default {
  name: "FilesList",
  components: {
    TrashIcon,
    DownloadIcon,
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
      entries: [
      ],
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
.table{
  border-spacing:0px;
}
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
tbody > tr:hover td {
  background: #f5faff;
  height: 3rem;
}
.entry {
  background: #fff;
  height: 3rem;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  border-bottom: 1px solid rgb(231, 231, 231);
  color: rgb(87, 87, 87);
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

</style>
