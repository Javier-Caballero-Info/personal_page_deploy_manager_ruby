const PortsDeploySetup = (createReactClass({

    getInitialState() {
        return {
            loading: false,
            is_edited: false,
            deploy_setup: this.props.deploy_setup
        };
    },

    handleChange() {
        this.setState({is_edited: true});
    },

    saveChanges() {
        this.setState({loading: true});

        let ports = this.props.app.exposed_ports.split(',').map((p) => {
            return p + ':' + this.refs['port_'+ p].value;
        });

        $.ajax({
            url: "/api/v1/deploy_setups/" + this.props.deploy_setup._id.$oid,
            type: "PUT",
            data: {deploy_setup: {
                    ports: ports.join(',')
                }},
            success: (deploy_setup) => {
                Alert.success('Deploy setup was updated successfully');
                this.setState({
                    loading: false,
                    deploy_setup: deploy_setup,
                    is_edited: false
                });
            },
            error: () => {
                Alert.danger('An error as occurred. Please try again.');
                this.setState({loading: false, is_edited: false});
            }
        });
    },

    render() {

        let values = this.state.deploy_setup.ports.split(',').map((p) => {
            return p.split(':')[1]
        });

        const ports = this.props.app.exposed_ports.split(',').map((p, i) => {

            return (
                <li key={p}>
                    <p className="deploy_setup_port_input">
                        <strong>{p} :</strong>
                    </p>
                    <div className="input-field inline ml-1">
                        <input type="number" ref={'port_' + p} placeholder={p} className="validate center" name={p}
                               onChange={this.handleChange} defaultValue={values[i]}/>
                    </div>
                </li>
             );
        });

        return (
                <div>
                    <h6 className="header">Ports</h6>
                    {this.state.loading &&
                        <div className="progress"><div className="indeterminate"/></div>
                    }
                    {!this.state.loading &&
                        <ul className="ml-5 default-list">
                            {ports}
                        </ul>
                    }
                    {!this.state.loading && this.state.is_edited &&
                        <a className="waves-effect waves-light btn btn-block" onClick={this.saveChanges}>Save changes</a>
                    }
                </div>
        )
    }
}));