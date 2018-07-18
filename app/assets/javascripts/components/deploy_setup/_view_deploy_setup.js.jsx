const ViewDeploySetup = (createReactClass({
    render () {
        const ports = this.props.deploy_setup.ports.split(',').map((port, index) => {
            return (
                <li key={index}>
                    {port}
                </li>
            )
        });

        const deploy_setup_items = this.props.deploy_setup.deploy_setup_item.map((item, index) => {
            return (
                <li className="collection-item" key={index}>
                    <p className="title m-0"><strong>{item.environment_var.key}:</strong></p>
                    <p className="m-0">{item.environment_var.body}</p>
                </li>
            )
        });

        return (
            <div className="bordered p-2">
                <div className="row m-0">
                    { this.props.deploy_setup.ports !== '' &&
                        <div className="col s12 m6 p-1">
                            <strong className="ml-1">Ports: </strong>
                            <ul className="default-list ml-5">{ports}</ul>
                        </div>
                    }
                    <div className="col s12 m6 p-1">
                        <span className="ml-1">
                        <p className="m-0">
                            <strong>Restart Policy:</strong>
                        </p>
                        <p className="m-0">
                            {toTitleCase(this.props.deploy_setup.restart_policy.toString().split('_').join(' '))}
                        </p>
                        </span>
                    </div>
                </div>
                <ul className="collection">
                    {deploy_setup_items}
                </ul>
            </div>
        )
    }
}));