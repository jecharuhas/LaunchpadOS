require("dotenv").config();

const { listDevices } = require("./midi/devices");
const { Launchpad } = require("./midi/launchpad");
const { ActionRegistry } = require("./actions/registry");
const { setupHomeMode } = require("./modes/home");

const shouldListDevices = process.argv.includes("--list");

console.log("Starting LaunchpadOS...");

if (shouldListDevices) 
{
    listDevices();
    process.exit(0);
}

const inputName = process.env.MIDI_INPUT_NAME;
const outputName = process.env.MIDI_OUTPUT_NAME;

if (!inputName || !outputName) 
{
    console.log("\nMissing MIDI device names.");
    console.log("Run this first:");
    console.log("\n  npm run list\n");
    console.log("Then copy your Launchpad input/output names into your .env file.");

    listDevices();
    process.exit(1);
}

const launchpad = new Launchpad(inputName, outputName);
const registry = new ActionRegistry();

setupHomeMode(launchpad, registry);

launchpad.onPadPress(async (message) => 
{
    await registry.triggerNote(message.note, message);
});
launchpad.onControlPress(async (message) => 
{
    await registry.triggerControl(message.controller, message);
});


process.on("SIGINT", () => 
{
    launchpad.close();
    process.exit(0);
});

console.log("\nLaunchpadOS is running.");
console.log("Press Ctrl + C to stop.\n");