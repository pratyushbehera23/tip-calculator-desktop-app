// IMPORTS
const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');

// process.env.NODE_ENV = 'production';

// CHECKS
const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

// create MAIN WINDOW
function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Tip calculator',
        width: isDev ? 1000 : 500,
        height: 600,
        icon: "./assets/tipcalclogo.ico"
    });

    // Opendev tools if in development mode (dev env)
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

// create ABOUT Window
function createAboutWindow() {
    const aboutWindow = new BrowserWindow({
        title: 'About Tip Calculator',
        width: 300,
        height: 300
    });

    aboutWindow.loadFile(path.join(__dirname, './renderer/about.html'));
}


// App is ready
app.whenReady().then(() => {
    createMainWindow();

    // Implement menu
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    })
});


// Menu template:
const menu = [
    ...(isMac ? [{
        label: app.name,
        submenu: [{
            label: 'About',
            click: createAboutWindow
        }]
    }] : []),
    {
        role: 'fileMenu',
    },
    ...(!isMac ? [{
        label: 'Help',
        submenu: [{
            label: 'About',
            click: createAboutWindow
        }]
    }] : [])
];
// const menu = [
//     {
//         label: 'File',
//         submenu: [
//             {
//                 label: 'Quit',
//                 click: () => app.quit(),
//                 accelerator: 'Ctrl+W'
//             }
//         ]
//     }
// ];


// full close for 'Mac' (as the program still run after clicking x)
app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit()
    }
})
