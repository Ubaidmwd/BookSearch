export const loginsys=(email,password,username)=>{
    
    return{
        type:"Login",
        payload:{
            email:email,
            password:password,
            username:username
        }
        
    }
    
}

