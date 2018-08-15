const RestartPolicyDeploySetup = (createReactClass({
    componentDidMount() {
        $('select').formSelect();
    },

    getInitialState() {
        return {
            loading: false,
            deploy_setup: this.props.deploy_setup
        };
    },

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        this.setState({loading: true});
        $.ajax({
            url: "/api/v1/deploy_setups/" + this.props.deploy_setup._id.$oid,
            type: "PUT",
            data: {deploy_setup: {
                    restart_policy: value
                }},
            success: (deploy_setup) => {
                notification.success('Deploy setup was updated successfully');
                this.setState({
                    loading: false,
                    deploy_setup: deploy_setup
                });
                $('select').formSelect();
            },
            error: () => {
                notification.danger('An error as occurred. Please try again.');
                this.setState({loading: false});
                $(target).formSelect();
            }
        });
    },

    render() {
        return (
            <div>
                {this.state.loading &&
                    <div className="progress"><div className="indeterminate"/></div>
                }
                {!this.state.loading &&
                    <div className="input-field col s12">
                        <select ref="restart_policy" onChange={this.handleChange} defaultValue={this.state.deploy_setup.restart_policy}>
                            <option value="null" disabled>Choose a policy</option>
                            <option value="">Never</option>
                            <option value="always">Always</option>
                            <option value="on-failure">On failure</option>
                            <option value="unless-stopped">Unless stopped</option>
                        </select>
                        <label>Restart Policy</label>
                    </div>
                }
            </div>
        )
    }
}));