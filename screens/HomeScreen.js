import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";

export default function HomeScreen() {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);
  const handleLocation = (location) => {
    console.log(location)
  }

  return (
    <View className='flex-1 relative'>
      <StatusBar style='ligth' />
      <Image
        blurRadius={70}
        source={require("../assets/images/bg.png")}
        className='absolute h-full w-full'
      />
      <SafeAreaView className='flex flex-1'>
        <View style={{ height: "7%" }} className='mx-4 relative z-50'>
          <View
            style={{
              backgroundColor: showSearch ? theme.bgWhite(0.2) : "transparent",
            }}
            className='flex-row justify-end items-center rounded-full'
          >
            {showSearch ? (
              <TextInput
                placeholder='Search city'
                placeholderTextColor={"lightgray"}
                className='flex-1 pl-6 h-10 pb-1 text-base text-white'
              />
            ) : null}
            <TouchableOpacity
              onPress={() => setShowSearch(!showSearch)}
              style={{ backgroundColor: theme.bgWhite(0.3) }}
              className='rounded-full p-3 m-1'
            >
              <MagnifyingGlassIcon size='25' color='white' />
            </TouchableOpacity>
          </View>
          {locations.length > 0 && showSearch ? (
            <View className='absolute w-full bg-gray-300 top-16 rounded-3xl'>
              {locations.map((location, index) => {
                let showBorder = index + 1 != locations.length;
                const borderClass = showBorder
                  ? "border-b-2 border-b-gray-400"
                  : "";
                return (
                  <TouchableOpacity
                  onPress={()=> handleLocation(location)}
                    key={index}
                    className={'flex-row items-center border-0 p-3 px-4 mb-1 ' + borderClass}
                  >
                    <MapPinIcon size='20' color='gray' />
                    <Text className="text-black text-lg ml-2">Paris, France</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </View>
  );
}
