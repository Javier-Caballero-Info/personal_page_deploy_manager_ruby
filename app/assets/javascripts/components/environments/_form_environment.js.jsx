const FormEnvironment = (createReactClass({

    onSubmit(){
        this.props.onSubmit(this.state.environment);
    },

    onReset() {
        this.state.environment = {
            'name': '',
            'portainer_url': ''
        };
    },

    onClose(){

        this.state.environment = {
            'name': '',
            'portainer_url': ''
        };

        this.props.onClose();
    },

    getInitialState: function() {
        return {
            environment: this.props.environment,
            nameValid: false,
            portainerUrlValid: false,
            formValid: false
        };
    },

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let environment = this.state.environment;

        environment[name] = value;

        this.setState(
            {environment: environment},
            () => { this.validateField(name, value) }
        );
    },

    validateField(fieldName, value) {
        let nameValid = false;
        let portainerUrlValid = false;

        switch(fieldName) {
            case 'name':
                nameValid = value.length > 0;
                this.setState({
                    nameValid: nameValid
                }, this.validateForm);
                break;
            case 'portainer_url':
                if(value.length > 0) {
                    const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i;
                    portainerUrlValid = pattern.test(value);
                }else{
                    portainerUrlValid = false;
                }
                this.setState({
                    portainerUrlValid: portainerUrlValid
                }, this.validateForm);
                break;
            default:
                break;
        }
    },

    validateForm() {
        this.setState({formValid: this.state.nameValid && this.state.portainerUrlValid});
    },

    componentWillMount() {
        Object.keys(this.props.environment).map((prop) => {
           this.validateField(prop, this.props.environment[prop]);
        })
    },

    render() {
        return (
            <form className="col s12">
                <div className="modal-content">
                    <h4 className="center-align">{this.props.title}</h4>
                    <div className="row">
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="name_input" type="text" name="name" className="validate"
                                       required="required" value={this.state.environment.name} onChange={this.handleChange}/>
                                <label className="active" htmlFor="name_input">Name</label>
                                <span className="helper-text" data-error="The name is invalid"/>
                            </div>
                            <div className="input-field col s12">
                                <input id="portainer_url_input" type="url" name="portainer_url" className="validate"
                                       required="required" value={this.state.environment.portainer_url} onChange={this.handleChange}/>
                                <label className="active" htmlFor="portainer_url_input">Portainer URL</label>
                                <span className="helper-text" data-error="The portainer url is invalid"/>
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