import React from 'react';

const Test = (props) => {


  const configFetch = {
    method: 'GET',
    credentials: 'include',
    mode: 'cors'
  };
  fetch(global.config.urlRequest + '/user/logout', configFetch)
    .then(response => response.json())
    .then(data => {
      console.log('logout', data);

    });

  return true;

};

export default Test;