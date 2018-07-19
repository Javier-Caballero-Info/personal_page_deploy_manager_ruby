const NewEnvironment = (createReactClass({
    componentDidMount() {
        $('#modalCreateEnvironment').modal()
    },

    getInitialState() {
        return {
            environment: {
                'name': '',
                'portainer_url': ''
            },
            loading: false
        };
    },

    openEditEnvironmentModal() {
        this.setState({environment: {
                'name': '',
                'portainer_url': ''
            }});
        $('#modalCreateEnvironment').modal('open');
    },

    onModalClose() {
        $('#modalCreateEnvironment').modal('close');
    },

    onSave(environment){
        this.setState({loading: true});

        $.ajax({
            url: "/api/v1/environments",
            type: "POST",
            data: { environment: environment },
            success: (environment) => {
                Alert.success('New environment created');
                $('#modalCreateEnvironment').modal('close');
                this.props.handleSubmit(environment);
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
                    New Environment <i className="material-icons right">add</i>
                </button>
                <div id="modalCreateEnvironment" className="modal">
                    <FormEnvironment ref={instance => { this.formInstance = instance; }} title={"New Environment"}
                                     environment={this.state.environment} onSubmit={this.onSave} onClose={this.onModalClose}/>
                </div>
                {this.state.loading &&
                    <Loader/>
                }
            </div>
        );
    }
}));