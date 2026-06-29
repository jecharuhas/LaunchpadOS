const { runCommand, openUrl } = require("../services/shell");

const COLORS = 
{
    off: 0,

    // Main categories
    url: 20,
    app: 45,
    github: 50,
    system: 13,
    dev: 17,
    media: 45,
    ai: 37,

    // Special
    danger: 5,
    activeMode: 63,
    inactiveMode: 1,
    press: 63
};

const CONTROLS = 
{
    up: 104,
    down: 105,
    left: 106,
    right: 107,
    session: 108,
    user1: 109,
    user2: 110,
    mixer: 111
};

function xyToNote(x, y) 
{
    return (8 - y) * 10 + (x + 1);
}


const buttons = 
[
    //Browser Shortcuts
    {
        x: 0,
        y: 0,
        label: "YouTube",
        color: COLORS.url,
        run: () => openUrl("https://youtube.com")
    },
    {
        x: 1,
        y: 0,
        label: "ChatGPT",
        color: COLORS.ai,
        run: () => openUrl("https://chatgpt.com")
    },
    {
        x: 2,
        y: 0,
        label: "Gmail",
        color: COLORS.url,
        run: () => openUrl("https://mail.google.com")
    },
    {
        x: 0,
        y: 1,
        label: "Reddit",
        color: COLORS.url,
        run: () => openUrl("https://reddit.com")
    },
    {
        x: 1,
        y: 1,
        label: "Cars & Bids",
        color: COLORS.url,
        run: () => openUrl("https://carsandbids.com")
    },
    {
        x: 2,
        y: 1,
        label: "CLASSIC.COM",
        color: COLORS.url,
        run: () => openUrl("https://www.classic.com")
    },

    // Apps
    {
        x: 5,
        y: 0,
        label: "Chrome",
        color: COLORS.app,
        run: () => runCommand("Start-Process chrome")
    },
    {
        x: 6,
        y: 0,
        label: "Discord",
        color: COLORS.app,
        run: () => runCommand('Start-Process "$env:LOCALAPPDATA\\Discord\\Update.exe" -ArgumentList "--processStart Discord.exe"')
    },
    {
        x: 7,
        y: 0,
        label: "Steam",
        color: COLORS.app,
        run: () => openUrl("steam://open/main")
    },
    {
        x: 5,
        y: 1,
        label: "VS Code",
        color: COLORS.app,
        run: () => runCommand("code .")
    },
    {
        x: 6,
        y: 1,
        label: "Terminal",
        color: COLORS.app,
        run: () => runCommand("wt -d .")
    },
    {
        x: 7,
        y: 1,
        label: "Apple Music",
        color: COLORS.media,
        run: () => openUrl("https://music.apple.com")
    },

    // Windows tools
    {
        x: 0,
        y: 3,
        label: "Snip",
        color: COLORS.system,
        run: () => runCommand("Start-Process ms-screenclip:")
    },
    {
        x: 1,
        y: 3,
        label: "Screenshot",
        color: COLORS.system,
        run: () => runCommand("Start-Process ms-screenclip:")
    },
    {
        x: 2,
        y: 3,
        label: "Explorer",
        color: COLORS.system,
        run: () => runCommand("Start-Process explorer .")
    },
    {
        x: 3,
        y: 3,
        label: "Settings",
        color: COLORS.system,
        run: () => runCommand("Start-Process ms-settings:")
    },
    {
        x: 4,
        y: 3,
        label: "Task Manager",
        color: COLORS.system,
        run: () => runCommand("Start-Process taskmgr")
    },
    {
        x: 5,
        y: 3,
        label: "Calculator",
        color: COLORS.system,
        run: () => runCommand("Start-Process calc")
    },
    {
        x: 6,
        y: 3,
        label: "Notepad",
        color: COLORS.system,
        run: () => runCommand("Start-Process notepad")
    },

    // Dev group
    {
        x: 0,
        y: 5,
        label: "Project Folder",
        color: COLORS.dev,
        run: () => runCommand("Start-Process explorer .")
    },
    {
        x: 1,
        y: 5,
        label: "GitHub",
        color: COLORS.github,
        run: () => openUrl("https://github.com")
    },
    {
        x: 2,
        y: 5,
        label: "Open Repo",
        color: COLORS.github,
        run: () => openUrl("https://github.com/jecharuhas/LaunchpadOS")
    },
    {
        x: 0,
        y: 6,
        label: "npm dev",
        color: COLORS.dev,
        run: () => runCommand('wt -d . powershell -NoExit -Command "npm run dev"')
    },
    {
        x: 1,
        y: 6,
        label: "Git Status",
        color: COLORS.github,
        run: () => runCommand('wt -d . powershell -NoExit -Command "git status"')
    },
    {
        x: 2,
        y: 6,
        label: "Git Pull",
        color: COLORS.github,
        run: () => runCommand('wt -d . powershell -NoExit -Command "git pull"')
    },
    {
        x: 3,
        y: 6,
        label: "Git Push",
        color: COLORS.github,
        run: () => runCommand('wt -d . powershell -NoExit -Command "git push"')
    },

    // AI Stuff
    {
        x: 5,
        y: 5,
        label: "Summarize Clipboard",
        color: COLORS.ai,
        run: async () => {
            console.log("TODO: summarize clipboard");
        }
    },
    {
        x: 6,
        y: 5,
        label: "Explain Clipboard",
        color: COLORS.ai,
        run: async () => {
            console.log("TODO: explain clipboard");
        }
    },

    //Lock PC
    {
        x: 7,
        y: 7,
        label: "Lock PC",
        color: COLORS.danger,
        run: () => runCommand("rundll32.exe user32.dll,LockWorkStation")
    }
];

function setupHomeMode(launchpad, registry) 
{
    registry.clear();

    function paintModeControls() 
    {
        launchpad.clearControl(CONTROLS.session);
        launchpad.clearControl(CONTROLS.user1);
        launchpad.clearControl(CONTROLS.user2);
        launchpad.clearControl(CONTROLS.mixer);

        launchpad.lightControl(CONTROLS.session, COLORS.activeMode);
        launchpad.lightControl(CONTROLS.user1, COLORS.dev);
        launchpad.lightControl(CONTROLS.user2, COLORS.media);
        launchpad.lightControl(CONTROLS.mixer, COLORS.system);

        //For media controls
        launchpad.lightControl(CONTROLS.up, COLORS.inactiveMode);
        launchpad.lightControl(CONTROLS.down, COLORS.inactiveMode);
        launchpad.lightControl(CONTROLS.left, COLORS.inactiveMode);
        launchpad.lightControl(CONTROLS.right, COLORS.inactiveMode);
    }

    function paintHomeLights() 
    {
        for (let y = 0; y < 8; y++) 
        {
            for (let x = 0; x < 8; x++) 
            {
                launchpad.clearPad(xyToNote(x, y));
            }
        }

        for (const button of buttons) 
        {
            const note = xyToNote(button.x, button.y);
            launchpad.lightPad(note, button.color);
        }

        paintModeControls();
    }

    for (const button of buttons) 
    {
        const note = xyToNote(button.x, button.y);

        registry.registerNote(note, 
        {
            id: `home.${button.label.toLowerCase().replaceAll(" ", "-")}`,
            label: button.label,
            run: async () => 
            {
                console.log(`Pressed: ${button.label}`);

                launchpad.lightPad(note, COLORS.press);

                setTimeout(() => 
                {
                    paintHomeLights();
                }, 150);

                await button.run();
            }
        });
    }

    registry.registerControl(CONTROLS.session, 
    {
        id: "mode.home",
        label: "Home Mode",
        run: async () => 
        {
            console.log("Already in Home mode.");
            paintHomeLights();
        }
    });

    registry.registerControl(CONTROLS.user1, 
    {
        id: "mode.dev",
        label: "Dev Mode Placeholder",
        run: async () => 
        {
            console.log("Dev mode not built yet.");
        }
    });

    registry.registerControl(CONTROLS.user2, 
    {
        id: "mode.media",
        label: "Media Mode Placeholder",
        run: async () => 
        {
            console.log("Media mode not built yet.");
        }
    });

    registry.registerControl(CONTROLS.mixer, 
    {
        id: "mode.dashboard",
        label: "Dashboard Mode Placeholder",
        run: async () => 
        {
            console.log("Dashboard mode not built yet.");
        }
    });

    registry.registerControl(CONTROLS.up, 
    {
        id: "media.volume-up-placeholder",
        label: "Volume Up Placeholder",
        run: async () => 
        {
            console.log("TODO: volume up");
        }
    });

    registry.registerControl(CONTROLS.down, 
    {
        id: "media.volume-down-placeholder",
        label: "Volume Down Placeholder",
        run: async () => 
        {
            console.log("TODO: volume down");
        }
    });

    registry.registerControl(CONTROLS.left, 
    {
        id: "media.previous-placeholder",
        label: "Previous Song Placeholder",
        run: async () => 
        {
            console.log("TODO: previous song");
        }
    });

    registry.registerControl(CONTROLS.right, 
    {
        id: "media.next-placeholder",
        label: "Next Song Placeholder",
        run: async () => 
        {
            console.log("TODO: next song");
        }
    });

    paintHomeLights();

    console.log("Home mode loaded.");
    console.log("Mapped Home Mode actions:");
    console.table(registry.listActions());
}

module.exports = {
    setupHomeMode
};