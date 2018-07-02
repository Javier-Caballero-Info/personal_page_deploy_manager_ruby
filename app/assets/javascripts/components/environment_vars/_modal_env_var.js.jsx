const ModalIndexEnvVars = (createReactClass({

    onClose() {
      this.props.onClose();
    },

    render() {
        return (
            <div>
                <h4 className="header">{this.props.title}</h4>
                <div className="modal-content">
                    <IndexEnvVars environment={this.props.environment}/>
                </div>
                <div className="modal-footer">
                    <button className="btn white black-text waves-effect waves-green" onClick={this.onClose}>Close</button>
                </div>
            </div>
        )
    }

}));