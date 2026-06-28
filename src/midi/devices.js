const easymidi = require("easymidi");

// gets the chosen input and output device names for the Launchpad, if they exist
function listDevices() 
{
    const inputs = easymidi.getInputs();
    const outputs = easymidi.getOutputs();

    console.log("\nAvailable Inputs:", inputs);
    console.log("Available Outputs:", outputs, "\n");

    let inputName;
    let outputName;

    inputs.forEach((inputDevice) => 
    {
        if (inputDevice.toLowerCase().includes("launchpad")) 
        {
            inputName = inputDevice;
        }
    });

    outputs.forEach((outputDevice) => 
    {
        if (outputDevice.toLowerCase().includes("launchpad")) 
        {
            outputName = outputDevice;
        }
    });

    console.log("Chosen Input:", inputName || "No Launchpad Input Found");
    console.log("Chosen Output:", outputName + "\n" || "No Launchpad Output Found \n");

    return 
    {
        inputName,
        outputName
    };
}

//to test
if (require.main === module) 
{
    listDevices();
}

module.exports = 
{
    listDevices
};