import React, {Component} from 'react';

import Header from '../header';

import './app.css';

import RandomPanel from "../random-planet";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import ErrorBoundry from "../error-boundry";
import {SwapiServiceProvider} from "../swapi-service-context";

import {
    PeoplePage,
    PlanetPage,
    StarshipPage,
    LoginPage,
    SecretPage
} from "../pages";

import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import StarshipDetails from "../sw-components/starship-details";

export default class App extends Component {

    state = {
        swapiService: new SwapiService(),
        isLoggedIn: false
    };
    onLogin = () => {
        this.setState({
            isLoggedIn: true
        })
    }
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
        const {isLoggedIn} = this.state;
        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Router>
                        <div className="stardb-app">
                            <Header onServiceChange={this.onServiceChange}/>
                            <RandomPanel/>
                            <Switch>
                                <Route path="/" render={() => <h2>Welcome to Star DB!</h2>}
                                       exact/>
                                <Route path="/people/:id?" component={PeoplePage}/>
                                <Route path="/planets" component={PlanetPage}/>
                                <Route path="/starships" exact component={StarshipPage}/>
                                <Route path="/starships/:id"
                                       render={({match}) => {
                                           const {id} = match.params;
                                           console.log(match);
                                           return <StarshipDetails itemId={id}/>
                                       }}/>

                                <Route path="/login"
                                       render={() => (
                                           <LoginPage
                                               isLoggedIn={isLoggedIn}
                                               onLogin={this.onLogin}/>
                                       )}/>
                                <Route path="/secret"
                                       render={() => (
                                           <SecretPage isLoggedIn={isLoggedIn}/>
                                       )}/>

                                {/*<Redirect to="/"/>*/}
                                <Route render={()=><h3>Page not found!</h3>}/>
                            </Switch>

                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
