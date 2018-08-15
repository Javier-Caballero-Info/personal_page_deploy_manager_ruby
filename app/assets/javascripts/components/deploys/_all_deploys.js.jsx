const AllDeploys = (createReactClass({

    componentDidMount() {
        $('#modalEditDeploy').modal();
    },

    handleDeleteDeploy (deploy) {
        this.props.handleDeleteDeploy(deploy);
    },

    handleShow (deploy) {
        this.props.handleShow(deploy);
    },

    handleUpdateDeploy (deploy) {
        this.props.handleUpdateDeploy(deploy);
        this.props.handleUpdateDeploy(deploy);
        this.closeEditModal();
    },

    handleEdit (deploy) {

        this.props.setFlagModalShow(true);

        this.setState({
            editDeployView: <FormDeploy title={"Edit Deploy"} deploy={deploy} onSubmit={this.handleUpdateDeploy}
                                        onClose={this.closeEditModal}/>
        });

        $('#modalEditDeploy').modal('open');

    },

    closeEditModal () {
        $('#modalEditDeploy').modal('close');
        this.props.setFlagModalShow(false);
        this.setState({
            editDeployView: null
        });
    },

    getInitialState() {
        return {
            editDeployView: null,
            formEdit: null,
            loading: false
        };
    },

    render() {

        const deploys = this.props.deploys.map((deploy) => {
            return (
                <tr key={deploy._id.$oid}>
                    <td className="middle">
                        <DeployStatus status={deploy.status}/>
                        <span>{deploy.name}</span>
                    </td>
                    <td className="middle">{deploy.environment.name}</td>
                    <td className="middle">
                        <button className="waves-effect waves-light btn blue"
                                onClick={this.handleShow.bind(this, deploy)}>
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
                                    onClick={this.handleDeleteDeploy.bind(this, deploy)}>
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
                <div id="modalEditDeploy" className="modal modal-big">
                    {this.state.editDeployView}
                </div>
            </div>
        )
    }
}));