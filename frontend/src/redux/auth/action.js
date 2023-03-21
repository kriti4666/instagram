import * as types from "./actionType";

export const register = (cred) => async (dispatch)=> {
    try {
        dispatch({type: types.SIGNUP_REQUEST});
        let data = await fetch("mongodb+srv://kriti:kriti@cluster0.jxvc56p.mongodb.net/insta/user/signup", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(cred)
        })
        data = await data.json()
        dispatch({type: types.SIGNUP_SUCCESS({payload: data})})
    } catch (error) {
        dispatch({type: types.SIGNUP_FAILURE})
    }
    
}

export const authenticate = (cred) => async (dispatch)=> {
    try {
        dispatch({type: types.LOGIN_REQUEST});
        let data = await fetch("mongodb+srv://kriti:kriti@cluster0.jxvc56p.mongodb.net/insta/user/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(cred)
        })
        data = await data.json()
        dispatch({type: types.LOGIN_SUCCESS({payload: data})})
    } catch (error) {
        dispatch({type: types.LOGIN_FAILURE})
    }
}