const HomeTestPad = 81;
const TimePad = 82;
const ClearTestPad = 83;
const DebugPad = 84;

function setupHomeMode(launchpad, registry)
{
    registry.clear();

    function paintHomeLights()
    {
        launchpad.lightPad(HomeTestPad, 16);
        launchpad.lightPad(TimePad, 20);
        launchpad.lightPad(ClearTestPad, 5);
        launchpad.lightPad(DebugPad, 13);
    }

    registry.registerNote(HomeTestPad, 
    {
        id: "home.test",
        label: "Home Test Button",
        run: async (message) => 
        {
            console.log("Home mode test");
            console.log(`Pressed note: ${message.note}`);

            paintHomeLights();
        }
    });

    registry.registerNote(TimePad, 
    {
        id: "home.time",
        label: "Show Current Time",
        run: async () => 
        {
            console.log(`Current time: ${new Date().toLocaleTimeString()}`);
        }
    });

    registry.registerNote(ClearTestPad, 
    {
        id: "home.clear-test",
        label: "Clear Test Pads",
        run: async () => 
        {
            console.log("Clearing test pads.");

            launchpad.clearPad(HomeTestPad);
            launchpad.clearPad(TimePad);
            launchpad.clearPad(ClearTestPad);
            launchpad.clearPad(DebugPad);
        }
    });

    registry.registerNote(DebugPad, 
    {
        id: "home.debug-placeholder",
        label: "Debug Mode Placeholder",
        run: async () => 
        {
            console.log("Debug mode");
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