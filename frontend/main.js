const { app, BrowserWindow } = require("electron");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL("http://localhost:3000"); // Change this after building React
});

// Close app when all windows are closed (except Mac)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
