import React, {createContext, useState} from "react";
import { Route, Routes } from "react-router-dom"; 
import { Template, Header, Footer, DateInput ,Select } from 'govuk-react-jsx';
import '../styles.scss';
import { Authentication } from './Components/Authentication'

export const ThemeContext = createContext(null);

function NoMatch() {
  return <div>404 Not found</div>;
}

function App() {
  const [theme,setTheme] = useState("--theme-light");

  const toggleTheme = (e: { target: { value: any; }; }) => {
    setTheme((curr)=>(curr === '--theme-light'? "--theme-dark" : "--theme-light"));
  }

  return (
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <div className="App" id={theme}>
          <Header 
          menuButtonLabel="Theme"   
          containerClassName="govuk-header__container--full-width"
          navigationClassName="govuk-header__navigation--end"/>
            <div className="switch">
              <Select
                id="select-1"
                items={[
                  {
                    children: 'Light Theme',
                    value: '--theme-light'
                  },
                  {
                    children: 'Dark Theme',
                    value: '--theme-dark'
                  }
                ]}
                name="select-1"
                value={theme}
                onChange={toggleTheme}
              />
            </div>
            <div className="content">
              <Routes>
                <Route path="/auth" element={<Authentication />} />
                <Route path="*" element={<NoMatch />} />
              </Routes>
            </div> 
         <Footer />
        </div>
      </ThemeContext.Provider>
    )

}


export default App;
