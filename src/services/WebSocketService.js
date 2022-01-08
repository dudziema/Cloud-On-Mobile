let webSocketsService = {};
var ws = null;
var files = [];
var wsOnmessageListeners = [];

function sendMsgToWs(msg) {
  ws.send(JSON.stringify(msg));
  alert("Message is sent private.");
}

function wsUploadFile(filename, size, bytes) {
  var msg = {
    type: "forward",
    command: "upload",
    payload: { filepath: filename, path: "", size: size, bytes: bytes },
  };
  sendMsgToWs(msg);
}

function isDownloadable(path) {
  if (path == "." || path == "..") {
    return false;
  }
  return true;
}
function base64ToArrayBuffer(base64) {
  var binaryString = window.atob(base64);
  var binaryLen = binaryString.length;
  var bytes = new Uint8Array(binaryLen);
  for (var i = 0; i < binaryLen; i++) {
    var ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
}
function saveByteArray(reportName, byte) {
  let mimeType = "application/octet-stream";
  // let mimeType = mimeTypes[reportName.lastIndexOf(".")+1]
  var blob = new Blob([byte], { type: mimeType });
  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  var fileName = reportName;
  link.download = fileName;
  link.click();
}
function onDownloadedFileFromPhone(message) {
  let decoded_bytes = base64ToArrayBuffer(message.payload.bytes);
  saveByteArray(message.payload.filename, decoded_bytes);
}

// var demoEnabled = false;

webSocketsService.install = function (Vue) {
  Vue.config.globalProperties.$webSocketsConnect = function () {
    console.log("Starting Connection to WebSocket Server");
    ws = new WebSocket("wss://cloudon.cc:9292/");
    this.ws = ws;
    ws.onopen = () => {
      console.log("Now is connected!");
    };

    ws.onmessage = (event) => {
      let received_message = event.data;
      alert("Message is received" + received_message);
      parseMessage(received_message);
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
    ws.close();
  };
  Vue.config.globalProperties.$webSocketsSend = (msg) => {
    ws.send(JSON.stringify(msg));
    alert("Message is sent.");
  };

  // todo: rename to: parseListFiles()
  Vue.config.globalProperties.$parseListFiles = function (obj) {
    let fileList = obj.payload;
    files = fileList;
    if (isDownloadable(files.filename) && files.dir) {
      var link = document.createElement("a");
      // link.setAttribute('href', "http://www.ilovethismusic.com");
      link.setAttribute("target", "_blank");
    }
  };

  Vue.config.globalProperties.$wsDownloadFile = function (path) {
    var msg = { type: "forward", command: "download", path: path };
    this.$webSocketsSend(msg);
  };
  Vue.config.globalProperties.$wsDeleteFile = function (path) {
    var msg = { type: "forward", command: "remove", path: path };
    this.$webSocketsSend(msg);
  };

  Vue.config.globalProperties.$GetSavedFiles = function () {
    return files;
  };
  Vue.config.globalProperties.$wsListFiles = function () {
    var msg = { type: "forward", command: "list-files" };
    sendMsgToWs(msg);
  };

  Vue.config.globalProperties.$addWsOnMessageListener = function (
    listenerFunction
  ) {
    wsOnmessageListeners.push(listenerFunction);
  };

  Vue.config.globalProperties.$sendFile = (file) => {
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.file = file;
    reader.onloadend = function () {
      var data = reader.result;
      var base64data = Buffer.from(data).toString("base64");
      wsUploadFile(this.file.name, this.file.size, base64data);
      console.log("Wyslany pliczek z buttonu");
    };
  };

  /*
    Here we write our custom functions to not make a mess in one function
  */
  function parseMessage(received_msg) {
    let obj = JSON.parse(received_msg);
    if (obj.type == "web-loging-with-code" && obj.result == 0) {
      // wsListFiles();
    } else if (obj.command == "list-files") {
      // todo: potential js injection
      Vue.config.globalProperties.$parseListFiles(obj);
      if (wsOnmessageListeners.length != 0) {
        for (var i = 0; i < wsOnmessageListeners.length; i++) {
          wsOnmessageListeners[i](obj);
        }
      }
    } else if (obj.command == "download") {
      // todo: potential js injection
      onDownloadedFileFromPhone(obj);
    } else if (obj.command == "upload") {
      Vue.config.globalProperties.$wsListFiles();
    }
  }
};

export default webSocketsService;
