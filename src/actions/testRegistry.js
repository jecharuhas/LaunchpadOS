const { ActionRegistry } = require("./registry");

const registry = new ActionRegistry();

registry.registerNote(81, 
{
    id: "test.hello",
    label: "Say Hello",
    run: async (message) => 
    {
        console.log("Pressed note:", message.note);
    }
});

registry.registerControl(104, 
{
    id: "test.control",
    label: "Top Control Test",
    run: async (message) => 
    {
        console.log("Top control pressed:", message.controller);
    }
});

console.table(registry.listActions());

registry.triggerNote(81, 
{
    note: 81,
    velocity: 127,
    channel: 0
});

registry.triggerControl(104, 
{
    controller: 104,
    value: 127,
    channel: 0
});