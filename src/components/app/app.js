import React, {Component} from 'react';

import Header from '../header';

import './app.css';

import RandomPanel from "../random-planet";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import ErrorBoundry from "../error-boundry";
import {SwapiServiceProvider} from "../swapi-service-context";

import {PeoplePage, PlanetPage, StarshipPage} from "../pages";

export default class App extends Component {

    state = {
        swapiService: new DummySwapiService()
    };
    onServiceChange = () => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService ?
                DummySwapiService : SwapiService;
            console.log('switched to', Service.name);
            return {
                swapiService: new Service()
            }
        });
    };

    render() {
        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <div className="stardb-app">
                        <Header onServiceChange={this.onServiceChange}/>
                        <RandomPanel />

                        <PeoplePage/>
                        <PlanetPage/>
                        <StarshipPage/>

                    </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
