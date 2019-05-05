import React, {Component} from 'react';

import Header from '../header';

import './app.css';

import RandomPanel from "../random-planet";
import ItemDetails, {Record} from "../item-details/item-details";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import {SwapiServiceProvider} from "../swapi-service-context";

import {
    PersonDetails,
    PlanetDetails,
    StarshipDetails,
    PersonList,
    PlanetList,
    StarshipList
} from '../sw-components';

export default class App extends Component {
    swapiService = new DummySwapiService();
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
        const planet = this.state.showRandomPlanet ? <RandomPanel/> : null;
        const {
            getPerson,
            getStarship,
            getPersonImage,
            getStarshipImage,
            getAllPlanets,
            getAllPeople
        } = this.swapiService;
        const personDetails = (
            <ItemDetails
                itemId={11}
                getData={getPerson}
                getImageUrl={getPersonImage} >

                <Record field="gender" label="Gender" />
                <Record field="eyeColor" label="Eye Color" />

            </ItemDetails>
        );
        const starshipDetails = (
            <ItemDetails
                itemId={5}
                getData={getStarship}
                getImageUrl={getStarshipImage}>

                <Record field="model" label="Model" />
                <Record field="length" label="Length" />
                <Record field="costInCredits" label="Cost" />
            </ItemDetails>
        );
        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.swapiService}>
                <div className="stardb-app">
                    <Header/>
                    <PersonDetails itemId={11}/>
                    <PlanetDetails itemId={5}/>
                    <StarshipDetails itemId={9}/>

                    <PersonList>
                    </PersonList>
                    <StarshipList>
                    </StarshipList>
                    <PlanetList>
                    </PlanetList>
                </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
