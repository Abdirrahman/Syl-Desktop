import React, { createContext, useContext, useEffect, useState } from "react";
import PocketBase from 'pocketbase'

// const [currentUser, setCurrentUser] = useState(null)

export const pb = new PocketBase('http://127.0.0.1:8090')

// export const currentUser = pb.authStore.model


interface AuthProps {
    email : string,
    password: string
}

export const currentUser = pb.authStore.model

const AuthStateContext = createContext({})

export const useAuth = () => useContext<any>(AuthStateContext)

export const AuthContextProvider = ({
    children,

}: {
    children: React.ReactNode
}) => {

    const [user, setUser] = useState<any>({ email: null, uid: null });
  const [loading, setLoading] = useState<boolean>(true);
}

const login = async ({email, password}: AuthProps) => {
    const user = await pb.collection('users').authWithPassword(email, password);
    // pb.authStore.exportToCookie()
    console.log(pb.authStore.isValid);
    console.log(pb.authStore.token);
    console.log(pb.authStore.model?.id);
    return user
    
}



const signup = async ({email, password}: AuthProps) => {
    const user = await pb.collection('users').create({email, password});
    console.log("signup")
    return user
    
}

const logout = () => {
    pb.authStore.clear()
    window.location.reload()
}

const auth = {
    login,
    signup,
    logout,
}

export default auth



