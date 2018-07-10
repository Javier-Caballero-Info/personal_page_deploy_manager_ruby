const PortsDeploySetup = (createReactClass({
    render() {

        const ports = this.props.app.exposed_ports.split(',').map((p) => {
            return (
                <li key={p}>
                    <p className="deploy_setup_port_input">
                        <strong>{p} :</strong>
                    </p>
                    <div className="input-field inline ml-1">
                        <input type="number" placeholder={p} className="validate center"/>
                    </div>
                </li>
             );
        });

        return (
                <ul className="ml-5 default-list">
                    {ports}
                </ul>
        )
    }
}));