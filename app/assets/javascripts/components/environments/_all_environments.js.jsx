const AllEnvironments = (createReactClass({

    componentDidMount() {
        $('#modalEditEnvironment').modal();
        $('#modalListEnvVars').modal();
    },

    getInitialState() {
        return {
            environment: {
                'name': '',
                'endpoint_id': '',
                'portainer_url': ''
            },
            formEdit: null,
            listEnvVars: null,
            loading: false
        };
    },

    handleDelete(id) {
        this.props.handleDelete(id);
    },

    handleEdit(environment) {
        this.setState({ loading: true});
        $.ajax({
            url: "/api/v1/environments/" + environment._id.$oid,
            type: "PUT",
            data: { environment: environment },
            success: (environment) => {
                this.setState({ loading: false});
                notification.success('Environment ' + environment.name +  ' edited');
                this.props.handleEdit(environment);
                this.setState({ editForm: null});
                $('#modalEditEnvironment').modal('close');
            },
            error: (xhr) => {
                if(xhr.status === 422) {
                    const response = xhr.responseJSON;
                    Object.keys(response.errors).map((k) => {
                        notification.danger(k.replace(/^\w/, c => c.toUpperCase()).replace('_', ' ') + ' ' + response.errors[k]);
                    });
                }
                if(xhr.status >= 500) {
                    notification.danger('Something get wrong');
                }
                this.setState({loading: false});
            }
        });
    },

    openEditEnvironmentModal(environment) {

        let env = Object.assign({}, environment);

        this.setState({ editForm:
                <FormEnvironment environment={env} title={"Edit Environment"} onSubmit={this.handleEdit}
                                 onClose={this.closeEditModal}/>
        });

        $('#modalEditEnvironment').modal('open');
    },

    closeEditModal() {
        this.setState({ editForm: null});
        $('#modalEditEnvironment').modal('close');
    },

    openEnvironmentVarsModal(environment){

        this.setState({ listEnvVars:
                <ModalIndexEnvVars title={"Environment Vars - Environment: " + environment.name}
                                   onClose={this.closeEnvironmentVarsModal} environment={environment}/>
        });

        $('#modalListEnvVars').modal('open');

    },

    closeEnvironmentVarsModal() {
        this.setState({ listEnvVars: null});
        $('#modalListEnvVars').modal('close');
    },

    render() {

        const environments = this.props.environments.map((environment) => {
            return (
                <tr key={environment._id.$oid}>
                    <td>{environment.name}</td>
                    <td>{environment.portainer_url}</td>
                    <td>{environment.endpoint_id}</td>
                    <td>
                        <button className="waves-effect waves-light btn deep-purple" onClick={(e) => this.openEnvironmentVarsModal(environment, e)}>
                            <i className="material-icons">extension</i>
                        </button>
                        <button className="waves-effect waves-light btn blue ml-1" onClick={(e) => this.openEditEnvironmentModal(environment, e)}>
                            <i className="material-icons">create</i>
                        </button>
                        <button className="waves-effect waves-light btn red darken-4 ml-1"
                           onClick={this.handleDelete.bind(this, environment)}>
                            <i className="material-icons">delete</i>
                        </button>
                    </td>
                </tr>
            )
        });

        return(

            <div className="card-panel">
                {this.state.loading &&
                   <Loader/>
                }
                <table className="responsive-table  striped standard-table-3">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Portainer Url</th>
                        <th>Endpoint</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                        {environments}
                    </tbody>
                </table>
                <div id="modalEditEnvironment" className="modal">
                    {this.state.editForm}
                </div>
                <div id="modalListEnvVars" className="modal modal-big">
                    {this.state.listEnvVars}
                </div>
            </div>
        )
    }
}));