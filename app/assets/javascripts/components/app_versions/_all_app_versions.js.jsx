const AllAppVersions = (createReactClass({
    componentDidMount() {
        
    },

    getInitialState() {
        return {
            loading: false
        };
    },

    onOpenDeploySetupModal(app, app_version, e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.onOpenDeploySetupModal(app, app_version);
    },

    render() {

        const app_versions = this.props.app_versions.map((app_version) => {

            let bg_const = 'blue lighten-4';

            if (app_version.stable > 0) {
                bg_const = 'green accent-1';
            }
            if (app_version.stable < 0) {
                bg_const = 'red lighten-4';
            }

            return (
                <tr key={app_version.id} className={bg_const}>
                    <td className="middle">
                        {app_version.stable > 0 &&
                            <span className="mdi mdi-approval mdi-24 green-text ml-1"/>
                        }
                        {app_version.stable < 0 &&
                            <span className="mdi mdi-close-octagon mdi-24 red-text ml-1"/>
                        }
                        {app_version.stable === 0 &&
                            <span className="mdi mdi-help-circle-outline mdi-24 grey-text ml-1"/>
                        }
                        <strong className="ml-1">{app_version.name}</strong>
                    </td>
                    <td>
                        <button className="waves-effect waves-light btn purple accent-4"
                                onClick={(e) => this.onOpenDeploySetupModal(this.props.app, app_version, e)}>
                            <i className="material-icons">settings</i>
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
                <table className="responsive-table standard-table-1 table-flat">
                    <tbody>
                    {app_versions}
                    </tbody>
                </table>
            </div>
        )
    }
}));