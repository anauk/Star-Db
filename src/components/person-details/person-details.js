import React, { Component } from 'react';
import './person-details.css';
import SwapiService from "../../services/swapi-service";
import Spiner from "../random-planet/random-planet";
import ErrorButton from "../error-button";


export default class PersonDetails extends Component{
    swapiService = new SwapiService();
    state = {
        person: null,
        loading: true
    };
    componentDidMount() {
        console.log('didmount');
        this.updatePerson();
    }
    componentDidUpdate(prevProps) {
        console.log('didupdate');
        if(this.props.personId !== prevProps.personId){
            this.updatePerson();
        }
    }

    updatePerson = () => {
        const { personId } = this.props;
        if (!personId) {
            return;
        }
        this.swapiService
            .getPerson(personId)
            .then((person)=>{
                this.setState({ person,
                loading: false});
            })
    }
    render(){
        console.log('render');
        if(!this.state.person) {
            return <span>Select person from list</span>;
        }
        const { person:{id, name, gender, berthYear, eyeColor}, loading} = this.state;
        if (loading) {
            return <Spiner />
        }
        return (
            <div className="person-details card">
                <img className="person-image"
                     src={`https://starwars-visualguide.com/assets/img/characters/${this.props.personId}.jpg`}
                     alt="character"/>
            <div className="card-body">
                <h4>{name} {this.props.personId} </h4>
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
                <ErrorButton />
            </div>
            </div>

        );
    }
}