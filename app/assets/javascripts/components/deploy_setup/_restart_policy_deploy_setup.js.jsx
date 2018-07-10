const RestartPolicyDeploySetup = (createReactClass({
    componentDidMount() {
        $('select').formSelect();
    },

    render() {
        return (
            <div className="input-field col s12">
                <select defaultValue="null">
                    <option value="null" disabled>Choose a policy</option>
                    <option value="never">Never</option>
                    <option value="always">Always</option>
                    <option value="on_failure">On failure</option>
                    <option value="unless_stopped">Unless stopped</option>
                </select>
                <label>Restart Policy</label>
            </div>
        )
    }
}));