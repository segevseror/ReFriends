export const userNameState = (name) => {
         return {
           type: "setName",
           name: name
         };
       };

export const loggedReducer = ()=>{
  return {
    type: 'SIGN_IN'
  }
};
export const logOutReducer = ()=>{
    return {
        type: 'SIGN_OUT'
    }
};

export const loggedOut = () => {
  return{
    type: 'SIGN_OUT'
  }
};
