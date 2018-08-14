const IndexApps = (createReactClass({
    componentDidMount() {

        this.refs.deleteModal = null;

        $.getJSON("/api/v1/apps.json", response => {
            this.setState({ apps: response });
            this.setState({ loading: false });
        });
    },

    handleUpdateApp(app) {
        const index = this.state.apps.findIndex((obj => obj._id.$oid === app._id.$oid));
        let newApps = this.state.apps;

        newApps[index] = app;

        this.setState({ apps: newApps });
    },

    handleCreateApp(app) {
        const newState = this.state.apps.concat(app);
        this.setState({ apps: newState })
    },

    removeAppClient(id) {
        const newApps = this.state.apps.filter((app) => {
            return app._id.$oid !== id;
        });

        this.setState({ apps: newApps });
    },

    confirmDelete() {
        this.setState({loadingRequest: true});
        $.ajax({
            url: `/api/v1/apps/${this.state.app._id.$oid}`,
            type: 'DELETE',
            success:() => {
                Alert.success('App deleted');
                this.removeAppClient(this.state.app._id.$oid);
                this.setState({loadingRequest: false});
            }
        });
    },

    handleDeleteApp(app) {
        this.setState({app: app});
        this.childDeletePopUp.show('¿Are you sure that you want to delete the app "' + app.name + '"?');
    },

    getInitialState() {
        return {
            apps: [],
            app: null,
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

                        <h1 className="header">Apps</h1>

                        {this.state.loadingRequest &&
                        <Loader/>
                        }

                        {!this.state.loading &&
                        <NewApp handleSubmit={this.handleCreateApp}/>
                        }

                        {this.state.loading &&
                        <div className="card-panel">
                            <div className="progress m-0">
                                <div className="indeterminate"/>
                            </div>
                        </div>
                        }

                        {!this.state.loading && this.state.apps.length > 0 &&
                        <AllApps apps={this.state.apps} handleDelete={this.handleDeleteApp} handleEdit={this.handleUpdateApp}/>
                        }

                        {!this.state.loading && this.state.apps.length < 1 &&
                        <div className="card-panel yellow lighten-3 orange-text">
                            <h5 className="center m-0">No apps loaded.</h5>
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