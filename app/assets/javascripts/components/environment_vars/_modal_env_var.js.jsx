const ModalIndexEnvVars = (createReactClass({

    onClose() {
      this.props.onClose();
    },

    render() {
        return (
            <div>
                <h4 className="header">Environment Vars</h4>
                <h5>
                    {this.props.app &&
                        <blockquote>
                            <strong> App: </strong>
                            {this.props.app.name}
                        </blockquote>
                    }
                    {this.props.environment &&
                        <blockquote>
                            <strong> Environment: </strong>
                            {this.props.environment.name}
                        </blockquote>
                    }
                </h5>
                <div className="modal-content">
                    <IndexEnvVars environment={this.props.environment} app={this.props.app}/>
                </div>
                <div className="modal-footer">
                    <button className="btn white black-text waves-effect waves-green" onClick={this.onClose}>Close</button>
                </div>
            </div>
        )
    }

}));