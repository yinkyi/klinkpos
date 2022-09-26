import React,{useState} from "react";
import classes from '../Layout/Content.module.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useDispatch, useSelector } from "react-redux";
import {searchActions} from "../../store/search-slice";

const CategoryList = (props) => {
    const dispatch = useDispatch();    
    const search_category_id = useSelector(state=>state.search.category_id);
    const [active, setActive] = useState(search_category_id);

    const categoryClickHandler= async (id)=>{
        await setActive(id);
        dispatch(searchActions.setCategoryID(id));
    };  
    return(        
        <OwlCarousel className='owl-theme' items={3} dots={false} autoWidth={true} margin={10}>                
                <div className='item'>
                    <span onClick={categoryClickHandler.bind(null,0)} className={`badge badge-pill ${classes.badges} ${active > 0?'bgSecoundary textBgSecoundary':'bgPrimary textBgPrimary'}`}>All</span>
                </div>
                {
                    
                    props.categoryData.map((category)=>(
                                                <div className='item' key={category.id}>
                                                    <span onClick={categoryClickHandler.bind(null,category.id)} className={`badge badge-pill ${classes.badges} ${active === category.id?'bgPrimary textBgPrimary':'bgSecoundary textBgSecoundary'}`}>{category.name}</span>
                                                </div>
                    ))
                }
        </OwlCarousel>
    )
}

export default React.memo(CategoryList);