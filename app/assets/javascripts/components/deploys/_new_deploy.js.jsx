const NewDeploy = (createReactClass({
    componentDidMount() {
        $('#modalCreateDeploy').modal()
    },

    getInitialState() {
        return {
            formInstance: null,
            loading: false
        };
    },

    openEditEnvironmentModal() {
        this.props.setFlagModalShow(true);
        $('#modalCreateDeploy').modal('open');
        $('select').formSelect();
    },

    onModalClose() {
        this.props.setFlagModalShow(false);
        $('#modalCreateDeploy').modal('close');
    },

    onSave(deploy){
        this.setState({loading: true});

        $.ajax({
            url: "/api/v1/deploys",
            type: "POST",
            data: { deploy: deploy },
            success: (deploy) => {
                notification.success('New deploy created');
                $('#modalCreateDeploy').modal('close');
                this.setState({loading: false});
                this.props.handleSubmit(deploy);
            },
            error: (xhr) => {
                if(xhr.status === 400) {
                    notification.warning('Actually exists a deploy in progress for the same environment');
                    $('#modalCreateDeploy').modal('close');
                    this.props.handleSubmit(deploy);
                }
                if(xhr.status === 422) {
                    const response = xhr.responseJSON;
                    Object.keys(response.errors).map((k) => {
                        notification.danger(k.replace(/^\w/, c => c.toUpperCase()).replace('_', ' ') + ' ' + response.errors[k]);
                    });
                }
                if(xhr.status >= 500) {
                    notification.danger('Something get wrong');
                }
                this.setState({loading: false});
            }
        });

    },

    render() {

        return (
            <div className="left">
                <button className="waves-effect waves-light btn" onClick={this.openEditEnvironmentModal} >
                    New Deploy <i className="material-icons right">add</i>
                </button>
                <div id="modalCreateDeploy" className="modal modal-big">
                    <FormDeploy title={"New Deploy"} deploy={null} onSubmit={this.onSave}
                                onClose={this.onModalClose}/>
                </div>
                {this.state.loading &&
                    <Loader/>
                }
            </div>
        );
    }
}));