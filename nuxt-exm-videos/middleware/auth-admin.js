export default async function ({$auth,next}) {
    let user = $auth.state.user;
    if(user && user.roles.admin){

    }else{
        console.log("esto contiene usuario: "+user.roles.admin);
        console.log(user);
        
        next('/')
    }
}