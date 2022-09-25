import React from "react";
import Card from 'react-bootstrap/Card';
import classes from './ProductCard.module.css'
const ProductCard = () =>{
    return(
        <Card style={{ width: '224px',height:'335px','padding':'12px','border':'none' }}>
            <Card.Img className={classes.cardImage} variant="top" src="http://klink-api.my-cmss.com/default_images/shoe1.jpg" />
            <Card.Body className={classes.cardBody}>           
            <Card.Text>
                Couple Shoes 2021 New One Man and One Woman Spring Korean
            </Card.Text>
            <Card.Text className={classes.price}>
                    Ks 3,000
            </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ProductCard;