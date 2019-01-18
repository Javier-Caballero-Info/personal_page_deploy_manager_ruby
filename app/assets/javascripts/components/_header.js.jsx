const Header = (createReactClass({
    componentDidMount() {
        $('.sidenav').sidenav();
    },

    getInitialState: function() {
        return {
            title: 'Deploy Manager'
        };
    },

    render() {
        return (
            <div className="navbar-fixed">
                <nav className="teal">
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo">
                            <img src="/pictures/rocket.png" alt="Rocket logo" />
                            { this.state.title }
                        </a>
                        <a href="#" data-target="mobile-menu" className="sidenav-trigger">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="right hide-on-med-and-down">
                            <li><a href="/deploys">Deploys</a></li>
                            <li><a href="/environments">Environments</a></li>
                            <li><a href="/apps">Applications</a></li>
                            <li><a href="/global_env_vars">Global Env Vars</a></li>
                        </ul>
                    </div>
                </nav>

                <div className="collection with-header sidenav" id="mobile-menu">
                    <div className="collection-header">
                        <h4>{ this.state.title }</h4>
                    </div>
                    <a href="/deploys" className="collection-item">
                        <div>Deploys
                            <span className="secondary-content"><i className="material-icons">send</i></span>
                        </div>
                    </a>
                    <a href="/environments" className="collection-item">
                        <div>Environments
                            <span className="secondary-content"><i className="material-icons">send</i></span>
                        </div>
                    </a>
                    <a href="/apps" className="collection-item">
                        <div>Applications
                            <span className="secondary-content"><i className="material-icons">send</i></span>
                        </div>
                    </a>
                    <a href="/global_env_vars" className="collection-item">
                        <div>Global Env Vars
                            <span className="secondary-content"><i className="material-icons">send</i></span>
                        </div>
                    </a>
                </div>

            </div>

        )
    }
    }));