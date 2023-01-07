const initialState={
    list:[]
}

const loginreducer=(state=initialState,action)=>{
    switch (action.type)
    {
        case "Login":
            const {email,password,username}=action.payload;
            return {
                ...state,
                list: [
                    ...state.list,
                    {
                        email:email,
                        password:password,
                        username:username
                    }
                ]
                
            }
            
        default:return state;     
    }
}

export default loginreducer;