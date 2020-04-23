class Auth {
    constructor(){
        this.authenticated = false;
    }

    login(cl){
        this.authenticated = true;
        cl();
    }
    logout(cl){
        this.authenticated = false;
        cl();
    }
    isAuthenticated(){
        return this.authenticated;
    }
}
export default new Auth();
