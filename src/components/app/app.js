import React, { Component } from 'react';
import Header from '../header';

import './app.css';
import ItemList from "../item-list";
import RandomPanel from "../random-planet";
import PersonDetails from "../person-details";

export default  class App extends Component {
    state = {
        showRandomPlanet: true,
        selectedPerson: 1
    };
    toggleRandomPlanet = () =>{
        this.setState((state)=>{
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };
    onPersonSelected = (id) =>{
        this.setState({
            selectedPerson: id
        });
    };
    render() {
        const planet = this.state.showRandomPlanet?<RandomPanel/>:null;
        return (
            <div>
                <Header/>
                {planet}
                <button className="toggle-planet btn btn-warning btn-lg"
                onClick={this.toggleRandomPlanet}>
                    Toggle Random Planet
                </button>

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList onItemSelected={this.onPersonSelected}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId = {this.state.selectedPerson} />
                    </div>
                </div>
            </div>
        )
    }
}
