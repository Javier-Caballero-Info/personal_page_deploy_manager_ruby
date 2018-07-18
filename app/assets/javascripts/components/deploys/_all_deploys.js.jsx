const AllDeploys = (createReactClass({

    componentDidMount() {

    },

    getInitialState() {
        return {
            deploy: {

            },
            formEdit: null,
            loading: false
        };
    },

    render() {

        const deploys = this.props.deploys.map((deploy) => {
            return (
                <tr key={deploy.id}>
                    <td className="middle">
                        <DeployStatus status={deploy.status}/>
                        <span>{deploy.name}</span>
                    </td>
                    <td className="middle">{deploy.environment.name}</td>
                    <td className="middle">
                        <button className="waves-effect waves-light btn blue">
                            <i className="material-icons">visibility</i>
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
                <table className="responsive-table  striped standard-table-1">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Environment</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                        {deploys}
                    </tbody>
                </table>
            </div>
        )
    }
}));