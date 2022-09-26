import React,{useEffect, useRef} from 'react';
import { Row,Col,InputGroup,FormControl,Button, Container } from 'react-bootstrap';
import useHttp from "../../hooks/use-http";
import { getCategories} from "../../lib/api";
import CategoryList from '../Category/CategoryList';
import {useDispatch, useSelector } from "react-redux";
import ProductList from '../Product/ProductList';
import {searchActions} from "../../store/search-slice"

const Content = () => {  
  const dispatch = useDispatch();
  const token = useSelector(state=>state.auth.token);
  const {sendRequest,data:categoryData,status} = useHttp(getCategories);
  const searchTextInputRef = useRef('');

  const searchClickHandler=()=>{
    dispatch(searchActions.setProductName(searchTextInputRef.current.value));
  };
  useEffect(()=>{
      sendRequest({
        apiToken:token
      });
  },[])

  let category_context;

  if(status === "pending"){
    category_context = "Loading Categories..."
  }    
  else if(status==="completed" && (categoryData && categoryData !== null && categoryData.length>0)){    
      category_context = <CategoryList categoryData={categoryData}></CategoryList>;
    
  }else if(status==="completed" && (categoryData === null && categoryData.length === 0 )) {
    category_context = <p>No category!!</p>;
  }


  return (
    <Container id="content" className="pt-5">
      <Row className="pr-2">
        <Col>
          <img src="../../kLink-bule.png" style={{width: '150px',height:'35px'}} alt="logo" />
        </Col>
        <Col>
          <InputGroup className="mb-3" style={{width: '488px'}}>
            <FormControl placeholder="Search" style={{color:"#667085"}} ref={searchTextInputRef}/>       
            <Button onClick={searchClickHandler} variant="outline-primary" style={{backgroundColor:'#2E3EA1',color:'white'}}><i className="fa fa-search" aria-hidden="true"></i></Button>
          </InputGroup>
        </Col>
      </Row>    
      <Row style={{'maxWidth':'1000px'}}>
        <Col>     
                {category_context}
        </Col>
      </Row>
      
            <ProductList />
      
    </Container>
  );
};

export default React.memo(Content);
