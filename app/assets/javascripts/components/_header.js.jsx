const Header = (createReactClass({
    componentDidMount() {
        $('.sidenav').sidenav();
        $(".dropdown-trigger").dropdown({ hover: false, constrainWidth: true, alignment: 'bottom', coverTrigger: false});
    },

    getInitialState: function() {
        return {
            username: decodeURIComponent(readCookie('username').replace(/\+/g, '%20')),
            title: 'Deploy Manager'
        };
    },

    render() {
        return (
            <div className="navbar-fixed">


                <ul id="dropdown1" className="dropdown-content">
                    <li>
                        <a href="/auth/logout">
                            Logout <i className="material-icons">open_in_new</i>
                        </a>
                    </li>
                </ul>

                <nav className="teal">
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo">
                            <img src="/pictures/rocket.png" alt="Rocket logo" />
                            <span className={'hide-on-small-only'}>{ this.state.title }</span>
                        </a>
                        <a href="#" data-target="mobile-menu" className="sidenav-trigger">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="right hide-on-med-and-down">
                            <li><a href="/deploys">Deploys</a></li>
                            <li><a href="/environments">Environments</a></li>
                            <li><a href="/apps">Applications</a></li>
                            <li><a href="/global_env_vars">Global Env Vars</a></li>
                            <li className="user_dropdown">
                                <a className="dropdown-trigger" href="#!" data-target="dropdown1">
                                    <i className="material-icons right">person_pin</i>
                                    { this.state.username }
                                </a>
                            </li>

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
                    <a href="/global_env_vars" className="collection-item">
                        <div>Global Env Vars
                            <span className="secondary-content"><i className="material-icons">send</i></span>
                        </div>
                    </a>
                    <a href="/auth/logout" className="collection-item">
                        <div>Logout
                            <span className="secondary-content"><i className="material-icons">open_in_new</i></span>
                        </div>
                    </a>
                </div>

            </div>

        )
    }
    }));