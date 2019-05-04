import React, {Component} from 'react';
import './item-details.css';
import SwapiService from "../../services/swapi-service";
import Spiner from "../random-planet/random-planet";
import ErrorButton from "../error-button";


export default class ItemDetails extends Component {
    swapiService = new SwapiService();
    state = {
        item: null,
        image: null
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.personId !== prevProps.personId) {
            this.updateItem();
        }
    }

    updateItem() {
        const {itemId, getData, getImageUrl} = this.props;
        if (!itemId) {
            return;
        }
        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    image: getImageUrl(item)
                });
            });
    }

    render() {
        const {item, image} = this.state;
        if (!item) {
            return <span>Select person from list</span>;
        }
        const { id, name, gender, berthYear, eyeColor } = item;

        return (
            <div className="item-details card">
                <img className="item-image"
                     src={image}
                     alt="character"/>
                <div className="card-body">
                    <h4>{name} {this.props.itemId} </h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>{gender}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year</span>
                            <span>{berthYear}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye Color</span>
                            <span>{eyeColor}</span>
                        </li>
                    </ul>
                    <ErrorButton/>
                </div>
            </div>
        );
    }
}