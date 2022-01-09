<template>
  <tr>
    <td>
      <img :src="getIcon(getExtention(entry.filename))" />
    </td>
    <td class="entry">{{ entry.name }}</td>
    <td class="entry">{{ formatBytes(entry.size, (decimals = 0)) }}</td>
    <td class="entry">{{ formatTime(entry.date_epoch) }}</td>
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
import imageIcon from "@/assets/images/imageIcon.png";
import docIcon from "@/assets/images/docIcon.png";
import videoIcon from "@/assets/images/videoIcon.png";
import musicIcon from "@/assets/images/musicIcon.png";

export default {
  name: "File",
  data() {
    return {
      decimals: 0,
      extentionsList: [
        {
          value: imageIcon,
          extention: ["jpg", "jpeg", "png", "gif"],
        },
        {
          value: docIcon,
          extention: ["doc", "docx", "pdf","xls", "xlsx", "ppt", "pptx"],
        },
        {
          value: videoIcon,
          extention: ["mp4", "wmv", "avi"],
        },
         {
          value: musicIcon,
          extention: ["mp3"],
        },
      ],
    };
  },
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
    formatBytes(bytes, decimals) {
      if (bytes === 0) return "0 Bytes";

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB"];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },
    formatTime(epochTime) {
      const d = new Date(epochTime * 1000);
      const uDay = function (d) {
        if (d.getDate() < 10) {
          return "0" + d.getDate();
        } else {
          return d.getDate();
        }
      };
      const uMonth = function (d) {
        if (d.getMonth() + 1 < 10) {
          return "0" + (d.getMonth() + 1);
        } else {
          return d.getMonth() + 1;
        }
      };
      const uYear = d.getFullYear();
      const uploadDate = uDay(d) + "." + uMonth(d) + "." + uYear;
      return uploadDate;
    },
    getExtention(value) {
      var getExtention = value.split(".");
      var extention = getExtention[1];

      return extention;
    },
    getIcon(ext) {
      let icon =
        this.extentionsList.find((item) => {
          let { extention } = item;
          if (Array.isArray(extention)) {
            return extention.includes(ext);
          } else if (typeof extention === "string") {
            return extention === ext;
          }
        }) || {};
      return icon.value || this.extentionsList[1].value;
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
