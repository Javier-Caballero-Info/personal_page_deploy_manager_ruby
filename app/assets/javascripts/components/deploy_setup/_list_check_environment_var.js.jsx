const ListCheckEnvironmentVar = (createReactClass({

    onCheckboxChange(e){
        const target = e.target;
        const env_var = JSON.parse(target.value);

        this.props.onCheckboxChange(target.checked, env_var);
    },

    render() {

        const items = this.props.listElements.map((env_var) => {
            return (
                <li className="collection-item" key={env_var.id}>
                    <p>
                        <label>
                            <input type="checkbox" value={JSON.stringify(env_var)} className="filled-in" onChange={this.onCheckboxChange}
                                   defaultChecked={this.props.selectedIds.includes(env_var.id)}/>
                            <span>{env_var.key}</span>
                        </label>
                    </p>
                </li>
            )
        });

        return (
            <ul className="collection">
                {items}
            </ul>
        )
    }

}));