const ListActionsDeploySetup = (createReactClass({
    render() {
        return (
            <div className="row m-0">
                <button className="waves-effect waves-light btn col s12 mb-1">
                    Create a new setup
                </button>
                <button className="waves-effect waves-light btn col s12 mb-1">
                    Copy from other environment
                </button>
                <button className="waves-effect waves-light btn col s12">
                    Copy from the before version
                </button>
            </div>
        )
    }
}));