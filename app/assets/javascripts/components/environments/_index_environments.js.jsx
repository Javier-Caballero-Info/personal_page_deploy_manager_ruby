const IndexEnvironments = (createReactClass({

    componentDidMount() {

        this.refs.deleteModal = null;

        $.getJSON("/api/v1/environments.json", response => {
            this.setState({ environments: response });
            this.setState({ loadingList: false });
        });
    },

    handleCreateEnvironment(environment) {
        const newState = this.state.environments.concat(environment);
        this.setState({ environments: newState })
    },

    removeEnvironmentClient(id) {
        const newEnvironments = this.state.environments.filter((environment) => {
            return environment.id !== id;
        });

        this.setState({ environments: newEnvironments });
    },

    confirmDelete() {
        this.setState({loadingRequest: true});
        $.ajax({
            url: `/api/v1/environments/${this.environment.id}`,
            type: 'DELETE',
            success:() => {
                Alert.success('Environment deleted');
                this.removeEnvironmentClient(this.environment.id);
                this.setState({loadingRequest: false});
            }
        });
    },

    handleDeleteEnvironment(environment) {
        this.environment = environment;
        this.childDeletePopUp.show('¿Are you sure that you want to delete the environment "' + environment.name + '"?');
    },

    getInitialState() {
        return {
            environments: [],
            loadingList: true,
            loadingRequest: false
        };
    },

    render() {
        return (
            <div className="body">
                <Header/>
                <main>
                    <div className="container">

                        <h1 className="header">Environments</h1>

                        {this.state.loadingRequest &&
                            <Loader/>
                        }

                        {!this.state.loadingList &&
                            <NewEnvironment handleSubmit={this.handleCreateEnvironment}/>
                        }

                        {this.state.loadingList &&
                            <div className="card-panel">
                                <div className="progress m0">
                                    <div className="indeterminate"/>
                                </div>
                            </div>
                        }

                        {!this.state.loadingList && this.state.environments.length > 0 &&
                            <AllEnvironments environments={this.state.environments} handleDelete={this.handleDeleteEnvironment}
                                         handleEdit={this.handleEditEnvironment}/>
                        }

                        {!this.state.loadingList && this.state.environments.length < 1 &&
                            <div className="card-panel yellow lighten-3 orange-text">
                                <h5 className="center m0">No environments loaded.</h5>
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