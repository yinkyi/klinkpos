import React, { useEffect, useRef } from 'react';
import useHttp from '../../hooks/use-http';
import { authLogin } from '../../lib/api';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import classes from './Login.module.css';

const LoginCard = (props) => {
  console.log("Logincard",props);
  const {sendRequest,data,error,status} = useHttp(authLogin);
  const emailInputRef = useRef('');
  const passwordInputRef = useRef('');

  const onSubmitHandler = (event)=>{
    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    sendRequest({
          email,
          password
    })
   
  }
  useEffect(()=>{
    if(status === "completed" && !error){  
      props.onSuccessLogin(data);
    }
  },[status,error,data,props])
 
  
  return (
    <Container className={`m-auto ${classes["gradient-form"]}`}>
      <Row>
        <Col className="mb-5">       
          <div className={`d-flex flex-column  justify-content-center  ${classes["gradient-custom-2"]} h-100 mb-4`}>          
            <img src="../../kLink.png"
            style={{width: '150px',height:'35px',marginTop:'32px',marginLeft:'32px'}} alt="logo" />
          
            <Row className={`${classes["middle-body"]} text-white px-3 py-4 p-md-5 mx-md-4`}>              
              <div className="text-center pt-1 mb-2 pb-1">
                <span className={`fa fa-star ${classes["checked"]}`}></span>
                <span className={`fa fa-star ${classes["checked"]}`}></span>
                <span className={`fa fa-star ${classes["checked"]}`}></span>
                <span className={`fa fa-star ${classes["checked"]}`}></span>
                <span className={`fa fa-star ${classes["checked"]}`}></span>
              </div>
              <div className="text-center pt-1 mb-2 pb-1">
                <p className={classes["para-login"]}>
                KLink has saved us thousands of hours of work.
                We're able to spin up projects and features much faster.
                </p>
              </div>
              <div className="text-center pt-1 mb-2 pb-1">
                <img src="/avatar.png" alt="logo" />
                <p className="avatar-text">Lori Bryson</p>
                <p className={classes["supporting-text"]}>Product Designer, Sisyphus</p>
              </div>
            </Row>
            <Row className={classes.footer}>
              <Col><span>© klinkenterprise.com</span></Col>
              <Col className={classes["footer-right"]}><span><span className="fa fa-envelope"></span> help@klinkenterprise.com</span></Col>
            </Row>
          </div>

        </Col>
        <Col className="m-auto">
          <div className="d-flex flex-column ms-5">

            <div className="text-left mb-3">            
              <h4 className="mt-1 pb-1">Log in</h4>
              <p>Please login to your account</p>
            </div>
            <Form onSubmit={onSubmitHandler}>
              { error &&  <div>
                <p className="text-center text-red-500" >{error}</p>
              </div>}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email address" ref={emailInputRef} id='email'/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="••••••••" ref={passwordInputRef} id='password'/>
              </Form.Group>
              <div className="text-left pt-1 mb-5 pb-1">
                <Button type="submit" className="mb-4 w-50 gradient-custom-2">Sign in</Button>
              </div>
            </Form>
          


          </div>

        </Col>

        

      </Row>

    </Container>
  )
}
export default React.memo(LoginCard)
