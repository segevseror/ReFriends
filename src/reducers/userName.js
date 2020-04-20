const userNameState = (name = '' , action) =>{
  switch (action.type) {
    case 'setName':
      return name = action.name;
    default:
      return name;
  }
};

export default userNameState;