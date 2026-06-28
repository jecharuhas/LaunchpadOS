const { Launchpad } = require("./launchpad");
const { ActionRegistry } = require("../actions/registry");
const { setupHomeMode } = require("../modes/home");

const launchpad = new Launchpad("Launchpad MK2", "Launchpad MK2");
const registry = new ActionRegistry();

setupHomeMode(launchpad, registry);

console.log("\nLaunchpad test is running.");
console.log("Press pads on the Launchpad.");
console.log("Press Ctrl + C to stop.\n\n");

/*
launchpad.input.on("noteon", (message) => 
{
    const action = message.velocity === 0 ? "RELEASE" : "PRESS";

    console.log(`[NOTE ${action}] note=${message.note}, velocity=${message.velocity}, channel=${message.channel}`);
});

launchpad.input.on("cc", (message) => 
{
    console.log(`[CC] controller=${message.controller}, value=${message.value}, channel=${message.channel}`);
});



launchpad.onPadPress((message) => 
{
    console.log(`Pad pressed: ${message.note}`);
    launchpad.lightPad(message.note);
});

launchpad.onPadRelease((message) => 
{
    console.log(`Pad released: ${message.note}`);
    launchpad.clearPad(message.note);
});


*/ /*

launchpad.onPadPress((message) => 
{
    console.log(`Pad pressed: ${message.note}`);
    launchpad.lightPad(message.note);
});

launchpad.onPadRelease((message) => 
{
    console.log(`Pad released: ${message.note}`);
    launchpad.clearPad(message.note);
});

launchpad.onControlPress((message) =>
{
    console.log(`Control pressed: ${message.controller}`);
    launchpad.lightControl(message.controller);
});

launchpad.onControlRelease((message) =>
{
    console.log(`Control released: ${message.controller}`);
    launchpad.clearControl(message.controller);
});


/*
registry.registerNote(81, {
    id: "test.note81",
    label: "Test Note 81",
    run: async (message) => {
        console.log("Action fired for note:", message.note);
        launchpad.flashPad(message.note);
    }
});

launchpad.onPadPress((message) => 
{
    registry.triggerNote(message.note, message);
});
*/


launchpad.onPadPress(async (message) => 
{
    await registry.triggerNote(message.note, message);
    //launchpad.flashPad(message.note);
});



process.on("SIGINT", () => 
{
    launchpad.close();
    process.exit(0);
});