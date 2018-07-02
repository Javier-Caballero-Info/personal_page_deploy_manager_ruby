const FormEnvVar = (createReactClass({
   
    onSubmit(){

        const env_var = this.state.environment_var;

        env_var['environment_id']= this.props.environment ? this.props.environment.id : null;
        env_var['app_id'] = this.props.app ? this.props.app.id : null;

        this.props.onSubmit(env_var);
    },

    onReset() {
        this.refs.key.value = '';
        this.refs.key.className = 'validate';

        this.refs.body.value = '';
        this.refs.body.className = 'validate materialize-textarea';
    },

    onClose(){
        this.onReset();
        this.props.onClose();
    },

    getInitialState: function() {
        return {
            environment_var: this.props.environment_var,
            keyValid: false,
            bodyValid: false,
            formValid: false
        };
    },

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let environment_var = this.state.environment_var;

        environment_var[name] = value;

        this.setState(
            {environment_var: environment_var},
            () => { this.validateField(name, value) }
        );
    },

    validateField(fieldName, value) {
        let keyValid = false;
        let bodyValid = false;

        switch(fieldName) {
            case 'key':
                keyValid = value.length > 0;
                this.setState({
                    keyValid: keyValid
                }, this.validateForm);
                break;
            case 'body':
                bodyValid = value.length > 0;
                this.setState({
                    bodyValid: bodyValid
                }, this.validateForm);
                break;
            default:
                break;
        }
    },

    validateForm() {
        this.setState({formValid: this.state.keyValid && this.state.bodyValid});
    },

    componentWillMount() {
        Object.keys(this.props.environment_var).map((prop) => {
           this.validateField(prop, this.props.environment_var[prop]);
        });
    },

    render() {
        return (
            <form>
                <div className="modal-content">
                    <h4 className="center-align">{this.props.title}</h4>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="key_input" type="text" name="key" className="validate" ref="key"
                                   required="required" defaultValue={this.state.environment_var.key} onChange={this.handleChange}/>
                            <label className="active" htmlFor="key_input">Key</label>
                            <span className="helper-text" data-error="The key is invalid"/>
                        </div>
                        <div className="input-field col s12">
                            <textarea id="body_input" name="body" className="validate materialize-textarea" ref="body"
                                   required="required" defaultValue={this.state.environment_var.body} onChange={this.handleChange}/>
                            <label className="active" htmlFor="body_input">Body</label>
                            <span className="helper-text" data-error="The body is invalid"/>
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