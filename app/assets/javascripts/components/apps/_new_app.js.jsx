var NewApp = (createReactClass({
    handleClick() {
        var name = this.refs.name.value;
        var description = this.refs.description.value;
        $.ajax({
            url: "/api/v1/apps",
            type: "POST",
            data: { app: { name: name, description: description } },
            success: (app) => {
                this.refs.name.value = "";
                this.refs.description.value = "";
                this.props.handleSubmit(app);
            }
        });
    },
    render() {
        return (
            <div>
                <input ref="name" placeholder="Enter the name of the item" />
                <input ref="description" placeholder="Enter a description" />
                <button onClick={this.handleClick}>Submit</button>
            </div>
        );
    }
}));