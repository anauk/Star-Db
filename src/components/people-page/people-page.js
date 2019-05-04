import React, {Component} from 'react';

import './people-page.css';
import ItemList from "../item-list/item-list";
import PersonDetails from "../item-details/item-details";
import ErrorIndicator from "../error-indicator/error-indicator";
import SwapiService from "../../services/swapi-service";
import Row from "../row";
import ErrorBoundry from "../error-boundry";

export default class PeoplePage extends Component {
    swapiService = new SwapiService();
    state = {
        selectedPerson: 3
    };
    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        });
    };

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator/>
        }
        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}
                renderItem={({name, gender, birthYear}) => (`${name}: ${gender}, ${birthYear}`)}
            />
        );
        const personDetails = (
            <ErrorBoundry>
            <PersonDetails personId={this.state.selectedPerson}/>
            </ErrorBoundry>
        );
        return (
            <Row left={itemList} rigth={personDetails}/>
        );
    }
}