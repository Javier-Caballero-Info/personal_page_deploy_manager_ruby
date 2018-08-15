const ShowDeploy = (createReactClass({

    componentDidMount() {
        $.getJSON("/api/v1/deploys/" + this.props.deploy._id.$oid + ".json", response => {
            this.setState({deploy: response});
        });
    },

    getInitialState() {
        return {
            deploy: null
        };
    },

    onClose () {
        this.props.onClose();
    },

    render () {

        const deploy = this.state.deploy;

        let deploy_apps = null;

        if (deploy && deploy.deploy_app) {
            deploy_apps = deploy.deploy_app.map((deploy_app, index) => {
                return <ShowDeployApp deploy_app={deploy_app} key={index}/>
            });
        }

        let deploy_info = null;

        if (deploy){
            deploy_info = <div className="modal-content">
                <h4 className="center-align">
                    Deploy - {deploy.name}
                    <br/>
                    <small> Environment - {deploy.environment.name} </small>
                </h4>
                <hr/>
                {deploy_apps}
            </div>
        }

        return (
            <div>
                { deploy_info == null &&
                <div className="modal-content">
                    <div className="card-panel">
                        <div className="progress m-0">
                            <div className="indeterminate"/>
                        </div>
                    </div>
                </div>
                }
                { deploy_info != null && deploy_info}
                <div className="modal-footer">
                    <button type="button" className="waves-effect white black-text btn" onClick={this.onClose}>
                        Close
                    </button>
                </div>
            </div>
        );
    }
}));