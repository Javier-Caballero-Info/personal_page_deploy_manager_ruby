var AllApps = (createReactClass({
    componentDidMount() {
        $('#modalEditApp').modal()
    },

    getInitialState() {
        return {
            app: {
                'name': '',
                'docker_image': '',
                'exposed_ports': ''
            },
            formEdit: null,
            loading: false
        };
    },

    handleDelete(id) {
        this.props.handleDelete(id);
    },

    handleEdit(app) {
        this.setState({ loading: true});
        $.ajax({
            url: "/api/v1/apps/" + app.id,
            type: "PUT",
            data: { app: app },
            success: (app) => {
                this.setState({ loading: false});
                Alert.success('App ' + app.name +  ' edited');
                this.setState({ editForm: null});
                $('#modalEditApp').modal('close');
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

    openEditModal(app) {

        const tmp_app = Object.assign({}, app);

        this.setState({ editForm:
                <FormApp app={tmp_app} title={"Edit App"} onSubmit={this.handleEdit}
                                 onClose={this.closeEditModal}/>
        });
        $('#modalEditApp').modal('open');
    },

    closeEditModal() {
        this.setState({ editForm: null});
        $('#modalEditApp').modal('close');
    },

    render() {

        const apps = this.props.apps.map((app) => {
            return (
                <tr key={app.id}>
                    <td>{app.name}</td>
                    <td>{app.docker_image}</td>
                    <td>
                        <button className="waves-effect waves-light btn blue" onClick={(e) => this.openEditModal(app, e)}>
                            <i className="material-icons">create</i>
                        </button>
                        <button className="waves-effect waves-light btn red darken-4 ml-1"
                                onClick={this.handleDelete.bind(this, app)}>
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
                        <th>Docker Image</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {apps}
                    </tbody>
                </table>
                <div id="modalEditApp" className="modal">
                    {this.state.editForm}
                </div>
            </div>
        )
    }
}));