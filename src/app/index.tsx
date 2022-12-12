import { Route, Routes } from "react-router-dom";
import '../styles.scss';
import {App as Authentication} from './Containers/App'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<Authentication />} />
      
      </Routes>
    </div>
  );
}

export default App;
