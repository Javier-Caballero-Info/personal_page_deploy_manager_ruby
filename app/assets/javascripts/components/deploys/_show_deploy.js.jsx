const ShowDeploy = (createReactClass({

    onClose () {
        this.props.onClose();
    },

    render () {

        const deploy = this.props.deploy;

        console.log(deploy);

        let deploy_apps = null;
        if (deploy.deploy_app) {
            deploy_apps = deploy.deploy_app.map((deploy_app, index) => {
                return <ShowDeployApp deploy_app={deploy_app} key={index}/>
            });
        }

        return (
            <div>
                <div className="modal-content">
                    <h4 className="center-align">
                        Deploy - {deploy.name}
                        <br/>
                        <small> Environment - {deploy.environment.name} </small>
                    </h4>
                    <hr/>
                    {deploy_apps}
                </div>
                <div className="modal-footer">
                    <button type="button" className="waves-effect white black-text btn" onClick={this.onClose}>
                        Close
                    </button>
                </div>
            </div>
        );
    }
}));