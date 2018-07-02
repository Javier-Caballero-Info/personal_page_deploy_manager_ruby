const IndexEnvVars = (createReactClass({
    componentDidMount() {

        this.refs.deleteModal = null;

        $.getJSON("/api/v1/environment_vars.json", response => {
            this.setState({ environment_vars: response });
            this.setState({ loading: false });
        });
    },

    handleUpdateEnvironmentVar(environment_var) {
        const index = this.state.environment_vars.findIndex((obj => obj.id === environment_var.id));
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
            return environment_var.id !== id;
        });

        this.setState({ environment_vars: newEnvironmentVars });
    },

    confirmDelete() {
        this.setState({loadingRequest: true});
        $.ajax({
            url: `/api/v1/environment_vars/${this.environment_var.id}`,
            type: 'DELETE',
            success:() => {
                Alert.success('Environment var deleted');
                this.removeEnvironmentVarClient(this.environment_var.id);
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
            <div className="body">
                <Header/>
                <main>
                    <div className="container">

                        <h1 className="header">Environment Vars</h1>

                        {this.state.loadingRequest &&
                        <Loader/>
                        }

                        {!this.state.loading &&
                        <NewEnvVar handleSubmit={this.handleCreateEnvironmentVar}/>
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
                                         handleEdit={this.handleUpdateEnvironmentVar}/>
                        }

                        {!this.state.loading && this.state.environment_vars.length < 1 &&
                        <div className="card-panel yellow lighten-3 orange-text">
                            <h5 className="center m-0">No environment vars loaded.</h5>
                        </div>
                        }

                        <DeleteConfirmationMsg  ref={instance => { this.childDeletePopUp = instance; }} handleConfirm={this.confirmDelete} />

                    </div>
                </main>
                <Footer/>
            </div>
        )
    }
}));