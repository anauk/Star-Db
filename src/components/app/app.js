import React, {Component} from 'react';
import Header from '../header';

import './app.css';

import RandomPanel from "../random-planet";
import ItemDetails from "../item-details";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import Row from "../row";
import {Record} from "../item-details/item-details";

export default class App extends Component {
    swapiService = new SwapiService();
    state = {
        showRandomPlanet: true
    };
    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    render() {
        const {
            getPerson,
            getStarship,
            getPersonImage,
            getStarshipImage,
            getPlanetImage
        } = this.swapiService;
        const personDetails = (
            <ItemDetails itemId={11}
                         getData={getPerson}
                         getImageUrl={getPersonImage}>
                <Record field="gender" label="Gender"/>
                <Record field="eyeColor" label="Eye Color"/>
            </ItemDetails>
        );
        const starshipDetails = (
            <ItemDetails itemId={5}
                         getData={getStarship}
                         getImageUrl={getStarshipImage}>
                <Record field="model" label="Model"/>
                <Record field="manufacturer" label="Manufacturer"/>
                <Record field="costInCredits" label="Cost"/>
            </ItemDetails>
        )
        const planet = this.state.showRandomPlanet ? <RandomPanel/> : null;
        return (
            <ErrorBoundry>
                <div className="stardb-app">
                    <Header/>

                    <Row left={personDetails}
                         rigth={starshipDetails}/>

                </div>
            </ErrorBoundry>
        );
    }
}
