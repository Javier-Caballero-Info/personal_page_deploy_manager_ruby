var AllApps = (createReactClass({

    getInitialState() {
        return { apps: [] }
    },

    componentDidMount() {
        $.getJSON('/api/v1/apps.json', (response) => { this.setState({ apps: response }) });
    },

    render() {
        const apps = this.props.apps.map((app) => {
            return (
                <div key={app.id}>
                    <h3>{app.name}</h3>
                    <p>{app.description}</p>
                </div>
            )
        });

        return(
            <div>
                {apps}
            </div>
        )
    }
}));