var NewEnvVar = (createReactClass({
    componentDidMount() {
        $('#modalCreateEnvironmentVar').modal()
    },

    getInitialState() {
        return {
            environment_var: {
                'key': '',
                'body': '',
            },
            loading: false
        };
    },

    openEditModal() {
        this.setState(
            {
                environment_var:
                    {
                        'name': '',
                        'docker_image': '',
                        'exposed_ports': ''
                    }
            });
        this.formInstance.onReset();
        $('#modalCreateEnvironmentVar').modal('open');
    },

    onModalClose() {
        $('#modalCreateEnvironmentVar').modal('close');
    },

    onSave(environment_var){
        this.setState({loading: true});

        $.ajax({
            url: "/api/v1/environment_vars",
            type: "POST",
            data: { environment_var: environment_var },
            success: (environment_var) => {
                Alert.success('New environment var created');
                $('#modalCreateEnvironmentVar').modal('close');
                this.props.handleSubmit(environment_var);
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
                <button className="waves-effect waves-light btn" onClick={this.openEditModal} >
                    New Environment Var <i className="material-icons right">add</i>
                </button>
                <div id="modalCreateEnvironmentVar" className="modal">
                    <FormEnvVar ref={instance => { this.formInstance = instance; }} title={"New EnvironmentVar"}
                                     environment_var={this.state.environment_var} onSubmit={this.onSave} onClose={this.onModalClose}/>
                </div>
                {this.state.loading &&
                    <Loader/>
                }
            </div>
        );
    }
}));