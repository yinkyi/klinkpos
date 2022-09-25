import { Fragment} from 'react';
import LoginCard from '../Card/LoginCard';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActions } from '../../store/auth';
import HomePage from '../Product/HomePage';
const Layout = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuth = useSelector(state=>state.auth.isAuth);

 const successLogin = (data)=>{
  dispatch(authActions.login({
    token:data.access_token,
    expiredTime:data.expires_at
  })); 
  let currentPath = '/';
  history.replace(currentPath);
  // setTimeout(() => {
  //     history.go(currentPath)
  // }, 0)
 };

  return ( 
    <Fragment>
      {!isAuth 
        ? 
      <LoginCard onSuccessLogin={successLogin}/>
        :
      <HomePage />}     
    </Fragment>
  );
};

export default Layout;
