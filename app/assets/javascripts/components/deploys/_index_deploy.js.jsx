const IndexDeploys= (createReactClass({

    loadDeploys () {
        this.setState({ loading: true });
        $.getJSON("/api/v1/deploys.json", response => {
            this.setState({ deploys: response });
            this.setState({ loading: false });
        });
    },

    componentDidMount() {
        $('#modalShowDeploy').modal();
        this.loadDeploys();
        const self = this;
        setInterval(function() {
            if (!self.state.modal_is_showing) {
                self.loadDeploys();
            }
        }, 60 * 1000);
    },

    getInitialState() {
        return {
            deploys: [],
            childDeletePopUp: null,
            showDeployView: null,
            loading: true,
            loadingRequest: false,
            modal_is_showing: false
        };
    },

    onModalShow () {
        this.setState({modal_is_showing: true});
    },

    handleShowDeploy (deploy) {
        this.setState({
            showDeployView: <ShowDeploy deploy={deploy} onClose={this.closeShowModal}/>,
            modal_is_showing: true
        });

        $('#modalShowDeploy').modal('open');
    },

    closeShowModal () {
        $('#modalShowDeploy').modal('close');
    },

    handleDeleteDeploy (deploy) {
        this.setState({deploy: deploy});
        this.childDeletePopUp.show('¿Are you sure that you want to delete the draft deploy "' + deploy.name + '"?');
    },

    handleUpdateDeploy(deploy) {
        const index = this.state.deploys.findIndex((obj => obj.id === deploy.id));
        let newDeploys = this.state.deploys;

        newDeploys[index] = deploy;

        this.setState({ deploys: newDeploys });
    },

    handleCreateDeploy(deploy) {
        /*
        const newState = this.state.deploys.concat(deploy);
        this.setState({ deploys: newState })
        */
        this.loadDeploys();
        this.setState({modal_is_showing: false});
    },

    confirmDelete() {
        this.setState({loadingRequest: true});
        $.ajax({
            url: `/api/v1/deploys/${this.state.deploy.id}`,
            type: 'DELETE',
            success:() => {
                Alert.success('Draft deploy deleted');
                this.setState({loadingRequest: false});
                this.loadDeploys();
            },
            error: (xhr) => {
                if(xhr.status === 400) {
                    Alert.warning('The selected deploy is not draft');
                    this.setState({loadingRequest: false});
                    this.loadDeploys();
                }
            }
        });
    },

    render() {
        return (
            <div className="body">
                <Header/>
                <main>
                    <div className="container">
                        <h1 className="header">Deploys</h1>

                        {this.state.loadingRequest &&
                        <Loader/>
                        }

                        {this.state.loading &&
                        <div className="card-panel">
                            <div className="progress m-0">
                                <div className="indeterminate"/>
                            </div>
                        </div>
                        }

                        {!this.state.loading &&
                            <div className="row">
                                <NewDeploy handleSubmit={this.handleCreateDeploy} onModalShow={this.onModalShow}/>
                                <button className="waves-effect waves-light btn blue right" onClick={this.loadDeploys} >
                                    Reload <i className="material-icons left">autorenew</i>
                                </button>
                            </div>
                        }

                        {!this.state.loading && this.state.deploys.length > 0 &&
                            <AllDeploys deploys={this.state.deploys} handleDelete={this.handleDeleteDeploy}
                                        handleShow={this.handleShowDeploy}/>
                        }

                        {!this.state.loading && this.state.deploys.length < 1 &&
                        <div className="card-panel yellow lighten-3 orange-text">
                            <h5 className="center m-0">No deploys loaded.</h5>
                        </div>
                        }

                        <DeleteConfirmationMsg  ref={instance => { this.childDeletePopUp = instance; }} handleConfirm={this.confirmDelete} />

                    </div>
                    <div id="modalShowDeploy" className="modal modal-big">
                        {this.state.showDeployView}
                    </div>
                </main>
                <Footer/>
            </div>
        )
    }
}));