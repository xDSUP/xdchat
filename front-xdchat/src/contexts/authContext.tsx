import React, {createContext, useContext, useState} from 'react';
import {Navigate, useLocation} from "react-router-dom";

interface User {
    username: string;
}

interface AuthContextValue {
    user: User | null;
    signin: (user: string) => Promise<User>;
    signout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
    user: null,
    signin: (user: string) => Promise.reject("Not initial"),
    signout: () => Promise.reject("Not initial"),
});

const AuthProvider = (props: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const signin = (username: string) => new Promise<User>((resolve) => {
        const user = {username};
        setTimeout(() => {
            setUser(user);
            console.log(`auth.signin(${username}) success!`);
            setTimeout(() => resolve(user), 1)
        }, 100);
    });

    const signout = () => new Promise<void>((resolve) => {
        setTimeout(() => {
            setUser(null)
            setTimeout(() => resolve(), 1)
        }, 100);
    });

    return <AuthContext.Provider value={{user, signin, signout}}>{props.children}</AuthContext.Provider>;
};

function useAuth() {
    return useContext(AuthContext);
}

function useAuthorizedUser(): NonNullable<User> {
    let user = useAuth().user;
    if (!user)
        throw new Error("User not auth!")
    return user;
}

function RequireAuth({children}: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.user) {
        console.log("You is not auth, navigate to login")
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return children;
}

export {AuthProvider, useAuth, RequireAuth, useAuthorizedUser}