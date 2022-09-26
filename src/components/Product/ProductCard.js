import React from "react";
import Card from 'react-bootstrap/Card';
import classes from './ProductCard.module.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

const ProductCard = (props) =>{   
    const dispatch = useDispatch();
    const { id,name, image, price, currency } = props.product;
    const addItemHandler=()=>{
        dispatch(cartActions.addItemToCart({
            id,
            name,
            image,
            price,
            currency
        }));
      }

    return(
        <Card style={{ width: '224px',height:'335px','padding':'12px','border':'none' }}>
            <Card.Img className={classes.cardImage} variant="top" src={image} onClick={addItemHandler} />
            <Card.Body className={classes.cardBody}>           
            <Card.Text>
                {name}
            </Card.Text>
            <Card.Text className={classes.price}>
                    {currency} {price.toLocaleString(undefined, { maximumFractionDigits: 2 })}                
            </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ProductCard;