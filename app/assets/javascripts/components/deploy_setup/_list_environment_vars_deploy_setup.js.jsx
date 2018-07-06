const ListEnvironmentVarsDeploySetup = (createReactClass({
    getInitialState() {
        return {
            global_env_vars: null,
            environment_env_vars: null,
            app_env_vars: null,
            global_env_vars_items: [],
            environment_env_vars_items: [],
            app_env_vars_items: [],
            loading_global_env_vars: true,
            loading_environment_env_vars: true,
            loading_app_env_vars: true
        }
    },

    getListCheckEnvironmentVar(listElements){
        return (
            <ListCheckEnvironmentVar listElements={listElements} selectedIds={this.props.selectedEnvVars}
                                     onCheckboxChange={this.props.onCheckboxChange}/>
        )
    },

    componentDidMount() {

        const env_id = this.props.environment_id;
        const app_id = this.props.app_id;

        $('.collapsible').collapsible({accordion: false});

        $.getJSON("/api/v1/environment_vars.json", response => {
            this.setState(
                {
                    global_env_vars: this.getListCheckEnvironmentVar(response),
                    global_env_vars_items: response,
                    loading_global_env_vars: false
                }
            );
        });
        $.getJSON("/api/v1/environment_vars.json?environment=" + env_id, response => {
            this.setState(
                {
                    environment_env_vars: this.getListCheckEnvironmentVar(response),
                    environment_env_vars_items: response,
                    loading_environment_env_vars: false
                }
            );
        });

        $.getJSON("/api/v1/environment_vars.json?environment=" + env_id + '&app=' + app_id, response => {
            this.setState(
                {
                    app_env_vars: this.getListCheckEnvironmentVar(response),
                    app_env_vars_items: response,
                    loading_app_env_vars: false
                }
            );
        });
    },

    render() {
        return (
            <ul className="collapsible expandable m-0">
                <li className="active" key="global_env_var">
                    <div className="collapsible-header"><i
                        className="material-icons">extension</i>
                        Global Environment Vars
                    </div>
                    <div className="collapsible-body p-0">
                        {!this.loading_global_env_vars &&
                            this.state.global_env_vars
                        }
                        {this.loading_global_env_vars &&
                        <div className="progress"><div className="indeterminate"/></div>
                        }
                    </div>
                </li>
                <li className="active" key="environment_env_var">
                    <div className="collapsible-header"><i
                        className="material-icons">extension</i>
                        Environment Vars by Environment
                    </div>
                    <div className="collapsible-body p-0">
                        {!this.loading_environment_env_vars &&
                            this.state.environment_env_vars
                        }
                        {this.loading_environment_env_vars &&
                        <div className="progress"><div className="indeterminate"/></div>
                        }
                    </div>
                </li>
                <li className="active" key="app_env_var">
                    <div className="collapsible-header"><i
                        className="material-icons">extension</i>
                        Environment Vars by App
                    </div>
                    <div className="collapsible-body p-0">
                        {!this.loading_app_env_vars &&
                            this.state.app_env_vars
                        }
                        {this.loading_app_env_vars &&
                        <div className="progress"><div className="indeterminate"/></div>
                        }
                    </div>
                </li>
            </ul>
        )
    }
}));