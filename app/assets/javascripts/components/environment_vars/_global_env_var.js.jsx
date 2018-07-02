const GlobalIndexEnvVars = (createReactClass({

    render() {
        return (
            <div className="body">
                <Header/>
                <main>
                    <div className="container">
                        <h1 className="header">Global Environment Vars</h1>
                        <IndexEnvVars/>
                    </div>
                </main>
                <Footer/>
            </div>
        )
    }

}));