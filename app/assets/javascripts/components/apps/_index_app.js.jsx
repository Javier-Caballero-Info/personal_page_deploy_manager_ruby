const IndexApp = (createReactClass({

    handleSubmit(app) {
        var newState = this.state.apps.concat(app);
        this.setState({ apps: newState })
    },

    getInitialState() {
        return { apps: [] };
    },

    componentDidMount() {
        $.getJSON("/api/v1/apps.json", response => {
            this.setState({ apps: response });
        });
    },

    render() {
        return (
            <div>
                <NewApp handleSubmit={this.handleSubmit}/>
                <AllApps apps={this.state.apps}/>
            </div>
        )
    }
}));