import { NavigationProp, RouteProp } from "@react-navigation/native";
import {StackParams} from './MainStack';
import { BottomParams } from "./BottomStack";


export type ScreenParams = StackParams & BottomParams; // Combine the params

export type ScreenProps<T extends keyof ScreenParams> ={
  navigation: NavigationProp<ScreenParams,T>;
  route:RouteProp<ScreenParams,T>
}

