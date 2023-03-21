import * as types from "./actionType";

const initState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    token : "",
    auth: false,
}

export const authReducer = (state=initState, {type, payload}) => {
    switch(type) {
        case types.SIGNUP_REQUEST : {
            return {
                ...initState, isLoading: true,
            }
        }

        case types.SIGNUP_SUCCESS : {
            return {
                ...initState, isSuccess: true,
            }
        }

        case types.SIGNUP_FAILURE : {
            return {
                ...initState, isError: true,
            }
        }

        case types.LOGIN_REQUEST : {
            return {
                ...initState, isLoading: true
            }
        }

        case types.LOGIN_SUCCESS : {
            return {
                ...initState, auth: true
            }
        }

        case types.LOGIN_FAILURE : {
            return {
                ...initState, isError: true
            }
        }

        default : {
            return state;
        }
    }
}