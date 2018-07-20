const FormApp = (createReactClass({

    getPorts() {
        let ports = [];
        const instance = M.Chips.getInstance($('.chips'));
        instance.chipsData.map(function(item){ports.push(item.tag)});
        return ports.join(',');
    },

    formatPortData(ports) {
        let result = [];
        if(ports != null && ports.length > 0) {
            ports.split(',').map(function (item) {
                result.push({
                    tag: item
                });
            });
        }
        return result;
    },

    onSubmit(){
        let app = this.state.app;
        app.exposed_ports = this.getPorts();

        this.setState(
            {app: app}
        );

        this.props.onSubmit(this.state.app);
    },

    onReset() {

        this.refs.name.value = '';
        this.refs.name.className = 'validate';

        this.refs.docker_image.value = '';
        this.refs.docker_image.className = 'validate';

        $('.chips').chips({
            placeholder: '',
            secondaryPlaceholder: '+Port',
            data: []
        });

    },

    onClose(){
        this.onReset();
        this.props.onClose();
    },

    getInitialState: function() {
        return {
            app: this.props.app,
            nameValid: false,
            dockerImageValid: false,
            exposedPortsValid: false,
            formValid: false
        };
    },

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let app = this.state.app;

        app[name] = value;

        this.setState(
            {app: app},
            () => { this.validateField(name, value) }
        );
    },

    validateField(fieldName, value) {
        let nameValid = false;
        let dockerImageValid = false;

        switch(fieldName) {
            case 'name':
                if(value.length > 0) {
                    const pattern = /^[a-zA-Z0-9]*[a-zA-Z0-9_.-]*$/i;
                    nameValid = pattern.test(value);
                }else{
                    nameValid = false;
                }
                this.setState({
                    nameValid: nameValid
                }, this.validateForm);
                break;
            case 'docker_image':
                dockerImageValid = value.length > 0;
                this.setState({
                    dockerImageValid: dockerImageValid
                }, this.validateForm);
                break;
            default:
                break;
        }
    },

    validateForm() {
        this.setState({formValid: this.state.nameValid && this.state.dockerImageValid});
    },

    componentWillMount() {
        Object.keys(this.props.app).map((prop) => {
           this.validateField(prop, this.props.app[prop]);
        });
    },

    componentDidMount() {
        const ports = this.formatPortData(this.props.app.exposed_ports);
        $('.chips').chips({
            placeholder: '',
            secondaryPlaceholder: '+Port',
            data: ports
        });
    },

    render() {
        return (
            <form>
                <div className="modal-content">
                    <h4 className="center-align">{this.props.title}</h4>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="name_input" type="text" name="name" className="validate" ref="name"
                                   required="required" defaultValue={this.state.app.name} onChange={this.handleChange}
                                   pattern="[a-zA-Z0-9]*[a-zA-Z0-9_.-]*"/>
                            <label className="active" htmlFor="name_input">Name</label>
                            <span className="helper-text" data-error="The name is invalid"/>
                        </div>
                        <div className="input-field col s12">
                            <input id="docker_image_input" type="text" name="docker_image" className="validate" ref="docker_image"
                                   required="required" defaultValue={this.state.app.docker_image} onChange={this.handleChange}/>
                            <label className="active" htmlFor="docker_image_input">Docker Image</label>
                            <span className="helper-text" data-error="The docker image is invalid"/>
                        </div>
                        <div className="col s12">
                            <label className="active">Exposed Ports</label>
                            <div className="chips mt-0">
                                <input type="number"/>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="modal-footer">
                    <div className="row">
                        <div className="col s6">
                            <button type="button" className="waves-effect white black-text btn btn-block" onClick={this.onClose}>
                                Close
                            </button>
                        </div>

                        <div className="col s6">
                            <button type="button" className="waves-effect blue btn btn-block"  onClick={this.onSubmit}
                                    disabled={!this.state.formValid}>
                                Save <i className="material-icons right">save</i>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}));