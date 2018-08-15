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
        $('#modalEditDeploy').modal();
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

    setFlagModalShow (flag) {
        this.setState({modal_is_showing: flag});
    },

    handleShowDeploy (deploy) {
        this.setState({
            showDeployView: <ShowDeploy deploy={deploy} onClose={this.closeShowModal}/>,
            modal_is_showing: true
        });

        $('#modalShowDeploy').modal('open');
    },

    closeShowModal () {
        this.setState({
            showDeployView: null,
            modal_is_showing: false
        });
        $('#modalShowDeploy').modal('close');
    },

    handleDeleteDeploy (deploy) {
        this.setState({deploy: deploy});
        this.childDeletePopUp.show('¿Are you sure that you want to delete the draft deploy "' + deploy.name + '"?');
    },

    handleUpdateDeploy(deploy) {
        this.setState({loadingRequest: true});

        $.ajax({
            url: "/api/v1/deploys/" + deploy.id,
            type: "PUT",
            data: {deploy: deploy},
            success: (deploy) => {
                Alert.success('Deploy app saved');
                this.loadDeploys();
                this.setState({loadingRequest: false});
            },
            error: (xhr) => {
                if (xhr.status === 400) {
                    Alert.warning('Actually exists a deploy in progress for the same environment');
                    this.loadDeploys();
                }
                if (xhr.status === 422) {
                    const response = xhr.responseJSON;
                    Object.keys(response.errors).map((k) => {
                        Alert.danger(k.replace(/^\w/, c => c.toUpperCase()).replace('_', ' ') + ' ' + response.errors[k]);
                    });
                }
                if (xhr.status >= 500) {
                    Alert.danger('Something get wrong');
                }
                this.setState({loadingRequest: false});
            }
        });
    },

    handleCreateDeploy() {
        this.loadDeploys();
        this.setState({modal_is_showing: false});
    },

    confirmDelete() {
        this.setState({loadingRequest: true});
        $.ajax({
            url: `/api/v1/deploys/${this.state.deploy._id.$oid}`,
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
                                <NewDeploy handleSubmit={this.handleCreateDeploy} setFlagModalShow={this.setFlagModalShow}/>
                                <button className="waves-effect waves-light btn blue right" onClick={this.loadDeploys} >
                                    Reload <i className="material-icons left">autorenew</i>
                                </button>
                            </div>
                        }

                        {!this.state.loading && this.state.deploys.length > 0 &&
                            <AllDeploys deploys={this.state.deploys} handleDeleteDeploy={this.handleDeleteDeploy}
                                        handleShow={this.handleShowDeploy}  setFlagModalShow={this.setFlagModalShow}
                                        handleUpdateDeploy={this.handleUpdateDeploy}/>
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