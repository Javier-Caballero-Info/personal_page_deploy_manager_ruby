const ItemsDeploySetup = (createReactClass({
    render() {

        const items = this.props.deploy_setup_items.map((item) => {
            return (
                <li key={item._id.$oid} className="collection-item">{item.environment_var.key}</li>
            );
        });

        return(
            <ul className="collection">
                {items}
            </ul>
        );
    }
}));