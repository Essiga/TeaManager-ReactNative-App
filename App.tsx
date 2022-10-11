import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import Theme from './constants/Theme'
import 'react-native-url-polyfill/auto';

export default function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <PaperProvider theme={Theme}>
                <SafeAreaProvider>
                    <Navigation/>
                </SafeAreaProvider>
            </PaperProvider>
        );
    }
}
