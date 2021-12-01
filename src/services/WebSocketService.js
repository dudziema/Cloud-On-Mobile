let webSocketsService = {};

webSocketsService.install = function (Vue) {
  Vue.config.globalProperties.$webSocketsConnect = function () {
    console.log("Starting Connection to WebSocket Server");
    let ws = new WebSocket("ws://192.168.50.112:9292");

    ws.onopen = () => {
      // Restart reconnect interval
      console.log("Now is connected!");
    };

    ws.onmessage = (event) => {
      // New message from the backend - use JSON.parse(event.data)
      let received_message = event.data;
      return received_message.json();
      // parseMessage(received_message);
    };

    ws.onclose = (event) => {
      if (event) {
        alert("Connection is closed.");
      }
    };

    ws.onerror = (error) => {
      console.log(error);
      ws.close();
    };
  };

  Vue.config.globalProperties.$webSocketsDisconnect = () => {
    // Our custom disconnect event
    this.ws.close();
  };

  Vue.config.globalProperties.$webSocketsDataFiles = () => {
    this.ws.onmessage();
  };

  Vue.config.globalProperties.$webSocketsSend = (msg) => {
    // Send data to the backend - use JSON.stringify(data)
    sendMessage(msg);
  };

  /*
    Here we write our custom functions to not make a mess in one function
  */

  // // Array of files
  // Vue.config.globalProperties.file_list = [];

  function sendMessage(msg) {
    this.ws.send(JSON.stringify(msg));
    alert("Message is sent.");
  }
  // function parseMessage(received_message) {
  //   let obj = JSON.parse(received_message);
  //   if (obj.type == "web-login-with-code" && obj.result == 0) {
  //     wsListFiles();
  //   } else if (obj.command == "list-files") {
  //     this.file_list = obj.payload;
  //     console.log(this.file_list);
  //     ui_update_file_list();
  //   }
  // }
  // function wsListFiles() {
  //   let msg = { type: "forward", command: "list-files" };
  //   ws_send(JSON.stringify(msg));
  // }
  // function ws_send(msg) {
  //   console.log("Send: " + msg);
  //   this.ws.send(msg);
  // }
  // // Make function which will parse JSON file to files list
  // function ui_update_file_list() {

  // }
};

export default webSocketsService;
