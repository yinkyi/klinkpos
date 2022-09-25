import React,{useEffect} from 'react';
import { Row,Col,InputGroup,FormControl,Button, Container } from 'react-bootstrap';
import useHttp from "../../hooks/use-http";
import { getCategories } from "../../lib/api";
import ProductList from './ProductList';
// import CategoryList from '../Category/CategoryList';
import {useSelector } from "react-redux";


const MainLayout = (props) => {  
  const token = useSelector(state=>state.auth.token);
  const {sendRequest,data:categoryData,status} = useHttp(getCategories);
    useEffect(()=>{
        sendRequest({
          apiToken:token
        });
    },[])
    let category_context;
    if(status === "pending"){
      category_context = "Loading Categories..."
    }    
    else if(status==="completed" && (categoryData && categoryData.length>0)){    
      // dispatch(packSliceActions.setClassPack(classPackData));     
      category_context = "hey";
      // category_context = <CategoryList categoryData={categoryData}></CategoryList>;
  
                          console.log(category_context);    
    }else if(status==="completed" && (!categoryData && categoryData.length === 0 )) {
      category_context = <p>No category!!</p>;
    }
  return (
    <Container id="content" className="p-4 p-md-5 pt-5">
      <Row>
        <Col>
          <img src="../../kLink-bule.png" style={{width: '150px',height:'35px'}} alt="logo" />
        </Col>
        <Col>
          <InputGroup className="mb-3" style={{width: '488px'}}>
            <FormControl placeholder="Search" style={{color:"#667085"}} />       
            <Button variant="outline-primary" style={{backgroundColor:'#2E3EA1',color:'white'}}><i className="fa fa-search" aria-hidden="true"></i></Button>
          </InputGroup>
        </Col>
      </Row>    
      <Row>
        <Col>     
                {category_context}{status}
        </Col>
      </Row>
      <Row>
            <ProductList />
      </Row>
    </Container>
  );
};

export default React.memo(MainLayout);
