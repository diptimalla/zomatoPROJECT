import { Route, Redirect , Switch} from "react-router-dom";


//HOC
import HomeLayoutHOC from "./HOC/home.hoc";
import RestaurantLayoutHOC from "./HOC/Restaurant.HOC";
import CheckoutLayoutHOC from "./HOC/checkout.HOC";

// Component
import Temp from "./Components/temp";

//page
import Home from "./Page/home";
import Overview from "./Page/Restaurant/Overview";
import OrderOnline from "./Page/Restaurant/OrderOnline";
import Reviews from "./Page/Restaurant/Reviews";
import Menu from "./Page/Restaurant/Menu";
import Photos from "./Page/Restaurant/Photos";
import Checkout from "./Page/checkout";


function App() {
  return <>
  <HomeLayoutHOC path="/" exact component={Temp}/>
  <Route path="/" exact>
   <Redirect to="/delivery" />
  </Route>
  <HomeLayoutHOC path="/:type" exact component={Home} />
  <RestaurantLayoutHOC
        path="/restaurant/:id/overview"
        exact
        component={Overview}
      />
      <RestaurantLayoutHOC
        path="/restaurant/:id/order-online"
        component={OrderOnline}
      />
      <RestaurantLayoutHOC path="/restaurant/:id/menu" exact component={Menu} />
      <RestaurantLayoutHOC
        path="/restaurant/:id/reviews"
        exact
        component={Reviews}
      />
      <RestaurantLayoutHOC
        path="/restaurant/:id/photos"
        exact
        component={Photos}
      />
          <CheckoutLayoutHOC path="/checkout/orders" exact component={Checkout} />

  </>;

}

export default App;