const FilterDeploySetup = (createReactClass({
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
                    loading_environments: true
                }, () => {
                    $('select').formSelect();
                }
            );

        });

        $.getJSON("/api/v1/app_versions.json?app=" + this.props.app.id, response => {
            const app_version_items_select= response.map((app_version) => {
                return (
                    <option key={app_version.id} value={app_version.id}>{app_version.name}</option>
                )
            });

            this.setState(
                {
                    app_version_items_select: app_version_items_select,
                    loading_app_versions: true
                }, () => {
                    $('select').formSelect();
                }
            );

        });
    },

    getInitialState() {
        return {
            environment_items_select: null,
            app_version_items_select: null,
            loading_environments: false,
            loading_app_versions: false,
        };
    },

    onFilterChange() {
        const app_version_id = this.refs.app_version.value;
        const environment_id = this.refs.environment.value;
        if(app_version_id !== 'null' && environment_id !== 'null'){
            this.props.setLoadingDeploySetup(true);
            $.getJSON("/api/v1/deploy_setups.json?app_version=" + app_version_id + '&environment=' + environment_id, response => {
                this.props.setLoadingDeploySetup(false);
                this.props.onFilterChange({
                   app_version_id: app_version_id,
                   environment_id: environment_id,
                   deploy_setup: response
                });
            });
        }

    },

    render() {
        return (
            <div className="row m-0">
                {this.state.loading_app_versions &&
                <div className="input-field col s12 m6">
                    <select defaultValue={this.props.version ? this.props.version.id : "null"}
                            onChange={this.onFilterChange} ref="app_version">
                        <option value="null" disabled>Choose a version of the app</option>
                        {this.state.app_version_items_select}
                    </select>
                    <label>Version</label>
                </div>
                }
                {!this.state.loading_app_versions &&
                <div className="progress col s12 m6"><div className="indeterminate"/></div>
                }
                {this.state.loading_environments &&
                <div className="input-field col s12 m6">
                    <select defaultValue="null" onChange={this.onFilterChange} ref="environment">
                        <option value="null" disabled>Choose a environment</option>
                        {this.state.environment_items_select}
                    </select>
                    <label>Version</label>
                </div>
                }
                {!this.state.loading_environments &&
                <div className="progress col s12 m6"><div className="indeterminate"/></div>
                }
            </div>
        )
    }
}));
