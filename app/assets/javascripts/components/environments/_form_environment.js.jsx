const FormEnvironment = (createReactClass({

    onSubmit(){

        //TODO: validate form

        //console.log(this.state.environment);

        this.props.onSubmit(this.state.environment);

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
            environment: this.props.environment
        };
    },

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.state.environment[name] = value;

        this.setState(this.state.environment);
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
                            </div>
                            <div className="input-field col s12">
                                <input id="portainer_url_input" type="url" name="portainer_url" className="validate"
                                       required="required" value={this.state.environment.portainer_url} onChange={this.handleChange}/>
                                <label className="active" htmlFor="portainer_url_input">Portainer URL</label>
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
                            <button type="button" className="waves-effect blue btn btn-block"  onClick={this.onSubmit}>
                                Save <i className="material-icons right">save</i>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}));