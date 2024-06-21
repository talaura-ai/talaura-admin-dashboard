// import './App.css'
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './app/store';
import { Provider } from 'react-redux';
import Root from './libs/Dashboard/Root';
import { FlagIcon } from '@heroicons/react/24/outline';
import { Toaster } from 'react-hot-toast';
import { FormProvider } from './context/FormContext';

function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <>
            <FlagIcon /> Loading ...
          </>
        }
        persistor={persistor}
      >
        <FormProvider>
          <Root />
        </FormProvider>

        <Toaster />
      </PersistGate>
    </Provider>
  );
}

export default App;
