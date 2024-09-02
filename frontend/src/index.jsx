import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AppProvider } from './context/AppContext';
import { CategoriesProvider } from './context/CategoriesContext';
import { CompletionProvider } from './context/CompletionContext';
import { ConfirmationDialogProvider } from './context/ConfirmationDialogContext';
import { FrontEndProvider } from './context/FrontEndContext';
import { SettingsProvider } from './context/Settings';
import { SkillsProvider } from './context/SkillsContext';
import { SocialAuthProvider } from './context/SocialAuthContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import './index.css';
import { AppointmentsProvider } from './context/AppointmentsContext';


const root = ReactDOM.createRoot(document.getElementById('root'));



// const MainApp = ()=>{
//   return <MainCall/>
// }


// root.render(<Main/>)



root.render(

  <SocialAuthProvider>
    <Router>
      <AppProvider>
        <SubscriptionProvider>
          <ConfirmationDialogProvider>
            <CompletionProvider>
              <CategoriesProvider>
                <SkillsProvider>
                  <SettingsProvider>
                    <FrontEndProvider>
                      <AppointmentsProvider>
                        <App />
                      </AppointmentsProvider>
                    </FrontEndProvider>
                  </SettingsProvider>
                </SkillsProvider>
              </CategoriesProvider>
            </CompletionProvider>
          </ConfirmationDialogProvider>
        </SubscriptionProvider>
      </AppProvider>
    </Router >
  </SocialAuthProvider>

);


