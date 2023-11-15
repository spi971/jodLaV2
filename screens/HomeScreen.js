import { StatusBar } from "expo-status-bar";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchLocation, fetchWeather } from "../api/weather";
import { FORCAST_NUMBERS_OF_DAYS, weatherImages } from "../constants";
import { theme } from "../theme";
import { getData, storeData } from "../utils/asyncStorage";

export default function HomeScreen() {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  const handleLocation = (location) => {
    setLocations([]);
    setShowSearch(false);
    setLoading(true);
    fetchWeather({
      cityName: location.name,
      days: FORCAST_NUMBERS_OF_DAYS,
    }).then((data) => {
      setWeather(data);
      setLoading(false);
      storeData("city", location.name);
    });
  };

  const handleSearch = (city) => {
    if (city.length > 2) {
      fetchLocation({ cityName: city }).then((data) => {
        setLocations(data);
      });
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    const storedCity = await getData('city');
    const cityName =  storedCity ? storedCity : "Paris";
    
    fetchWeather({
      cityName,
      days: FORCAST_NUMBERS_OF_DAYS,
    }).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const { current, location } = weather;

  return (
    <View className='flex-1 relative'>
      <StatusBar style='ligth' />
      <Image
        blurRadius={70}
        source={require("../assets/images/bg.png")}
        className='absolute h-full w-full'
      />
      {loading ? (
        <View className='flex-1 flex-row justify-center items-center'>
          <Progress.CircleSnail thickness={10} size={140} color='#0bb3b2' />
        </View>
      ) : (
        <SafeAreaView className='flex flex-1'>
          {/* Search bar */}
          <View style={{ height: "7%" }} className='mx-4 relative z-50'>
            <View
              style={{
                backgroundColor: showSearch
                  ? theme.bgWhite(0.2)
                  : "transparent",
              }}
              className='flex-row justify-end items-center rounded-full'
            >
              {showSearch ? (
                <TextInput
                  onChangeText={handleTextDebounce}
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
                      onPress={() => handleLocation(location)}
                      key={index}
                      className={
                        "flex-row items-center border-0 p-3 px-4 mb-1 " +
                        borderClass
                      }
                    >
                      <MapPinIcon size='20' color='gray' />
                      <Text className='text-black text-lg ml-2'>
                        {location?.name}, {location?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>

          {/* forecast dispaly */}
          <View className='flex justify-around mx-4 flex-1 mb-2'>
            {/* location details  */}
            <Text className='text-white text-center text-2xl font-bold'>
              {location?.name},&nbsp;
              <Text className='text-gray-400 text-lg font-semibold'>
                {location?.country}
              </Text>
            </Text>
            {/* weather image */}
            <View className='flex-row justify-center'>
              <Image
                source={weatherImages[current?.condition?.text || "other"]}
                className='w-52 h-52'
              />
            </View>
            {/* temperature */}
            <View className='space-y-2'>
              <Text className='text-white text-center font-bold text-6xl ml-5'>
                {current?.temp_c}&#176;
              </Text>
              <Text className='text-white text-center font-bold text-2xl ml-5'>
                Feels like {current?.feelslike_c}&#176;
              </Text>
              {/* weather condition */}
              <Text className='text-white text-center text-xl ml-5 tracking-widest'>
                {current?.condition?.text}
              </Text>
            </View>
            {/* other informations */}
            <View className='flex-row justify-between mx-4'>
              {/* wind */}
              <View className='flex-row space-x-2 items-center'>
                <Image
                  source={require("../assets/icons/wind.png")}
                  className='h-6 w-6'
                />
                <Text className='text-white font-semibold text-base'>
                  {current?.wind_kph}Km
                </Text>
              </View>
              {/* humidity */}
              <View className='flex-row space-x-2 items-center'>
                <Image
                  source={require("../assets/icons/drop.png")}
                  className='h-6 w-6'
                />
                <Text className='text-white font-semibold text-base'>
                  {current?.humidity}%
                </Text>
              </View>
              {/* Sunrise */}
              <View className='flex-row space-x-2 items-center'>
                <Image
                  source={require("../assets/icons/sun.png")}
                  className='h-6 w-6'
                />
                <Text className='text-white font-semibold text-base'>
                  {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                </Text>
              </View>
            </View>
          </View>

          {/* forecast for next day */}
          <View className='mb-2 space-y-3'>
            <View className='flex-row items-center mx-5 space-x-2'>
              <CalendarDaysIcon size='22' color='white' />
              <Text className='text-white text-base'>Next days</Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{ paddingHorizontal: 25 }}
              showsHorizontalScrollIndicator={false}
            >
              {weather?.forecast?.forecastday?.map((item, index) => {
                const date = new Date(item.date);
                const options = { weekday: "long" };
                let dayName = date.toLocaleDateString("fr-FR", options);
                dayName = dayName.split(" ")[0];
                if (index === 0) return null;
                return (
                  <View
                    key={index}
                    className='flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4'
                    style={{ backgroundColor: theme.bgWhite(0.15) }}
                  >
                    <Image
                      source={
                        weatherImages[item?.day?.condition?.text || "other"]
                      }
                      className='h-11 w-11'
                    />
                    <Text className='text-white'>{dayName}</Text>

                    <Text className='text-white text-xl font-semibold'>
                      {item?.day?.avgtemp_c}&#176;
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}
