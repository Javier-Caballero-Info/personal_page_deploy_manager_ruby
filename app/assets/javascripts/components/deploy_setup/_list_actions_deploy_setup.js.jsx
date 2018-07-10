const ListActionsDeploySetup = (createReactClass({

    onCreateDeploySetup(e){
        this.props.onCreateDeploySetup(e.target.value);
    },

    render() {
        return (
            <div className="row m-0">
                <div className="col s12 m6">
                    <button className="waves-effect waves-light btn col s12" onClick={this.onCreateDeploySetup}
                            value={null}>
                        Create a new setup
                    </button>
                </div>
                <div className="col s12 m6">
                    <button className="waves-effect waves-light btn col s12" onClick={this.onCreateDeploySetup}
                        value="from_app_version">
                        Copy from the last version
                    </button>
                </div>
            </div>
        )
    }
}));