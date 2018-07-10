const IndexDeploySetup = (createReactClass({

    componentDidMount() {},

    getInitialState() {
        return {
            environment_id: null,
            app_version_id: null,
            deploy_setup: null,
            loading_global_env_vars: false,
            loading_deploy_setup: false,
            environment_vars: null,
            selectedEnvVars: [],
            deploy_setup_items: null
        };
    },

    onClose() {
        this.props.onClose();
    },

    onCheckboxChange(is_addition, env_var) {
        this.setLoadingDeploySetup(true);

        const deploy_setup = this.state.deploy_setup[0];

        if (is_addition){
            $.ajax({
                url: "/api/v1/deploy_setup_items",
                type: "POST",
                data: {deploy_setup_item: {
                    deploy_setup_id: deploy_setup.id,
                    environment_var_id: env_var.id
                }},
                success: (deploy_setup_item) => {
                    Alert.success('Environment var was added successfully');
                    this.setLoadingDeploySetup(false);
                    deploy_setup.deploy_setup_item.push(deploy_setup_item);
                    this.setState({deploy_setup: [deploy_setup]});
                    this.setDeploySetupItems(deploy_setup.deploy_setup_item);
                },
                error: (xhr) => {
                    this.processFailedRequest(xhr);
                    this.setLoadingDeploySetup(false);
                }
            });
        }else{
            let selected_item;

            const filtered_deploy_setup_items = deploy_setup.deploy_setup_item.filter((item) => {
                if (env_var.id === item.environment_var_id){
                    selected_item = item;
                }

                return env_var.id !== item.environment_var_id;

            });

            $.ajax({
                url: "/api/v1/deploy_setup_items/" + selected_item.id,
                type: "DELETE",
                success: () => {
                    Alert.success('Environment var was removed successfully');
                    this.setLoadingDeploySetup(false);
                    deploy_setup.deploy_setup_item = filtered_deploy_setup_items;
                    this.setState({deploy_setup: [deploy_setup]});
                    this.setDeploySetupItems(
                        filtered_deploy_setup_items
                    );
                },
                error: (xhr) => {
                    this.processFailedRequest(xhr);
                    this.setLoadingDeploySetup(false);
                }
            });
        }
    },

    processFailedRequest(xhr){
        if(xhr.status === 422) {
            const response = xhr.responseJSON;
            Object.keys(response.errors).map((k) => {
                Alert.danger(k.replace(/^\w/, c => c.toUpperCase()).replace('_', ' ') + ' ' + response.errors[k]);
            });
        }
        if(xhr.status >= 500) {
            Alert.danger('Something get wrong');
        }
    },

    setDeploySetupItems(deploy_setup_items) {
      this.setState({
          selectedEnvVars: this.setSelectedEnvVars(deploy_setup_items),
          deploy_setup_items: null
      }, () => {
          this.setState({
              deploy_setup_items: <ItemsDeploySetup deploy_setup_items={deploy_setup_items}/>
          });
      });
    },

    setSelectedEnvVars(deploy_setup_item) {
        return deploy_setup_item.map((deploy_setup_item) => {
            return deploy_setup_item.environment_var_id;
        });
    },

    setEnvironmentVars(app_version_id, environment_id, deploy_setup) {
        this.setState({
            environment_vars: null
        });

        let selectedEnvVars = [];

        if (deploy_setup && deploy_setup.length > 0){
            selectedEnvVars = this.setSelectedEnvVars(deploy_setup[0].deploy_setup_item);
            this.setDeploySetupItems(deploy_setup[0].deploy_setup_item);
        }

        this.setState({
            environment_vars: <ListEnvironmentVarsDeploySetup app_id={this.props.app.id} environment_id={environment_id}
                                                              selectedEnvVars={selectedEnvVars} onCheckboxChange={this.onCheckboxChange}/>,
            deploy_setup: deploy_setup,
            selectedEnvVars: selectedEnvVars,
            loading_deploy_setup: false
        });
    },

    onFilterChange({app_version_id, environment_id, deploy_setup}) {
        this.setState({
            environment_id: environment_id,
            app_version_id: app_version_id
        });
        this.setEnvironmentVars(app_version_id, environment_id, deploy_setup);
    },

    onCreateDeploySetup(copy_from) {
        this.setLoadingDeploySetup(true);
        $.ajax({
            url: "/api/v1/deploy_setups?copy_from=" + copy_from,
            type: "POST",
            data: {deploy_setup: {
                    environment_id: this.state.environment_id,
                    app_version_id: this.state.app_version_id,
                }},
            success: (deploy_setup) => {
                Alert.success('Deploy setup was created successfully');
                this.setEnvironmentVars(this.state.app_version_id, this.state.environment_id, [deploy_setup]);
                this.setLoadingDeploySetup(false);
            },
            error: (xhr) => {
                if(xhr.status === 404) {
                    Alert.danger('No exists another deploy setup to copy');
                } else {
                    this.processFailedRequest(xhr);
                }
                this.setLoadingDeploySetup(false);
            }
        });
    },

    setLoadingDeploySetup(loading) {
        this.setState({loading_deploy_setup: loading});
    },

    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-content">
                        <FilterDeploySetup onFilterChange={this.onFilterChange} app={this.props.app}
                                           version={this.props.version} setLoadingDeploySetup={this.setLoadingDeploySetup}/>
                    </div>
                </div>

                {!this.state.deploy_setup &&
                <div className="card">
                    <div className="card-content">
                        {this.state.loading_deploy_setup &&
                        <div className="progress"><div className="indeterminate"/></div>
                        }
                        {!this.state.loading_deploy_setup &&
                        <div className="card-panel yellow lighten-3 orange-text">
                            <h5 className="center m-0">Please select an app version and an environment</h5>
                        </div>
                        }
                    </div>
                </div>
                }

                {this.state.deploy_setup &&
                <div className="card">
                    <div className="card-content">
                        {this.state.deploy_setup.length > 0 &&
                            <div className="row m-0 valign-wrapper">
                                <div className="col m6">
                                    {this.state.environment_vars}
                                </div>
                                <div className="col m6">
                                    {this.state.loading_deploy_setup &&
                                        <div className="progress"><div className="indeterminate"/></div>
                                    }
                                    {!this.state.loading_deploy_setup && this.state.selectedEnvVars.length > 0 &&
                                        this.state.deploy_setup_items
                                    }
                                    {!this.state.loading_deploy_setup && this.state.selectedEnvVars.length === 0 &&
                                    <div className="card-panel grey-text">
                                        <h5 className="center m-0">No environment vars selected</h5>
                                    </div>
                                    }
                                </div>
                            </div>
                        }
                        {this.state.deploy_setup.length === 0 && !this.state.loading_deploy_setup &&
                            <ListActionsDeploySetup onCreateDeploySetup={this.onCreateDeploySetup}/>
                        }
                        {this.state.deploy_setup.length === 0 && this.state.loading_deploy_setup &&
                            <div className="progress"><div className="indeterminate"/></div>
                        }
                    </div>
                </div>
                }
            </div>
        )
    }

}));