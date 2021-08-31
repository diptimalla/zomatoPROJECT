import { Route, Redirect } from "react-router-dom";


//HOC
import HomeLayoutHOC from "./HOC/home.hoc";

// Component
import Temp from "./Components/temp";

//page
import Home from "./Page/home"

function App() {
  return <>
  <HomeLayoutHOC path="/" exact component={Temp}/>
  <Route path="/" exact>
   <Redirect to="/delivery" />
  </Route>
  <HomeLayoutHOC path="/:type" exact component={Home} />

  </>;

}

export default App;