import React from "react";
import classes from '../Layout/Content.module.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useDispatch } from "react-redux";
import {searchActions} from "../../store/search-slice"
const CategoryList = (props) => {
    const dispatch = useDispatch();

    const categoryClickHandler=(id)=>{
        dispatch(searchActions.setCategoryID(id));
    };  
    return(
        <OwlCarousel className='owl-theme' items={3} dots={false} autoWidth={true} margin={10}>
                <div className='item'>
                    <span onClick={categoryClickHandler.bind(null,0)} className={`badge badge-pill ${classes.badges} bgPrimary textBgPrimary`}>All</span>
                </div>
                {
                    
                    props.categoryData.map((category)=>(
                                                <div className='item' key={category.id}>
                                                    <span onClick={categoryClickHandler.bind(null,category.id)} className={`badge badge-pill ${classes.badges} bgSecoundary textBgSecoundary`}>{category.name}</span>
                                                </div>
                    ))
                }
        </OwlCarousel>
    )
}

export default CategoryList;