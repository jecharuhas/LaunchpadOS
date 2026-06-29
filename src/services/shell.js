const { exec } = require("child_process");

const projectRoot = process.env.PROJECT_ROOT || process.cwd();

function runCommand(command, options = {}) 
{
    return new Promise((resolve) => 
    {
        console.log(`Running command: ${command}`);

        exec(command, 
        {
            cwd: options.cwd || projectRoot,
            shell: "powershell.exe",
            windowsHide: false
        }, 
        (error, stdout, stderr) => 
        {
            if (error) 
            {
                console.error("Command failed:", error.message);
                resolve(false);
                return;
            }

            if (stdout) 
            {
                console.log(stdout);
            }

            if (stderr) 
            {
                console.error(stderr);
            }

            resolve(true);
        });
    });
}

function escapePowerShellString(value) 
{
    return `'${String(value).replace(/'/g, "''")}'`;
}

function openUrl(url) 
{
    return runCommand(`Start-Process ${escapePowerShellString(url)}`);
}

function openApp(command) 
{
    return runCommand(command);
}

module.exports = 
{
    runCommand,
    openUrl,
    openApp
};