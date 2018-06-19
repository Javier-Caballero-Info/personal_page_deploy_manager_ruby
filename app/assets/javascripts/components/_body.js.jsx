const Body = (createReactClass({

    render() {
        return (
            <section className="mdl-components__page mdl-grid is-active">
                <div className="mdl-cell mdl-cell--12-col">
                <div className="demo-card-wide mdl-card mdl-shadow--2dp">
                    <div className="mdl-card__title">
                        <h2 className="mdl-card__title-text">Welcome</h2>
                    </div>
                    <div className="mdl-card__supporting-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris sagittis pellentesque lacus eleifend lacinia...
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                            Get Started
                        </a>
                    </div>
                    <div className="mdl-card__menu">
                        <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                            <i className="material-icons">share</i>
                        </button>
                    </div>
                </div>

                <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp full-width-table" >
                    <thead>
                    <tr>
                        <th className="mdl-data-table__cell--non-numeric">Material</th>
                        <th>Quantity</th>
                        <th>Unit price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="mdl-data-table__cell--non-numeric">Acrylic (Transparent)</td>
                        <td>25</td>
                        <td>$2.90</td>
                    </tr>
                    <tr>
                        <td className="mdl-data-table__cell--non-numeric">Plywood (Birch)</td>
                        <td>50</td>
                        <td>$1.25</td>
                    </tr>
                    <tr>
                        <td className="mdl-data-table__cell--non-numeric">Laminate (Gold on Blue)</td>
                        <td>10</td>
                        <td><p className="mdl-spinner mdl-js-spinner mdl-spinner--single-color is-active"></p></td>
                    </tr>
                    </tbody>
                </table>
                    <form action="#">
                        <div className="mdl-textfield mdl-js-textfield">
                            <input className="mdl-textfield__input" type="text" id="sample1"/>
                                <label className="mdl-textfield__label" htmlFor="sample1">Text...</label>
                        </div>
                        <div className="mdl-textfield mdl-js-textfield">
                            <select>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                            <label className="mdl-textfield__label" htmlFor="sample1">Text...</label>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}));