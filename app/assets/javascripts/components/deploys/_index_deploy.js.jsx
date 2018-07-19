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
    },

    getInitialState() {
        return {
            deploys: [],
            loading: true,
        };
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
                            <NewDeploy handleSubmit={this.handleCreateDeploy}/>
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