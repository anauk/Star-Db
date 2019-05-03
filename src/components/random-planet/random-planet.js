import React, {Component} from 'react';
import './random-planet.css';

import SwapiService from '../../services/swapi-service';
import Spiner from "../spiner";
import ErrorIndicator from "../error-indicator";

export default class RandomPanel extends Component {
    swapiService = new SwapiService();

    state = {
        id: null,
        name: null,
        population: null,
        rotationPeriod: null,
        diameter: null,
        loading: true,
        error: null
    };
    componentDidMount(){
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, 2500);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onError = (error) => {
        this.setState( {
            error: true,
            loading: false
        });
    }

    updatePlanet = () =>{
        console.log('update');
        const id = Math.floor(Math.random()*25)+2;
        this.swapiService
            .getPlanet(id)
            .then((planet) => {
                this.setState({
                    id,
                    name: planet.name,
                    population: planet.population,
                    rotationPeriod: planet.rotation_period,
                    diameter: planet.diameter,
                    loading: false,
                    error: false
                });
            })
            .catch(this.onError);
    }

    render() {
        const { id, name, population, rotationPeriod, diameter, loading, error} = this.state;
        if (loading) {
            return <Spiner />
        }
        const errorMassage = error?<ErrorIndicator/>:null;
        return (
            <div className="random-planet jumbotron rounded">
                {errorMassage}
                <img className="planet-image" src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="Not found"/>
                <div>
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Population</span>
                            <span> {population} </span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Rotation Period</span>
                            <span> {rotationPeriod} </span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Diameter</span>
                            <span> {diameter} </span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}



