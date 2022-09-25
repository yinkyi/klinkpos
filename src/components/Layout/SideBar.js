import React from 'react';
import { Button, Row, Col,Container } from 'react-bootstrap';
import classes from "./SideBar.module.css"
const SideBar = (props) => {  
    console.log("Sidebar");
  return (
    <nav id="sidebar">
        <Container fluid>
            <Row className="p-4 pt-5">            
                    <Col>
                        <h5 className={classes.title}>Order details</h5>                        
                    </Col>
            </Row>
            <Row>
                <Col className='bgPrimary25 w-100'>
                <form action="#" className="subscribe-form textGray600">
                        <Row className='pt-2'>
                            <Col>
                                SubTotal
                            </Col>
                            <Col className='text-right'>
                                Ks 9,000
                            </Col>
                        </Row>
                        <Row className='pt-2'>
                            <Col>
                                Tax (5%)
                            </Col>
                            <Col className='text-right'>
                                Ks 450
                            </Col>
                        </Row>
                        <hr className='textGray300' style={{ 'borderTop':'1px dotted #000'}}/>
                        <Row className='pb-2'>
                            <Col>
                                Total
                            </Col>
                            <Col className='text-right'>
                                ks 9,450
                            </Col>
                        </Row>
                        <Row  className="text-left pt-1 pb-1">
                            <Col>
                                    <Button type="submit" className= {`mb-2 bgPrimary ${classes.payNowBtn}`}>Pay Now</Button>
                            </Col>
                        </Row>
                
                </form>
            </Col>
        </Row>
        </Container>        
     
    </nav>
  );
};

export default React.memo(SideBar);
