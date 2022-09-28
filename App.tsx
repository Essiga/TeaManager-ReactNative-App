/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import * as React from 'react';
 import {
     // SafeAreaView,
     // StyleSheet,
     // Text,
     // useColorScheme,
     // View,
 } from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';
 import { createDrawerNavigator } from '@react-navigation/drawer';
 import TeaView from './components/view/TeaView';
 import VesselView from './components/view/VesselView';
 // import {Colors} from 'react-native/Libraries/NewAppScreen';
 // import Main from './components/Main';
 
 const Drawer = createDrawerNavigator();
 
 const App = () => {
     // const isDarkMode = useColorScheme() === 'dark';
 
     // const backgroundStyle = {
     //     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
     // };
 
     // return (
     //     <SafeAreaView style={backgroundStyle}>
     //       <Main/>
     //     </SafeAreaView>
     // );
 
     return (
         <NavigationContainer>
             <Drawer.Navigator initialRouteName="TeaView">
                 <Drawer.Screen name="TeaView" component={TeaView} />
                 <Drawer.Screen name="VesselView" component={VesselView} />
             </Drawer.Navigator>
         </NavigationContainer>
     );
 };
 
 export default App;