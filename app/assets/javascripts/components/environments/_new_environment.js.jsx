var NewEnvironment = (createReactClass({
    componentDidMount() {
        $('#modalCreateEnvironment').modal()
    },

    getInitialState() {
        return {
            environment: {
                'name': '',
                'portainer_url': ''
            },
            loadingList: false
        };
    },

    openEditModal() {
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
        this.setState({loadingList: true});

        $.ajax({
            url: "/api/v1/environments",
            type: "POST",
            data: { environment: environment },
            success: (environment) => {
                Alert.success('New environment created');
                $('#modalCreateEnvironment').modal('close');
                this.props.handleSubmit(environment);
                this.setState({loadingList: false});
            }
        });

    },

    render() {

        return (
            <div>
                <button className="waves-effect waves-light btn" onClick={this.openEditModal} >
                    New Environment <i className="material-icons right">add</i>
                </button>
                <div id="modalCreateEnvironment" className="modal">
                    <FormEnvironment environment={this.state.environment} title={"New Environment"}
                                     onSubmit={this.onSave} onClose={this.onModalClose}/>
                </div>
                {this.state.loadingList &&
                    <Loader/>
                }
            </div>
        );
    }
}));