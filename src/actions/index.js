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

export const loggedOut = () => {
  return{
    type: 'SIGN_OUT'
  }
};