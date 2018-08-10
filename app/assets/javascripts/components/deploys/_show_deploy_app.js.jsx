const ShowDeployApp = (createReactClass({

    render () {

        const deploy_app = this.props.deploy_app;

        const ports = deploy_app.ports.split(',').map((port, index)=>{
            return <li key={index}>{port}</li>;
        });

        let restart_policy = 'Never';

        if (deploy_app.restart_policy) {
            restart_policy = toTitleCase(deploy_app.restart_policy.toString().split('_').join(' '));
        }

        const deploy_app_environment_var = deploy_app.deploy_app_environment_var.map((item, index) => {
            return (
                <li className="collection-item" key={index}>
                    <p className="title m-0"><strong>{item.key}:</strong></p>
                    <p className="m-0">{item.value}</p>
                </li>
            )
        });

        return (
            <div className="card-panel">
                <div className="card-panel">
                    <h5>
                        <strong>App:</strong> {deploy_app.app.name}
                    </h5>
                    <h5>
                        <strong>Version:</strong> {deploy_app.app_version.name}
                    </h5>
                    <h6 className="bordered center grey-text p-1 border-radius">
                        {deploy_app.app.docker_image}:{deploy_app.app_version.name}
                    </h6>
                </div>
                <div className="card-panel">
                    { ports.length > 0 &&
                        <div>
                            <h6><strong>Ports:</strong></h6>
                            <ul className="default-list ml-3">
                                {ports}
                            </ul>
                        </div>
                    }
                    <h6><strong>Restart Policy:</strong> {restart_policy}</h6>
                </div>

                {deploy_app_environment_var.length > 0 &&
                    <div className="card-panel">
                        <ul className="collection">
                            {deploy_app_environment_var}
                        </ul>
                    </div>
                }
            </div>
        );
    }

}));