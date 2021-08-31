import { Route, Redirect } from "react-router-dom";


//HOC
import HomeLayoutHOC from "./HOC/home.hoc";
import RestaurantLayoutHOC from "./HOC/Restaurant.HOC";

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
  <RestaurantLayoutHOC path="/restaurant/:id" exact component={Temp} />

  </>;

}

export default App;