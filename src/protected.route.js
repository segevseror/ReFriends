import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import auth from './auth';

export const ProtectedRoute = ({component: Comment, ...rest}) => {
    return <Route {...rest}
                  render={props => {
                      if (auth.isAuthenticated()) {
                          return <Comment {...props}/>
                      } else {
                          return <Redirect to={'/login'}/>
                      }

                  }
                  }
    />

};
