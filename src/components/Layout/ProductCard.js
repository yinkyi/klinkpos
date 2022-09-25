import React from "react";
import Card from 'react-bootstrap/Card';
import classes from './ProductCard.module.css'
const ProductCard = (props) =>{
    return(
        <Card style={{ width: '224px',height:'335px','padding':'12px','border':'none' }}>
            <Card.Img className={classes.cardImage} variant="top" src={props.product.image} />
            <Card.Body className={classes.cardBody}>           
            <Card.Text>
                {props.product.name}
            </Card.Text>
            <Card.Text className={classes.price}>
                    {props.product.currency} {props.product.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}                
            </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ProductCard;