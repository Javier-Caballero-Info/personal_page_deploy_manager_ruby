var AllApps = (createReactClass({
    componentDidMount() {
        $.getJSON("/api/v1/environments.json", response => {
            const environment_items = response.map((environment) => {
                return (
                    <li key={environment.id}>
                        <a onClick={(e) => this.openEnvironmentVarsModal(environment, e)}>
                            <i className="material-icons">extension</i>{environment.name}
                        </a>
                    </li>
                )
            });

            this.setState({environment_items: environment_items});

        });

        $('#modalEditApp').modal();
        $('#modalListEnvVars').modal();

        $('.dropdown-trigger').dropdown({
            constrainWidth: false,
            coverTrigger: false
        });
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

    openEnvironmentVarsModal(environment){
        this.setState({ listEnvVars:
                <ModalIndexEnvVars title={"Environment Vars - App: " + this.state.app.name + ' - Environment: ' + environment.name}
                                   app={this.state.app} onClose={this.closeEnvironmentVarsModal} environment={environment}/>
        });

        $('#modalListEnvVars').modal('open');

    },

    closeEnvironmentVarsModal() {
        this.setState({ listEnvVars: null});
        $('#modalListEnvVars').modal('close');
    },

    setApp(app) {
        this.setState({app: app});
    },

    render() {

        const apps = this.props.apps.map((app) => {
            return (
                <tr key={app.id}>
                    <td>{app.name}</td>
                    <td>{app.docker_image}</td>
                    <td>
                        <button className="waves-effect waves-light btn deep-purple dropdown-trigger"
                                data-target='dropdown1' onClick={(e) => this.setApp(app, e)}>
                            <i className="material-icons"> style </i> <i
                            className="material-icons"> arrow_drop_down </i>
                        </button>
                        <button className="waves-effect waves-light btn blue ml-1" onClick={(e) => this.openEditModal(app, e)}>
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
                <table className="responsive-table highlight striped standard-table-4">
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
                <ul id='dropdown1' className='dropdown-content'>
                    <li className="disabled"><a>Environment vars by environment</a></li>
                    <li className="divider" tabIndex="-1"/>
                    {this.state.environment_items}
                </ul>
                <div id="modalEditApp" className="modal">
                    {this.state.editForm}
                </div>
                <div id="modalListEnvVars" className="modal modal-big">
                    {this.state.listEnvVars}
                </div>
            </div>
        )
    }
}));