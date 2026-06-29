const { runCommand, openUrl } = require("../services/shell");

const COLORS = 
{
    off: 0,
    red: 5,
    green: 20,
    yellow: 13,
    blue: 16,
    purple: 45,
    white: 63
};

function xyToNote(x, y) 
{
    return (8 - y) * 10 + (x + 1);
}

const buttons = 
[
    //Row 1
    {
        x: 0,
        y: 0,
        label: "Chrome",
        color: COLORS.green,
        run: () => runCommand("Start-Process chrome")
    },
    {
        x: 1,
        y: 0,
        label: "VS Code",
        color: COLORS.blue,
        run: () => runCommand("code .")
    },
    {
        x: 2,
        y: 0,
        label: "Terminal",
        color: COLORS.blue,
        run: () => runCommand("Start-Process wt")
    },
    {
        x: 3,
        y: 0,
        label: "Explorer",
        color: COLORS.yellow,
        run: () => runCommand("Start-Process explorer .")
    },
    {
        x: 4,
        y: 0,
        label: "Discord",
        color: COLORS.purple,
        run: () => runCommand('Start-Process "$env:LOCALAPPDATA\\Discord\\Update.exe" -ArgumentList "--processStart Discord.exe"')
    },
    {
        x: 5,
        y: 0,
        label: "Steam",
        color: COLORS.purple,
        run: () => openUrl("steam://open/main")
    },
    {
        x: 6,
        y: 0,
        label: "Apple Music",
        color: COLORS.purple,
        run: () => openUrl("https://music.apple.com")
    },
    {
        x: 7,
        y: 0,
        label: "ChatGPT",
        color: COLORS.green,
        run: () => openUrl("https://chatgpt.com")
    },

    //Row 2
    {
        x: 0,
        y: 1,
        label: "YouTube",
        color: COLORS.green,
        run: () => openUrl("https://youtube.com")
    },
    {
        x: 1,
        y: 1,
        label: "GitHub",
        color: COLORS.blue,
        run: () => openUrl("https://github.com")
    },
    {
        x: 2,
        y: 1,
        label: "Gmail",
        color: COLORS.green,
        run: () => openUrl("https://mail.google.com")
    },
    {
        x: 3,
        y: 1,
        label: "Reddit",
        color: COLORS.green,
        run: () => openUrl("https://reddit.com")
    },
    {
        x: 4,
        y: 1,
        label: "Cars & Bids",
        color: COLORS.green,
        run: () => openUrl("https://carsandbids.com")
    },
    {
        x: 5,
        y: 1,
        label: "CLASSIC.COM",
        color: COLORS.green,
        run: () => openUrl("https://www.classic.com")
    },
    {
        x: 6,
        y: 1,
        label: "Settings",
        color: COLORS.yellow,
        run: () => runCommand("Start-Process ms-settings:")
    },
    {
        x: 7,
        y: 1,
        label: "Task Manager",
        color: COLORS.yellow,
        run: () => runCommand("Start-Process taskmgr")
    },

    //Row 3
    {
        x: 0,
        y: 2,
        label: "Snip",
        color: COLORS.yellow,
        run: () => runCommand("Start-Process ms-screenclip:")
    },
    {
        x: 1,
        y: 2,
        label: "Screenshot",
        color: COLORS.yellow,
        run: () => runCommand("Start-Process ms-screenclip:")
    },
    {
        x: 2,
        y: 2,
        label: "Calculator",
        color: COLORS.yellow,
        run: () => runCommand("Start-Process calc")
    },
    {
        x: 3,
        y: 2,
        label: "Notepad",
        color: COLORS.yellow,
        run: () => runCommand("Start-Process notepad")
    },
    {
        x: 4,
        y: 2,
        label: "Lock PC",
        color: COLORS.red,
        run: () => runCommand("rundll32.exe user32.dll,LockWorkStation")
    },

    //Row 4
    {
        x: 0,
        y: 3,
        label: "Project Folder",
        color: COLORS.blue,
        run: () => runCommand("Start-Process explorer .")
    },
    {
        x: 1,
        y: 3,
        label: "npm run dev",
        color: COLORS.blue,
        run: () => runCommand("Start-Process powershell -ArgumentList '-NoExit', '-Command', 'npm run dev'")
    },
    {
        x: 2,
        y: 3,
        label: "Git Pull",
        color: COLORS.blue,
        run: () => runCommand("Start-Process powershell -ArgumentList '-NoExit', '-Command', 'git pull'")
    },
    {
        x: 3,
        y: 3,
        label: "Git Push",
        color: COLORS.blue,
        run: () => runCommand("Start-Process powershell -ArgumentList '-NoExit', '-Command', 'git push'")
    },
    {
        x: 4,
        y: 3,
        label: "Git Status",
        color: COLORS.blue,
        run: () => runCommand("Start-Process powershell -ArgumentList '-NoExit', '-Command', 'git status'")
    },
    {
        x: 5,
        y: 3,
        label: "Open Repo",
        color: COLORS.blue,
        run: () => openUrl("https://github.com/jecharuhas/LaunchpadOS")
    }
];

function setupHomeMode(launchpad, registry) 
{
    registry.clear();

    function paintHomeLights() 
    {
        for (const button of buttons) 
        {
            const note = xyToNote(button.x, button.y);
            launchpad.lightPad(note, button.color);
        }
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

                launchpad.lightPad(note, COLORS.white);

                setTimeout(() => {paintHomeLights();}, 150);

                await button.run();
            }
        });
    }

    paintHomeLights();

    console.log("Home mode loaded.");
    console.log("Mapped Home Mode actions:");
    console.table(registry.listActions());
}

module.exports = 
{
    setupHomeMode
};