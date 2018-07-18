const IndexDeploys= (createReactClass({
    componentDidMount() {
        $.getJSON("/api/v1/deploys.json", response => {
            this.setState({ deploys: response });
            this.setState({ loading: false });
        });
    },

    getInitialState() {
        return {
            deploys: [],
            loading: true,
        };
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
                            <NewDeploy/>
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