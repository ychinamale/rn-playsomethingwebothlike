import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import bottomTabBarStack from './screens';

const BottomNavigator = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={[styles.bottom, { flexDirection: 'row' }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        let label = route.name;

        if (options.tabBarLabel) { label = options.tabBarLabel; }
        if (options.title) { label = options.title; }

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName;

        if (route.name === 'Playlists') {
          iconName = isFocused
            ? 'play-circle'
            : 'play-circle-outline';
        } else if (route.name === 'Home') {
          iconName = isFocused
            ? 'home'
            : 'home-outline';
        } else if (route.name === 'Matches') {
          iconName = isFocused
            ? 'list-circle'
            : 'list-circle-outline';
        }

        const buttonColor = isFocused ? '#36B37E' : 'grey';

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
            key={route.name}
          >
            <Ionicons name={iconName} color={buttonColor} size={30} />
            <Text style={{ color: isFocused ? '#36B37E' : 'white', fontSize: 10 }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default function MainAppNavigation() {
  return (
    <NavigationContainer>
      <BottomNavigator.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        initialRouteName="Home"
      >
        {
          Object.entries({ ...bottomTabBarStack }).map(([name, screen]) => (
            <BottomNavigator.Screen
              name={name}
              component={screen}
              key={name}
            />
          ))
        }
      </BottomNavigator.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  bottom: {
    height: 70,
    backgroundColor: '#FFF',
    borderTopColor: '#EEE',
    borderTopWidth: 1,
  },
  tabButton: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
  },
});
