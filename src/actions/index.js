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

}