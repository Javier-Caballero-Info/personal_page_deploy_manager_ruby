const ModalIndexDeploySetup = (createReactClass({

    onClose() {
      this.props.onClose();
    },

    render() {
        return (
            <div>
                <h4 className="header">Deploy Setup</h4>
                <h5>
                    {this.props.app &&
                        <blockquote>
                            <strong> App: </strong>
                            {this.props.app.name}
                        </blockquote>
                    }
                </h5>
                <div className="modal-content">

                </div>
                <div className="modal-footer">
                    <button className="btn white black-text waves-effect waves-green" onClick={this.onClose}>Close</button>
                </div>
            </div>
        )
    }

}));