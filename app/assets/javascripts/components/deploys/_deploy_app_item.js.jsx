const DeployAppItem = (createReactClass({

    componentDidMount () {

        const apps_item_html = this.props.apps.map((app) => {
            return (
                <option value={app._id.$oid} key={app._id.$oid}>{app.name}</option>
            );
        });

        if (this.props.deploy_app.app) {
            this.loadAppVersion(this.props.deploy_app.app_id.$oid);
        }

        if (this.props.deploy_app.deploy_setup) {
            this.setDeploySetup(this.props.deploy_app.deploy_setup);
        }
        this.setState({apps_item_html: apps_item_html}, () => {
            $('select').formSelect();
        });

    },

    getInitialState: function() {
        return {
            apps_item_html: [],
            app: null,
            app_versions_item_html: null,
            deploy_setup: null,
            deploy_setup_html: null,
            loading_app_versions: false,
            loading_deploy_setup: false
        };
    },

    setDeploySetup(deploy_setup){
        if (deploy_setup) {
            this.setState({
                deploy_setup: [deploy_setup],
                deploy_setup_html: <ViewDeploySetup deploy_setup={deploy_setup}/>
            });
        } else {
            this.setState({
                deploy_setup: [],
                deploy_setup_html: null
            });
        }
        this.props.setDeploySetup(this.props.index, deploy_setup);
    },

    onAppVersionChange (_, version_id) {

        let app_version_id = version_id ? version_id : this.refs.app_version_id.value;

        let environment_id = this.props.environment_id;

        if (environment_id.$oid) {
            environment_id = this.props.environment_id.$oid;
        }

        $.getJSON("/api/v1/deploy_setups.json?app_version=" + app_version_id + '&environment=' + environment_id, response => {

            if (response.length > 0){
                this.setDeploySetup(response[0]);
            }else{
                this.setDeploySetup(null);
            }

        });
        this.props.onAppVersionChange(this.props.index, app_version_id);
    },

    loadAppVersion (app_id) {
        if (app_id !== '') {
            this.setState({ loading_app_versions: true });
            $.getJSON("/api/v1/app_versions.json?app=" + app_id , response => {
                const app_versions_item_html = response.map((version) => {
                    return (
                      <option value={version._id.$oid} key={version._id.$oid}>
                          {version.name}
                      </option>
                    );
                });
                this.setState({
                    loading_app_versions: false,
                    app_versions_item_html: app_versions_item_html
                }, () => {
                    $('select').formSelect();
                });

                if (this.props.deploy_app.app_version_id) {
                    this.onAppVersionChange(this.props.deploy_app.app_version_id.$oid);
                }

            });
        } else {
            this.setState({app_versions_item_html: null});
        }
    },

    onAppChange (index, event) {
        const ok_change = this.props.onAppChange(index, event.target.value);
        this.props.deploy_app.app_id = ok_change ? event.target.value : '';
        if (!ok_change) {
            this.refs.app_id.value = '';
            $(this.refs.app_id).formSelect();
        }
        this.loadAppVersion(this.props.deploy_app.app_id);
        this.setState({
            deploy_setup: null,
            deploy_setup_html: null
        });
    },

    handleDeleteDeployApp (index) {
        this.props.handleDeleteDeployApp(index);
    },

    render () {

        const index = this.props.index;

        return (
            <div className="card-panel relative">
                <div className="row relative m-0">
                    <div className="input-field col s12 m6">
                        <select value={this.props.deploy_app.app_id} onChange={(e) => this.onAppChange(index, e)} ref="app_id">
                            <option value="" disabled>Choose an app</option>
                            {this.state.apps_item_html}
                        </select>
                        <label>App</label>
                    </div>

                    { this.state.loading_app_versions &&
                        <div className="col s12 m6 progress-middle-wrapper progress-middle-wrapper-right">
                                <div className="progress m-0">
                                    <div className="indeterminate"/>
                                </div>
                        </div>
                    }
                    { !this.state.loading_app_versions && this.state.app_versions_item_html !== null &&
                    <div className="col s12 m6 relative">
                        <div className="input-field">
                            <select value={this.props.deploy_app.app_version_id} onChange={this.onAppVersionChange} ref="app_version_id">
                                <option value="" disabled>Choose a version</option>
                                {this.state.app_versions_item_html}
                            </select>
                            <label>Version</label>
                        </div>
                    </div>
                    }
                </div>
                <div className="row m-0">
                    <div className="col s12">
                        {this.state.loading_deploy_setup &&
                            <div className="progress m-0">
                                <div className="indeterminate"/>
                            </div>
                        }
                        {!this.state.loading_deploy_setup && this.state.deploy_setup && this.state.deploy_setup.length === 0 &&
                        <div className="card-panel bordered z-depth-0 grey-text">
                            <h5 className="center m-0">No deploy setup found</h5>
                        </div>
                        }
                        {!this.state.loading_deploy_setup && this.state.deploy_setup && this.state.deploy_setup.length > 0 &&
                            <div> {this.state.deploy_setup_html} </div>
                        }
                    </div>
                </div>
                <button type="button" className="waves-effect waves-light btn-flat red-text btn-close"
                        onClick={this.handleDeleteDeployApp.bind(this, index)}>
                    <i className="material-icons">delete</i>
                </button>
            </div>
        );
    }
}));