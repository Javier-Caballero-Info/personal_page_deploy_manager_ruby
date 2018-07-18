const FormDeploy = (createReactClass({

    componentDidMount() {
        $.getJSON("/api/v1/environments.json", response => {
            const environment_items_select= response.map((environment) => {
                return (
                    <option key={environment.id} value={environment.id}>{environment.name}</option>
                )
            });

            this.setState(
                {
                    environment_items_select: environment_items_select,
                    loading_environments: false
                }, () => {
                    $('select').formSelect();
                }
            );

        });

        $.getJSON("/api/v1/apps.json", response => {
            this.setState(
                {
                    apps: response,
                    loading_apps: false
                }
            );
        });
    },

    onSubmit(){
        // this.props.onSubmit(this.state.deploy);
    },

    onReset() {
        /*
        this.refs.name.value = '';
        this.refs.name.className = 'validate';

        this.refs.portainer_url.value = '';
        this.refs.portainer_url.className = 'validate';
        */
    },

    onClose(){
        this.onReset();
        this.props.onClose();
    },

    getInitialState: function() {
        return {
            deploy: this.props.deploy,
            environment_id: null,
            environments: [],
            deploy_apps: [],
            deploy_apps_html: [],
            apps: [],
            selected_apps_ids: [],
            loading_environments: true,
            loading_apps: true,
            formValid: true
        };
    },

    validateForm() {
        this.setState({formValid: true});
    },

    onEnvironmentChange () {
        this.setState({
            deploy_apps: [],
            deploy_apps_html: [],
            environment_id: this.refs.environment.value
        });
    },

    addDeployApp() {
        let deploy_apps = this.state.deploy_apps;
        let deploy_apps_html = this.state.deploy_apps_html;

        if (deploy_apps.length < this.state.apps.length) {
            this.setState({
                deploy_apps: [],
                deploy_apps_html: []
            });

            const deploy_app = {
                app_id: "",
                app_version_id: "",
                deploy_setup_id: null,
                deploy_setup: null,
            };

            deploy_apps.push(deploy_app);

            const index = deploy_apps_html.length;

            deploy_apps_html.push(
                        <DeployAppItem apps={this.state.apps} deploy_app={deploy_app} index={index} key={index}
                                       onAppChange={this.onAppChange} handleDeleteDeployApp={this.handleDeleteDeployApp}
                                        environment_id={this.state.environment_id} onAppVersionChange={this.onAppVersionChange}
                                       setDeploySetup={this.setDeploySetup}/>
            );

            this.setState({
                deploy_apps: deploy_apps,
                deploy_apps_html: deploy_apps_html
            });

        } else {
            Alert.warning("You can't add more apps.");
        }
    },

    handleDeleteDeployApp (index) {
        let deploy_apps = Object.assign([], this.state.deploy_apps);
        let deploy_apps_html = [];
        this.setState({
            deploy_apps: [],
            deploy_apps_html: null
        }, () => {
            deploy_apps = deploy_apps.filter((_, i) => {
                return i !== index;
            });
            deploy_apps_html = deploy_apps.map((deploy_app, index) => {
                return (
                    <DeployAppItem apps={this.state.apps} deploy_app={deploy_app} index={index} key={index}
                                   onAppChange={this.onAppChange} handleDeleteDeployApp={this.handleDeleteDeployApp}
                                   environment_id={this.state.environment_id} onAppVersionChange={this.onAppVersionChange}
                                   setDeploySetup={this.setDeploySetup}/>
                );
            });
            this.setState({
                deploy_apps: deploy_apps,
                deploy_apps_html: deploy_apps_html
            }, () => {
                this.setAppIdsTaken();
            });
        });
    },

    onAppChange (index, app_id) {
        const default_result = true;
        let deploy_apps = this.state.deploy_apps;
        this.setState({deploy_apps: []});
        if (!this.state.selected_apps_ids.includes(app_id)) {
            deploy_apps[index].app_id = app_id;
        } else {
            if (this.state.deploy_apps[index].app_id !== app_id) {
                deploy_apps[index].app_id = '';
                Alert.danger("App already selected");
                this.setState({deploy_apps: deploy_apps}, () => {
                    this.setAppIdsTaken();
                });
                return false;
            }
        }
        this.setState({deploy_apps: deploy_apps}, () => {
            this.setAppIdsTaken();
        });
        return default_result;
    },

    onAppVersionChange (index, app_version_id) {
        let deploy_apps = this.state.deploy_apps;
        this.setState({deploy_apps: []});
        deploy_apps[index].app_version_id = app_version_id;
        this.setState({deploy_apps: deploy_apps});
    },

    setAppIdsTaken () {
      const apps_ids = this.state.deploy_apps.filter((deploy_app) => {
          return deploy_app.app_id !== ""
      }).map((deploy_app) => {
         return deploy_app.app_id
      });

      this.setState({
          selected_apps_ids: apps_ids
      });

    },

    setDeploySetup (index, deploy_setup) {
        let deploy_apps = this.state.deploy_apps;
        this.setState({deploy_apps: []});
        deploy_apps[index].deploy_setup = deploy_setup;
        deploy_apps[index].deploy_setup_id = deploy_setup ? deploy_setup.id : null;
        this.setState({deploy_apps: deploy_apps});
    },

    render() {
        return (
            <form className="col s12">
                <div className="modal-content">
                    <h4 className="center-align">{this.props.title}</h4>
                    {this.state.loading_environments &&
                    <div className="card-panel">
                        <div className="progress m-0">
                            <div className="indeterminate"/>
                        </div>
                    </div>
                    }
                    {!this.state.loading_environments &&
                    <div className="card-panel">
                        <div className="row m-0">
                            <div className="input-field col s12 m6">
                                <select defaultValue="null" ref="environment" onChange={this.onEnvironmentChange}>
                                    <option value="null" disabled>Choose an environment</option>
                                    {this.state.environment_items_select}
                                </select>
                                <label>Environment</label>
                            </div>
                        </div>
                    </div>
                    }
                    {this.state.environment_id &&
                        <div className="card-panel">
                            {this.state.loading_apps &&
                                <div className="progress m-0">
                                <div className="indeterminate"/>
                                </div>
                            }
                            {!this.state.loading_apps &&
                                <div>
                                {this.state.deploy_apps_html}
                                </div>
                            }
                            {!this.state.loading_apps && this.state.deploy_apps.length < this.state.apps.length &&
                                <button type="button" className="waves-effect btn btn-block" onClick={this.addDeployApp}>Add
                                App</button>
                            }
                        </div>
                    }
                </div>
                <div className="modal-footer">
                    <div className="row">
                        <div className="col s6">
                            <button type="button" className="waves-effect white black-text btn btn-block" onClick={this.onClose}>
                                Close
                            </button>
                        </div>
                        {!this.state.loading_environments &&
                        <div className="col s6">
                            <button type="button" className="waves-effect blue btn btn-block" onClick={this.onSubmit}
                                    disabled={
                                        !this.state.deploy_apps.length > 0
                                        ||
                                        this.state.deploy_apps.length !== this.state.selected_apps_ids.length
                                    }>
                                Save <i className="material-icons right">save</i>
                            </button>
                        </div>
                        }
                    </div>
                </div>
            </form>
        );
    }
}));