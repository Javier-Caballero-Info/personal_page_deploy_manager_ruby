const DeployStatus =(createReactClass({
    render (){
        return (
            <span className="fix-vertical-align mr-1">
                { this.props.status === 'finished' &&
                    <i className="material-icons green-text">check_circle_outline</i>
                }
                { this.props.status === 'in_progress' &&
                <div className="preloader-wrapper small active">
                    <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                            <div className="circle"/>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"/>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"/>
                        </div>
                    </div>
                </div>
                }
                { this.props.status === 'failed' &&
                    <i className="material-icons red-text">highlight_off</i>
                }
                { this.props.status === 'draft' &&
                    <i className="material-icons grey-text">edit</i>
                }
            </span>
        );
    }
}));