const IndexDeploys= (createReactClass({

    loadDeploys () {
        this.setState({ loading: true });
        $.getJSON("/api/v1/deploys.json", response => {
            this.setState({ deploys: response });
            this.setState({ loading: false });
        });
    },

    componentDidMount() {
        this.loadDeploys();
        const self = this;
        setInterval(function() {
            if (!self.state.modal_is_showing) {
                self.loadDeploys();
            }
        }, 10 * 1000);
    },

    getInitialState() {
        return {
            deploys: [],
            loading: true,
            modal_is_showing: false
        };
    },

    onModalShow () {
        this.setState({modal_is_showing: true});
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

    render() {
        return (
            <div className="body">
                <Header/>
                <main>
                    <div className="container">
                        <h1 className="header">Deploys</h1>

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
                            <AllDeploys deploys={this.state.deploys}/>
                        }

                        {!this.state.loading && this.state.deploys.length < 1 &&
                        <div className="card-panel yellow lighten-3 orange-text">
                            <h5 className="center m-0">No deploys loaded.</h5>
                        </div>
                        }
                        
                    </div>
                </main>
                <Footer/>
            </div>
        )
    }
}));