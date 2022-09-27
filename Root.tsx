/**
 * @format
 */

import * as React from 'react';
import App from './components/App';
import {Provider as PaperProvider} from 'react-native-paper';

export default function Root() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}
