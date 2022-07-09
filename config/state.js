const { createContext, useReducer, useContext } = require("react");

const AppContext = createContext();

let initialState = {
    cartQty: 0,
    cartObj: [],
    isLogin: 0
}

function reducer(state, action) {
    switch (action.type) {
        case "cartQty":
            return { ...state, cartQty: action.data };
        case "cartObj":
            return { ...state, cartObj: action.data };
        case "isLogin":
            return { ...state, isLogin: action.data }
        default:
            return state;
    }
}

export function AppWrapper({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {
        cartQty: {
            get_cart_qty: state.cartQty,
            set_cart_qty: (params) => {
                dispatch({ type: "cartQty", data: params })
            }
        },
        cartObj: {
            get_value: state.cartObj,
            set_value: (params) => {
                dispatch({ type: "cartObj", data: params })
            }
        },
        isLogin: {
            get_login: state.isLogin,
            set_login: (params) => {
                dispatch({ type: "isLogin", data: params })
            }
        }
    }

    // console.log(state);
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
    return useContext(AppContext);
}