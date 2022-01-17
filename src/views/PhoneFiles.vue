<template>
  <div class="container">
    <div class="menu">
      <div class="logo"><Piglogo /></div>
      <div class="button-select"><SelectFile @change="selectedFile" /></div>

      <div class="all-files"><Grid class="grid" />All files</div>
      <div class="recent-files">
        <Clock class="clock" /> Recent files<img :src="image" />
      </div>
      <div class="connected-with">
        <div class="connected-text">Connected with</div>
        <div class="phoneName">
          <PhoneIcon class="phoneicon" />{{ phoneName }}<img :src="image" />
        </div>
      </div>
      <div class="settings">
        <SettingsIcon class="settingsicon" />Settings <img :src="image" />
      </div>

      <div class="disconnect">
        <LogOut class="logout" />Disconnect <img :src="image" />
      </div>
    </div>
    <!-- <div class="searchbox">
      <input id="search" type="search" placeholder="search" />
    </div> -->
    <div class="table">
      <div class="columntitle">All files</div>
      <div class="filelist"><FilesList @drop="dropHandler" /></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import FilesList from "@/components/FilesList.vue";
import SelectFile from "@/components/SelectFile.vue";
import Grid from "@/components/Grid.vue";
import Clock from "@/components/Clock.vue";
import SettingsIcon from "@/components/SettingsIcon.vue";
import LogOut from "@/components/LogOut.vue";
import PhoneIcon from "@/components/PhoneIcon.vue";
import Piglogo from "@/components/Piglogo.vue";
import InProgress from "@/assets/images/inprogress.png";

export default {
  name: "PhoneFiles",

  components: {
    FilesList,
    SelectFile,
    Grid,
    Clock,
    SettingsIcon,
    LogOut,
    PhoneIcon,
    Piglogo,
  },
  data() {
    return {
      image: InProgress,
      phoneName: "iPhone(TEST)",
    };
  },

  methods: {
    dropHandler(ev) {
      if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
          // If dropped items aren't files, reject them
          if (ev.dataTransfer.items[i].kind === "file") {
            var file = ev.dataTransfer.items[i].getAsFile();
            //console log to check
            console.log("... file[" + i + "].name = " + file.name);
            this.$sendFile(file);
          } else {
            alert("This item can't be uploaded.");
          }
        }
      }
    },
    selectedFile(event) {
      console.log("selfile_phone");
      console.log(event.target.files);
      this.$sendFile(event.target.files[0]);
    },
  },
};
</script>
<style scoped>

@media screen and (min-width: 0px) and (max-width: 576px) {
  .logo {
    margin-bottom: 10px;
    width: 50px;
    height: 20px;
    left: 25px;
    top: 24px;
  }
  .button-select {
    top: 4rem;
    margin-left: 0.9rem;
    height: 3rem;
  }
  .grid {
    padding: 0.5rem;
    width: 0.9rem;
  }
  .all-files {
    top: 5rem;
    height: 3rem;
    margin-left: 0.5rem;
    font-size: 0.6rem;
  }
  .clock {
    padding: 0.5rem;
    width: 0.9rem;
  }
  .recent-files {
    top: 7rem;
    position: fixed;
    height: 3rem;
    font-size: 0.6rem;
    margin-left: 0.5rem;
  }
  .phoneicon {
    padding: 0.5rem;
    width: 0.9rem;
  }
  .connected-with {
    width: 100%;
    bottom: 4rem;
    height: 2rem;

    width: 7rem;
    height: 64px;
    margin-left: 0.5rem;
    font-size: 0.6rem;
  }
  .phoneName {
    font-size: 0.7rem;
  }
  .settings {
    width: 100%;
    bottom: 2rem;
    height: 2rem;
    width: 100%;
    margin-left: 0.5rem;
    font-size: 0.6rem;
  }
  .settingsicon {
    padding: 0.5rem;
    width: 0.9rem;
  }
  .disconnect {
    bottom: 0;
    width: 100%;
    height: 2rem;
    font-size: 0.6rem;
    margin-left: 0.5rem;
  }
  .logout {
    padding: 0.5rem;
    width: 0.9rem;
  }
  img {
    width: 0.6rem;
    padding-left: 0.4rem;
    opacity: 0.5;
  }
  .columntitle {
    margin-left: 8rem;
    margin-top: 3rem;
    width: 20rem;
    font-size: 1rem;
  }
  .filelist {
    margin-top: 5rem;
    margin-left: 8rem;
    width: 80vw;
  }
}
@media screen and (min-width: 577px) and (max-width: 768px) {
  .logo {
    margin-bottom: 10px;
    width: 50px;
    height: 20px;
    left: 25px;
    top: 24px;
  }
  .button-select {
    top: 4rem;
    margin-left: 0.9rem;
    height: 3rem;
  }
  .grid {
    padding: 0.5rem;
    width: 1.2rem;
  }
  .all-files {
    top: 7rem;
    height: 3rem;
    width: 100%;
    margin-left: 0.5rem;
    font-size: 0.9rem;
  }
  .clock {
    padding: 0.5rem;
    width: 1.2rem;
  }
  .recent-files {
    top: 10rem;
    position: fixed;
    height: 3rem;
    width: 100%;
    font-size: 0.9rem;
    margin-left: 0.5rem;
  }
  .phoneicon {
    padding: 0.5rem;
    width: 1.2rem;
  }
  .connected-with {
    width: 100%;
    bottom: 6rem;
    height: 3rem;
    width: 100%;
    width: 9.5rem;
    height: 64px;
    margin-left: 0.5rem;
    font-size: 0.7rem;
  }
  .phoneName {
    font-size: 0.8rem;
  }
  .settings {
    width: 100%;
    bottom: 3rem;
    height: 3rem;
    width: 100%;
    margin-left: 0.5rem;
    font-size: 0.9rem;
  }
  .settingsicon {
    padding: 0.5rem;
  }
  .disconnect {
    bottom: 0;
    width: 100%;
    height: 3rem;
    font-size: 0.9rem;
    margin-left: 0.5rem;
  }
  .logout {
    padding: 0.5rem;
  }
  img {
    width: 1.5rem;
    padding-left: 1rem;
    opacity: 0.5;
  }
  .columntitle {
    margin-left: 12rem;
    width: 20rem;
    font-size: 1rem;
    padding-top: 5rem;
  }
  .filelist {
    margin-top: 8rem;
    margin-left: 12rem;
    width: 80vw;
  }
}
@media screen and (min-width: 769px) and (max-width: 992px) {
  .logo {
    margin-bottom: 10px;
    width: 90px;
    height: 40px;
    left: 25px;
    top: 24px;
  }
  .button-select {
    top: 6rem;
    margin-left: 0.5rem;
  }
  .grid {
    padding: 0.5rem;
  }
  .all-files {
    top: 9.5rem;
    height: 3vh;
    width: 100%;
    margin-left: 0.5rem;
    font-size: 0.9rem;
  }
  .clock {
    padding: 0.5rem;
  }
  .recent-files {
    top: 12rem;
    position: fixed;
    height: 3vh;
    width: 100%;
    font-size: 0.9rem;
    margin-left: 0.5rem;
  }
  .phoneicon {
    padding: 0.5rem;
  }
  .connected-with {
    width: 100%;
    bottom: 6rem;
    height: 3rem;
    width: 100%;
    width: 9.5rem;
    height: 64px;
    margin-left: 0.5rem;
    font-size: 0.7rem;
  }
  .phoneName {
    font-size: 0.8rem;
  }
  .settings {
    width: 100%;
    bottom: 3rem;
    height: 3rem;
    width: 100%;
    margin-left: 0.5rem;
    font-size: 0.9rem;
  }
  .settingsicon {
    padding: 0.5rem;
  }
  .disconnect {
    bottom: 0;
    width: 100%;
    height: 3rem;
    font-size: 0.9rem;
    margin-left: 0.5rem;
  }
  .logout {
    padding: 0.5rem;
  }
  img {
    width: 1.5rem;
    padding-left: 1rem;
    opacity: 0.5;
  }
  .columntitle {
    margin-left: 15rem;
    margin-top: 5rem;
    width: 20rem;
    font-size: 2rem;
  }
  .filelist {
    margin-top: 8rem;
    margin-left: 15rem;
    width: 80vw;
  }
}
@media screen and (min-width: 992px) and (max-width: 1200px) {
  .logo {
    margin-bottom: 10px;
    width: 80px;
    height: 30px;
    left: 25px;
    top: 24px;
  }
  .button-select {
    top: 6rem;
    margin-left: 0.5rem;
  }
  .grid {
    padding: 0.5rem;
  }
  .all-files {
    top: 9rem;
    height: 3rem;
    width: 100%;
    margin-left: 0.5rem;
    font-size: 1rem;
  }
  .clock {
    padding: 0.5rem;
  }
  .recent-files {
    top: 12rem;
    position: fixed;
    height: 3rem;
    width: 100%;
    font-size: 1rem;
    margin-left: 0.5rem;
  }
  .phoneicon {
    padding: 0.5rem;
  }
  .connected-with {
    width: 100%;
    bottom: 6rem;
    height: 3rem;
    width: 100%;
    width: 216px;
    height: 64px;
    margin-left: 0.5rem;
    font-size: 0.8rem;
  }
  .phoneName {
    font-size: 0.8rem;
  }
  .settings {
    width: 100%;
    bottom: 3rem;
    height: 3rem;
    width: 100%;
    margin-left: 0.5rem;
    font-size: 1rem;
  }
  .settingsicon {
    padding: 0.5rem;
  }
  .disconnect {
    bottom: 0;
    width: 100%;
    height: 3rem;
    font-size: 1rem;
    margin-left: 0.5rem;
  }
  .logout {
    padding: 0.5rem;
  }
  img {
    width: 1.5rem;
    padding-left: 1rem;
    opacity: 0.5;
  }
  .columntitle {
    margin-left: 15rem;
    margin-top: 5rem;
    width: 20rem;
    font-size: 2rem;
  }
  .filelist {
    margin-top: 8rem;
    margin-left: 15rem;
    width: 80vw;
  }
}
@media screen and (min-width: 1201px) {
  .menu {
    grid-area: menu;
  }
  .logo {
    margin-bottom: 10px;
    width: 90px;
    height: 40px;
    left: 25px;
    top: 24px;
  }
  .button-select {
    top: 6rem;
    margin-left: 0.5rem;
  }
  .grid {
    padding: 0.5rem;
  }
  .all-files {
    top: 9rem;
    height: 3rem;
    width: 100%;
    margin-left: 0.5rem;
    font-size: 16px;
  }
  .clock {
    padding: 0.5rem;
  }
  .recent-files {
    top: 12rem;

    height: 3rem;
    width: 100%;
    font-size: 16px;
    margin-left: 0.5rem;
  }
  .phoneicon {
    padding: 0.5rem;
  }
  .connected-with {
    width: 100%;
    bottom: 6rem;
    height: 3rem;
    width: 100%;
    width: 216px;
    height: 64px;
    margin-left: 0.5rem;
    font-size: 12px;
  }
  .phoneName {
    font-size: 14px;
  }
  .settings {
    width: 100%;
    bottom: 3rem;
    height: 3rem;
    width: 100%;
    margin-left: 0.5rem;
    font-size: 16px;
  }
  .settingsicon {
    padding: 0.5rem;
  }
  .disconnect {
    bottom: 0;
    width: 100%;
    height: 3rem;
    font-size: 16px;
    margin-left: 0.5rem;
  }
  .logout {
    padding: 0.5rem;
  }
  img {
    width: 1.5rem;
    padding-left: 1rem;
    opacity: 0.5;
  }
  .columntitle {
    margin-left: 16rem;

    width: 20rem;
    font-size: 36px;
    padding-top: 5rem;
  }
  .filelist {
    margin-top: 8rem;
    margin-left: 15rem;
    width: 80vw;
  }
}

.logo {
  position: fixed;
  display: flex;
  align-items: center;
}

.button-select {
  position: fixed;
}

.all-files {
  font-weight: 900;
  line-height: 24px;
  font-family: Poppins;
  font-style: normal;
  position: fixed;
  display: flex;
  align-items: center;
  letter-spacing: 0.003em;
  color: #0e70f1;
}
.clock {
  color: #0c0c0c;
}
.recent-files {
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  position: fixed;
  display: flex;
  align-items: center;
  letter-spacing: 0.003em;
  color: #0c0c0c;
}

.connected-with {
  overflow: hidden;
  position: fixed;
  background: #f5faff;
  border-radius: 8px;
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  line-height: 16px;
  color: #000000;
  opacity: 0.6;
}
.connected-text {
  padding-left: 0.5rem;
}
.phoneName {
  align-self: end;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  display: flex;
  align-items: center;
  letter-spacing: 0.003em;
  color: #0e70f1;
}
.settings {
  overflow: hidden;
  position: fixed;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  display: flex;
  align-items: center;
  letter-spacing: 0.003em;
  color: #0c0c0c;
}

.disconnect {
  position: fixed;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  display: flex;
  align-items: center;
  letter-spacing: 0.003em;
  color: #0c0c0c;
}

.columntitle {
  font-family: Poppins;
  font-style: normal;
  background-color: #fff;
  position: fixed;
  font-weight: 600;
  line-height: 48px;
  align-items: center;
  letter-spacing: -0.3px;

  width: 100%;
  color: #0c0c0c;
}
.filelist {
  position: fixed;
}
</style>
