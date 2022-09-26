import { useSelector } from 'react-redux';
import { Button, Row, Col, Image, InputGroup, Form } from 'react-bootstrap';
import classes from "./SideBar.module.css"
import React from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

const Cart = () => {
  const dispatch = useDispatch();

  const items =useSelector(state=>state.cart.items);  
  const reduceItemHandler=(id)=>{
    dispatch(cartActions.removeItemCart(id));
  };
  const addItemHandler=(item)=>{
    dispatch(cartActions.addItemToCart({
        id:item.id,
        name:item.name,
        image:item.image,
        price:item.price,
        currency:item.currency
    }));
  }
  return (
    <React.Fragment>
        {
            items.length > 0 ? 
            (
                items.map((item)=>(
                    <Row className="p-2 pt-5 text-black" key={item.id}>            
                        <Col xs lg="4 m-auto">
                            <Image src={item.image} thumbnail></Image>                        
                        </Col>
                        <Col xs lg="7">
                            <span className={classes.cartText}>{item.name}</span>  
                            <Row>
                                <Col xs lg="7">
                                    <InputGroup className="mb-3">
                                        <Button className={classes.iconText}   onClick={reduceItemHandler.bind(null,item.id)} variant="outline-secondary" id="button-addon1">
                                        -
                                        </Button>
                                        <Form.Control aria-label="Amount (to the nearest dollar)" value={item.quantity}/>
                                        <Button className={classes.iconText} onClick={addItemHandler.bind(null,item)} variant="outline-secondary" id="button-addon1">
                                        +
                                        </Button>
                                    </InputGroup>
                                </Col>
                                <Col  xs lg="4" className='m-auto p-0'>
                                    <span className={classes.cartCurrency}>{item.currency} </span>
                                    <span className={classes.cartPrice}>{item.totalPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                </Col>
                            </Row>
                                            
                        </Col>
                        <Col xs lg="1">                  
                            <span className={classes.crossText}>X</span>
                        </Col>
                </Row>
                ))
            )
            :
            <Row className="p-2 pt-5 text-black text-center">   
                <Col className={`m-auto ${classes.title}`}>Empty Cart</Col>
            </Row>
            
        }

    </React.Fragment>
    
    
  );
};

export default Cart;