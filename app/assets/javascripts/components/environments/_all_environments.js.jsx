var AllEnvironments = (createReactClass({

    componentDidMount() {
        $('#modalEditEnvironment').modal()
    },

    getInitialState() {
        return {
            environment: {
                'name': '',
                'portainer_url': ''
            },
            formEdit: null,
            loading: false
        };
    },

    handleDelete(id) {
        this.props.handleDelete(id);
    },

    handleEdit(environment) {
        this.setState({ loading: true});
        $.ajax({
            url: "/api/v1/environments/" + environment.id,
            type: "PUT",
            data: { environment: environment },
            success: (environment) => {
                this.setState({ loading: false});
                Alert.success('Environment ' + environment.name +  ' edited');
                this.setState({ editForm: null});
                $('#modalEditEnvironment').modal('close');
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

    openEditModal(environment) {
        this.setState({ editForm:
                <FormEnvironment environment={environment} title={"Edit Environment"} onSubmit={this.handleEdit}
                                 onClose={this.closeEditModal}/>
        });
        $('#modalEditEnvironment').modal('open');
    },

    closeEditModal() {
        this.setState({ editForm: null});
        $('#modalEditEnvironment').modal('close');
    },

    render() {

        const environments = this.props.environments.map((environment) => {
            return (
                <tr key={environment.id}>
                    <td>{environment.name}</td>
                    <td>{environment.portainer_url}</td>
                    <td>
                        <button className="waves-effect waves-light btn blue" onClick={(e) => this.openEditModal(environment, e)}>
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
                <table className="responsive-table highlight striped standard-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Portainer Url</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {environments}
                    </tbody>
                </table>
                <div id="modalEditEnvironment" className="modal">
                    {this.state.editForm}
                </div>
            </div>
        )
    }
}));