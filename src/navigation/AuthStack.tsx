import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../screens/Login";

const Stack = createNativeStackNavigator();

const AuthStack:React.FC = () =>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    )
};

export default AuthStack;
