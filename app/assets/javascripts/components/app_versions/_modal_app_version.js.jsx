const ModalIndexAppVersion = (createReactClass({

    onClose() {
      this.props.onClose();
    },

    render() {
        return (
            <div>
                <h4 className="header">App Versions</h4>
                <h5>
                    {this.props.app &&
                        <blockquote>
                            <strong> App: </strong>
                            {this.props.app.name}
                        </blockquote>
                    }
                </h5>
                <div className="modal-content">
                    <IndexAppVersions app={this.props.app}/>
                </div>
                <div className="modal-footer">
                    <button className="btn white black-text waves-effect waves-green" onClick={this.onClose}>Close</button>
                </div>
            </div>
        )
    }

}));