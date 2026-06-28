const easymidi = require("easymidi");

const defaultPressColor = 16;
const defaultFlashDuration = 150;
const midiChannel = 0; 
const offColor = 0;

class Launchpad 
{

    inputName;
    outputName;
    input;
    output;
    padPressHandlers;
    padReleaseHandlers;
    controlPressHandlers;
    controlReleaseHandlers;

    constructor(inputName, outputName)
    {
        this.inputName = inputName;
        this.outputName = outputName;

        this.input = new easymidi.Input(inputName);
        this.output = new easymidi.Output(outputName);

        this.padPressHandlers = [];
        this.padReleaseHandlers = [];
        this.controlPressHandlers = [];
        this.controlReleaseHandlers = [];

        console.log(`Launchpad connected input: ${inputName} and output: ${outputName}`);

        //listen for pad presses
        this.input.on("noteon", (message) => 
        {
            if(message.velocity === 0)
            {
                this.padReleaseHandlers.forEach((handler) =>
                {
                    handler(message);
                });

                return;
            }

            //for testing
            console.log("NOTE ON:", message);

            this.padPressHandlers.forEach((handler) =>
            {
                handler(message);
            });
        });

        //listen for control button releases
        this.input.on("cc", (message) =>
        {
            if(message.value === 0)
            {
                this.controlReleaseHandlers.forEach((handler) =>
                {
                    handler(message);
                });

                return;
            }

            console.log("CONTROL CHANGE:", message);

            this.controlPressHandlers.forEach((handler) =>
            {
                handler(message);
            });
        });

    }





    onPadPress(handler)
    {
        this.padPressHandlers.push(handler);
    }

    onPadRelease(handler)
    {
        this.padReleaseHandlers.push(handler);
    }

    onControlPress(handler)
    {
        this.controlPressHandlers.push(handler);
    }

    onControlRelease(handler)
    {
        this.controlReleaseHandlers.push(handler);
    }





    lightPad(note, color = defaultPressColor) 
    {
        this.output.send("noteon", 
        {
            note,
            velocity: color,
            channel: midiChannel
        });
    }

    clearPad(note) 
    {
        this.lightPad(note, offColor);
    }

    flashPad(note, color = defaultPressColor, durationMs = defaultFlashDuration) 
    {
        this.lightPad(note, color);

        setTimeout(() => 
        {
            this.clearPad(note);
        }, durationMs);
    }
    
    lightControl(controller, color = defaultPressColor)
    {
        this.output.send("cc", 
        {
            controller,
            value: color,
            channel: midiChannel
        });
    }

    clearControl(controller)
    {
        this.lightControl(controller, offColor);
    }





    close()
    {
        this.input.close();
        this.output.close();
    }
}

module.exports =   
{
    Launchpad
};