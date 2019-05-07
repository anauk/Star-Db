import React, {Component} from 'react';
import {StarshipDetails, StarshipList} from "../sw-components";
import Row from "../row";

export default class StarshipPage extends Component {
    state = {
        selectedItem: null
    };
    onItemSelected = (selectedId)=> {
        this.setState({selectedId});
    }
    render() {
        const { selectedItem } = this.state;
        return (
            <Row left={<StarshipList onItemSelected={this.onItemSelected}/>}
                 right={<StarshipDetails itemId={this.state.selectedItem}/>}
            />
        );
    }
}