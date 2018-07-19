const AllDeploys = (createReactClass({

    componentDidMount() {

    },

    handleDelete (deploy) {
        this.props.handleDelete(deploy);
    },

    handleEdit (deploy) {
        console.log('Edit deploy: ', deploy);
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
                        {deploy.status === 'draft' &&
                            <button className="waves-effect waves-light btn white black-text ml-1"
                                    onClick={this.handleEdit.bind(this, deploy)}>
                            <i className="material-icons">edit</i>
                            </button>
                        }
                        { deploy.status === 'draft' &&
                            <button className="waves-effect waves-light btn red darken-4 ml-1"
                                    onClick={this.handleDelete.bind(this, deploy)}>
                                <i className="material-icons">delete</i>
                            </button>
                        }
                    </td>
                </tr>
            )
        });

        return(

            <div className="card-panel">
                {this.state.loading &&
                   <Loader/>
                }
                <table className="responsive-table  striped standard-table-3">
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