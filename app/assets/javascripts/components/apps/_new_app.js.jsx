var NewApp = (createReactClass({
    componentDidMount() {
        $('#modalCreateApp').modal()
    },

    getInitialState() {
        return {
            app: {
                'name': '',
                'docker_image': '',
                'exposed_ports': ''
            },
            loading: false
        };
    },

    openEditEnvironmentModal() {
        this.setState(
            {
                app:
                    {
                        'name': '',
                        'docker_image': '',
                        'exposed_ports': ''
                    }
            });
        this.formInstance.onReset();
        $('#modalCreateApp').modal('open');
    },

    onModalClose() {
        $('#modalCreateApp').modal('close');
    },

    onSave(app){
        this.setState({loading: true});

        $.ajax({
            url: "/api/v1/apps",
            type: "POST",
            data: { app: app },
            success: (app) => {
                Alert.success('New app created');
                $('#modalCreateApp').modal('close');
                this.props.handleSubmit(app);
                this.setState({loading: false});
                this.formInstance.onReset();
            },
            error: (xhr) => {
                if(xhr.status === 422) {
                    const response = xhr.responseJSON;
                    Object.keys(response.errors).map((k) => {
                        Alert.danger(k.replace(/^\w/, c => c.toUpperCase()).replace('_', ' ') + ' ' + response.errors[k]);
                    });
                }
                if(xhr.status >= 500) {
                    Alert.danger('Something get wrong');
                }
                this.setState({loading: false});
            }
        });

    },

    render() {

        return (
            <div>
                <button className="waves-effect waves-light btn" onClick={this.openEditEnvironmentModal} >
                    New App <i className="material-icons right">add</i>
                </button>
                <div id="modalCreateApp" className="modal">
                    <FormApp ref={instance => { this.formInstance = instance; }} title={"New App"}
                                     app={this.state.app} onSubmit={this.onSave} onClose={this.onModalClose}/>
                </div>
                {this.state.loading &&
                    <Loader/>
                }
            </div>
        );
    }
}));