const IndexAppVersions = (createReactClass({
    componentDidMount() {
        const app_id = this.props.app ? this.props.app._id.$oid : null;

        $.getJSON("/api/v1/app_versions.json?app=" + app_id , response => {
            this.setState({ app_versions: response });
            this.setState({ loading: false });
        });
    },

    onOpenDeploySetupModal(app, app_version) {
        this.props.onOpenDeploySetupModal(app, app_version);
    },

    getInitialState() {
        return {
            app_versions: [],
            loading: true,
            loadingRequest: false
        };
    },

    render() {
        return (
            <div>

                {this.state.loading &&
                    <div className="card-panel">
                        <div className="progress m-0">
                            <div className="indeterminate"/>
                        </div>
                    </div>
                }

                {!this.state.loading && this.state.app_versions.length > 0 &&
                    <AllAppVersions app_versions={this.state.app_versions} app={this.props.app}
                                    onOpenDeploySetupModal={this.onOpenDeploySetupModal}/>
                }

                {!this.state.loading && this.state.app_versions.length < 1 &&
                    <div className="card-panel yellow lighten-3 orange-text">
                        <h5 className="center m-0">No app versions loaded.</h5>
                    </div>
                }

            </div>
        )
    }
}));