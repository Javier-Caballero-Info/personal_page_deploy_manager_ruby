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
        $('#modalListAppVersions').modal();
        $('#modalDeploySetup').modal();

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
            appVersions: null,
            deploySetup: null,
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
                this.props.handleEdit(app);
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

    openNewModal(app) {

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

    openAppVersionModal(app) {
        this.setState({appVersions:
            <ModalIndexAppVersion title={"Versions - App: " + app.name} app={app} onClose={this.closeAppVersionModal}
                onOpenDeploySetupModal={this.openDeploySetupModal}/>
        });
        $('#modalListAppVersions').modal('open');
    },

    closeAppVersionModal() {
        this.setState({ appVersions: null});
        $('#modalListAppVersions').modal('close');
    },

    openDeploySetupModal(app, app_version) {

        this.closeAppVersionModal();

        this.setState({deploySetup:
            <ModalIndexDeploySetup title={"Deploy Setup - App: " + app.name} app={app} version={app_version}
                                   onClose={this.closeDeploySetupModal}/>
        });

        setTimeout(function(){
            $('#modalDeploySetup').modal('open');
        }, 300);

    },

    closeDeploySetupModal() {
        this.setState({ deploySetup: null});
        $('#modalDeploySetup').modal('close');
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
                        <button className="waves-effect waves-light btn green" onClick={(e) => this.openAppVersionModal(app, e)}>
                            <i className="material-icons">local_offer</i>
                        </button>
                        <button className="waves-effect waves-light btn purple accent-4 ml-1"
                                onClick={(e) => this.openDeploySetupModal(app, null, e)}>
                            <i className="material-icons">settings</i>
                        </button>
                        <button className="waves-effect waves-light btn deep-purple dropdown-trigger ml-1"
                                data-target='env_var_dropdown' onClick={(e) => this.setApp(app, e)}>
                            <i className="material-icons"> style </i> <i
                            className="material-icons">arrow_drop_down</i>
                        </button>
                        <button className="waves-effect waves-light btn blue ml-1" onClick={(e) => this.openNewModal(app, e)}>
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
                <table className="responsive-table  striped standard-table-6">
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
                <ul id='env_var_dropdown' className='dropdown-content'>
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
                <div id="modalListAppVersions" className="modal modal-tiny">
                    {this.state.appVersions}
                </div>
                <div id="modalDeploySetup" className="modal modal-big">
                    {this.state.deploySetup}
                </div>
            </div>
        )
    }
}));