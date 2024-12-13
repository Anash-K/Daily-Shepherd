import React from "react";
import { Image, Text, View } from "react-native"
import { ScreenProps } from "../navigation/Stack";
import CustomImages from "../assets/customImages";


const VerseOfTheDay:React.FC<ScreenProps<'VerseOfTheDay'>> = () =>{
    return(
        <View>
            <Image source={CustomImages.weatherIcon}/>
            <Text>Verse of Day</Text>
        </View>
    )
};

export default VerseOfTheDay;