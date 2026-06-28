const { Launchpad } = require("./launchpad");

const launchpad = new Launchpad("Launchpad MK2", "Launchpad MK2");

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
*/

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

process.on("SIGINT", () => 
{
    launchpad.close();
    process.exit(0);
});