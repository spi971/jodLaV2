import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";

export default function HomeScreen() {
  return (
    <View className='flex-1 relative'>
      <StatusBar style='ligth' />
      <Image
        blurRadius={70}
        source={require("../assets/images/bg.png")}
        className='absolute h-full w-full'
      />
      <SafeAreaView className="flex flex-1">
        <View style={{ height: "7%" }} className='mx-4 relative z-50'>
          <View style={{ backgroundColor: theme.bgWhite(0.2)}} className='flex-row justify-end items-center rounded-full'>
            <TextInput placeholder="Search city" placeholderTextColor={'lightgray'} className="flex-1 pl-6 h-10 text-base text-white"/>
            <TouchableOpacity style={{backgroundColor: theme.bgWhite(0.3)}} className="rounded-full p-3 m-1">
                <MagnifyingGlassIcon size="25" color="white"/> 
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
