const { createContext, useReducer, useContext } = require("react");

const AppContext = createContext();

let initialState = {
    cartQty: 0,
    isLogin: false,
    isStore: false,
    emptyPackage: false,
    memberDetail: "",
    dateExpire : 0
}

function reducer(state, action) {
    switch (action.type) {
        case "cartQty":
            return { ...state, cartQty: action.data };
        case "isLogin":
            return { ...state, isLogin: action.data };
        case "isStore":
            return { ...state, isStore: action.data };
        case "memberDetail":
            return { ...state, memberDetail: action.data };
        case "emptyPackage":
            return { ...state, emptyPackage: action.data };
        case "dateExpire":
            return { ...state, dateExpire: action.data };
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
        isLogin: {
            get_login: state.isLogin,
            set_login: (params) => {
                dispatch({ type: "isLogin", data: params })
            }
        },
        isStore: {
            get_isStore: state.isStore,
            set_isStore: (params) => {
                dispatch({ type: 'isStore', data: params })
            }
        },
        memberDetail: {
            get_memberDetail: state.memberDetail,
            set_memberDetail: (params) => {
                dispatch({ type: "memberDetail", data: params })
            }
        },
        emptyPackage: {
            get_emptyPackage: state.emptyPackage,
            set_emptyPackage: (params) => {
                dispatch({ type: "emptyPackage", data: params })
            }
        },
        dateExpire: {
            get_dateExpire: state.dateExpire,
            set_dateExpire: (params) => {
                dispatch({ type: "dateExpire", data: params })
            }
        }
    }
    // console.log(state);
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
    return useContext(AppContext);
}