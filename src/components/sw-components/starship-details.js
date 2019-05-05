import React from 'react';
import {SwapiServiceConsumer} from "../swapi-service-context";
import {Record} from "../item-details";
import ItemDetails from "../item-details";

const StarshipDetails = ({itemId}) => {
    return (
        <SwapiServiceConsumer>
            {({getStarship, getStarshipImage}) => {
                return (
                    <ItemDetails
                        itemId={itemId}
                        getData={getStarship}
                        getImageUrl={getStarshipImage}>

                        <Record field="model" label="Model"/>
                        <Record field="manufacturer" label="Manufacturer"/>
                        <Record field="costInCredits" label="Cost"/>
                    </ItemDetails>
                );
            }
            }
        </SwapiServiceConsumer>
    );
};

export default StarshipDetails;