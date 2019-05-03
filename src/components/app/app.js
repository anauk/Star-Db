import React, { Component } from 'react';
import Header from '../header';

import './app.css';

import RandomPanel from "../random-planet";
import ErrorButton from "../error-button";
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page";

export default  class App extends Component {
    state = {
        showRandomPlanet: true,
        hasError: false
    };
    toggleRandomPlanet = () =>{
        this.setState((state)=>{
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    componentDidCatch() {
        console.log('didCatch()');
        this.setState({hasError: true});
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator/>
        }
        const planet = this.state.showRandomPlanet?<RandomPanel/>:null;
        return (
            <div>
                <Header/>
                {planet}
                <button className="toggle-planet btn btn-warning btn-lg"
                onClick={this.toggleRandomPlanet}>
                    Toggle Random Planet
                </button>
                <ErrorButton />
                <PeoplePage/>
                <PeoplePage/>
                <PeoplePage/>
            </div>
        )
    }
}
