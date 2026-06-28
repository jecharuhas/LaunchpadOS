class ActionRegistry 
{
    actions;

    constructor()
    {
        this.actions = new Map();
    }

    clear()
    {
        this.actions.clear();
    }

    registerNote(note, action)
    {
        const key = `note:${note}`;
        this.actions.set(key, action);
    }

    registerControl(controller, action)
    {
        const key = `cc:${controller}`;
        this.actions.set(key, action);
    }

    async triggerNote(note, message)
    {
        const key = `note:${note}`;
        await this.trigger(key, message);
    }

    async triggerControl(controller, message)
    {
        const key = `cc:${controller}`;
        await this.trigger(key, message);
    }

    async trigger(key, message)
    {
        const action = this.actions.get(key);

        if(!action)
        {
            console.log(`No action mapped to ${key}`);
            return;
        }

        console.log(`Running action: ${action.label}`);

        await action.run(message);
    }

    listActions()
    {
        return Array.from(this.actions.entries()).map(([key, action]) => 
        {
            return {
                key,
                id: action.id,
                label: action.label
            };
        });
    }
}

module.exports = 
{
    ActionRegistry
};