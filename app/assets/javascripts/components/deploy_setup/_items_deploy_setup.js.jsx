const ItemsDeploySetup = (createReactClass({
    render() {

        const items = this.props.deploy_setup_items.map((item) => {
            return (
                <li key={item.id} className="collection-item">{item.environment_var.key}</li>
            );
        });

        return(
            <ul className="collection with-header">
                <li className="collection-header">
                    <h4 className="m-0">Environments vars selected</h4>
                </li>
                {items}
            </ul>
        );
    }
}));