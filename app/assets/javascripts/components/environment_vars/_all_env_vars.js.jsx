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
            url: "/api/v1/environment_vars/" + environment_var.id,
            type: "PUT",
            data: { environment_var: environment_var },
            success: (environment_var) => {
                this.setState({ loading: false});
                Alert.success('Environment var ' + environment_var.key +  ' edited');
                this.props.handleEdit(environment_var);
                this.setState({ editForm: null});
                $('#modalEditEnvironmentVar').modal('close');
            },
            error: (xhr) => {
                if(xhr.status === 422) {
                    const response = xhr.responseJSON;
                    Object.keys(response.errors).map((k) => {
                        Alert.danger(k.replace(/^\w/, c => c.toUpperCase()).replace('_', ' ') + ' ' + response.errors[k]);
                    });
                }
                if(xhr.status >= 500) {
                    Alert.danger('Something get wrong');
                }
                this.setState({loading: false});
            }
        });
    },

    openEditModal(environment_var) {

        let env_var = Object.assign({}, environment_var);

        this.setState({ editForm:
                <FormEnvVar environment_var={env_var} title={"Edit Environment Var"} onSubmit={this.handleEdit}
                                 onClose={this.closeEditModal}/>
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
                <tr key={environment_var.id}>
                    <td>{environment_var.key}</td>
                    <td>{environment_var.body}</td>
                    <td>
                        <button className="waves-effect waves-light btn blue" onClick={(e) => this.openEditModal(environment_var, e)}>
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
                <table className="responsive-table highlight striped standard-table">
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