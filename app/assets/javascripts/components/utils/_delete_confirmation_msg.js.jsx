const DeleteConfirmationMsg = (createReactClass({
    componentDidMount() {
        $('#deleteConfirmationModal').modal();
    },

    getInitialState() {
        return {
            msg: ''
        };
    },

    show(text){
        this.setState({msg: text});
        console.log(text);
        $('#deleteConfirmationModal').modal('open');
    },

    handleConfirm() {
        this.props.handleConfirm();
    },

    render() {
        return (
            <div id="deleteConfirmationModal" className="modal delete-modal">
                <div className="modal-header red white-text">
                    <h5 className="m0">Confirm Delete</h5>
                </div>

                <div className="modal-content">
                    <h6 className="center">
                        {this.state.msg}
                    </h6>
                </div>
                <div className="modal-footer">
                    <div className="row">
                        <div className="col s6 m4 center">
                            <button className="btn modal-close waves-effect waves-light white black-text btn-block">Cancel</button>
                        </div>
                        <div className="col s6 m4 push-m4 center">
                            <button className="btn modal-close waves-effect waves-red red btn-block" onClick={this.handleConfirm}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}));