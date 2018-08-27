var AllEnvVars = (createReactClass({

    componentDidMount() {
        $('#modalEditEnvironmentVar').modal()
    },

    getInitialState() {
        return {
            environment_var: {
                'key': '',
                'body': '',
            },
            formEdit: null,
            loading: false
        };
    },

    handleDelete(id) {
        this.props.handleDelete(id);
    },

    handleEdit(environment_var) {
        this.setState({ loading: true});
        $.ajax({
            url: "/api/v1/environment_vars/" + environment_var._id.$oid,
            type: "PUT",
            data: { environment_var: environment_var },
            success: (environment_var) => {
                this.setState({ loading: false});
                notification.success('Environment var ' + environment_var.key +  ' edited');
                this.props.handleEdit(environment_var);
                this.setState({ editForm: null});
                $('#modalEditEnvironmentVar').modal('close');
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

    openEditEnvironmentModal(environment_var) {

        let env_var = Object.assign({}, environment_var);

        this.setState({ editForm:
                <FormEnvVar environment_var={env_var} title={"Edit Environment Var"} onSubmit={this.handleEdit}
                            onClose={this.closeEditModal} environment={this.props.environment} app={this.props.app}/>
        });

        $('#modalEditEnvironmentVar').modal('open');
    },

    closeEditModal() {
        this.setState({ editForm: null});
        $('#modalEditEnvironmentVar').modal('close');
    },

    render() {

        const environment_vars = this.props.environment_vars.map((environment_var) => {
            return (
                <tr key={environment_var._id.$oid}>
                    <td>{environment_var.key}</td>
                    <td className="column-big-text"><p>{environment_var.body}</p></td>
                    <td>
                        <button className="waves-effect waves-light btn blue" onClick={(e) => this.openEditEnvironmentModal(environment_var, e)}>
                            <i className="material-icons">create</i>
                        </button>
                        <button className="waves-effect waves-light btn red darken-4 ml-1"
                                onClick={this.handleDelete.bind(this, environment_var)}>
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
                <table className="responsive-table  striped standard-table">
                    <thead>
                    <tr>
                        <th>Key</th>
                        <th>Value</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {environment_vars}
                    </tbody>
                </table>
                <div id="modalEditEnvironmentVar" className="modal">
                    {this.state.editForm}
                </div>
            </div>
        )
    }
}));