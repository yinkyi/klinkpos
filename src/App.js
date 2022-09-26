import './App.css';
import React from 'react';
import { Switch,Route,Redirect } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import { useEffect } from 'react';

function App() {
  const isAuth = useSelector(state=>state.auth.isAuth);
  const expiredIn = useSelector(state=>state.auth.expiredIn);
  const dispatch = useDispatch();
  
  useEffect(
    () => {
      if (isAuth) {
        const identity =  setTimeout(
          () => {
            dispatch(authActions.logout());
          },
          expiredIn
        );
       dispatch(authActions.setTimer(identity));
        
      }
      
    },
    // respond to changes in isLoggedIn
    [dispatch,isAuth,expiredIn]
  );

  return (    
    <Switch>
        <Route path='/' exact>
            <HomePage/>
        </Route>             
        <Route path='*'>
          <Redirect to="/"/>
        </Route>
    </Switch>
  
  );
}

export default App;
