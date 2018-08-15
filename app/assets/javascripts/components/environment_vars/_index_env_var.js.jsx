const IndexEnvVars = (createReactClass({
    componentDidMount() {

        this.refs.deleteModal = null;

        const env_id = this.props.environment ? this.props.environment._id.$oid : null;
        const app_id = this.props.app ? this.props.app._id.$oid : null;

        $.getJSON("/api/v1/environment_vars.json?environment=" + env_id + '&app=' + app_id , response => {
            this.setState({ environment_vars: response });
            this.setState({ loading: false });
        });
    },

    handleUpdateEnvironmentVar(environment_var) {
        const index = this.state.environment_vars.findIndex((obj => obj._id.$oid === environment_var._id.$oid));
        let newEnvironmentVars = this.state.environment_vars;

        newEnvironmentVars[index] = environment_var;

        this.setState({ environment_vars: newEnvironmentVars });
    },

    handleCreateEnvironmentVar(environment_var) {
        const newState = this.state.environment_vars.concat(environment_var);
        this.setState({ environment_vars: newState })
    },

    removeEnvironmentVarClient(id) {
        const newEnvironmentVars = this.state.environment_vars.filter((environment_var) => {
            return environment_var._id.$oid !== id;
        });

        this.setState({ environment_vars: newEnvironmentVars });
    },

    confirmDelete() {
        this.setState({loadingRequest: true});
        $.ajax({
            url: `/api/v1/environment_vars/${this.environment_var._id.$oid}`,
            type: 'DELETE',
            success:() => {
                notification.success('Environment var deleted');
                this.removeEnvironmentVarClient(this.environment_var._id.$oid);
                this.setState({loadingRequest: false});
            }
        });
    },

    handleDeleteEnvironmentVar(environment_var) {
        this.environment_var = environment_var;
        this.childDeletePopUp.show('¿Are you sure that you want to delete the environment var "' + environment_var.key + '"?');
    },

    getInitialState() {
        return {
            environment_vars: [],
            loading: true,
            loadingRequest: false
        };
    },

    render() {
        return (
                <div>
                    {this.state.loadingRequest &&
                    <Loader/>
                    }

                    {!this.state.loading &&
                    <NewEnvVar handleSubmit={this.handleCreateEnvironmentVar} environment={this.props.environment}
                               app={this.props.app}/>
                    }

                    {this.state.loading &&
                    <div className="card-panel">
                        <div className="progress m-0">
                            <div className="indeterminate"/>
                        </div>
                    </div>
                    }

                    {!this.state.loading && this.state.environment_vars.length > 0 &&
                    <AllEnvVars environment_vars={this.state.environment_vars} handleDelete={this.handleDeleteEnvironmentVar}
                                handleEdit={this.handleUpdateEnvironmentVar} environment={this.props.environment}
                                app={this.props.app}/>
                    }

                    {!this.state.loading && this.state.environment_vars.length < 1 &&
                    <div className="card-panel yellow lighten-3 orange-text">
                        <h5 className="center m-0">No environment vars loaded.</h5>
                    </div>
                    }

                    <DeleteConfirmationMsg  ref={instance => { this.childDeletePopUp = instance; }} handleConfirm={this.confirmDelete} />

                </div>
        )
    }
}));