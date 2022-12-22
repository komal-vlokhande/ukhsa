
import React, {createContext, useState} from "react";
import { Route, Routes } from "react-router-dom"; 
import { Template, Header, Footer, DateInput ,Select } from 'govuk-react-jsx';
import '../styles.scss';
import  Authentication  from './Components/Authentication'
import { LandingPage } from './Components/LandingPage'

export const ThemeContext = createContext(null);

function NoMatch() {
  return <div>404 Not found</div>;
}

function App() {
  const [theme, setTheme] = useState("--theme-light");

  const toggleTheme = (e: { target: { value: any } }) => {
    if( e.target.value === 'logout' ) {
      localStorage.removeItem('token');
      const origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: ''); 
      window.location.href = origin +'/auth'
    } else {
      setTheme((curr) =>
        curr === "--theme-light" ? "--theme-dark" : "--theme-light"
      );
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <Template
          menuButtonLabel="Theme"
          containerClassName="govuk-header__container--full-width"
          navigationClassName="govuk-header__navigation--end"
        >
        <div className="switch">
          <Select
            id="select-1"
            items={[
              {
                children: "Light Theme",
                value: "--theme-light",
              },
              {
                children: "Dark Theme",
                value: "--theme-dark",
              },
              {
                children: "Logout",
                value: "logout",
              },
            ]}
            name="select-1"
            value={theme}
            onChange={toggleTheme}
          />
        </div>
        <div className="content">
          <Routes>
            <Route path="/auth/:token" element={<Authentication />} />
            <Route path="/welcome" element={<LandingPage />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
        </Template>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
