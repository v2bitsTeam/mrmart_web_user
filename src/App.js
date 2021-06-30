import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LogInPage from "./pages/LogIn/LogInPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import CartPage from "./pages/Cart/CartPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import OrderPlacedPage from "./pages/OrderPlaced/OrderPlacedPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import ProductDetailsPage from "./pages/ProductDetails/ProductDetailsPage";
import MyOrdersPage from "./pages/MyOrders/MyOrdersPage";
import { UserProvider } from "./contexts/UserContext";
import { CategoriesProvider } from "./contexts/CategoriesContext";
import { SelectedCategoryIdProvider } from "./contexts/SelectedCategoryId";
import { ProductsProvider } from "./contexts/ProductsContext";
import { CartProvider } from "./contexts/CartContext";
import AboutUsPage from "./pages/AboutUs/AboutUsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicy/PrivacyPolicyPage";
import ShippingPolicyPage from "./pages/ShippingPolicy/ShippingPolicyPage";
import ReturnsAndRefundPolicyPage from "./pages/ReturnsAndRefundPolicy/ReturnsAndRefundPolicy";
import TermsAndConditionsPage from "./pages/TermsAndConditions/TermsAndConditionsPage";
import { SplashProvider } from "./contexts/SplashContext";
import { PincodesProvider } from "./contexts/PincodesContext";
import ContactUsPage from "./pages/ContactUs/ContactUsPage";
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPasswordPage";

function App() {
  return (
    <SplashProvider>
      <UserProvider>
        <PincodesProvider>
          <CategoriesProvider>
            <SelectedCategoryIdProvider>
              <ProductsProvider>
                <CartProvider>
                  <Router>
                    <div className="App">
                      <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/ap/login" component={LogInPage} />
                        <Route
                          exact
                          path="/ap/forgot-password"
                          component={ForgotPasswordPage}
                        />
                        <Route exact path="/ap/signup" component={SignUpPage} />
                        <Route exact path="/profile" component={ProfilePage} />
                        <Route exact path="/cart" component={CartPage} />
                        <Route
                          exact
                          path="/checkout"
                          component={CheckoutPage}
                        />
                        <Route
                          exact
                          path="/order-placed"
                          component={OrderPlacedPage}
                        />
                        <Route
                          exact
                          path="/prod-details/:id"
                          component={ProductDetailsPage}
                        />
                        <Route
                          exact
                          path="/my-orders"
                          component={MyOrdersPage}
                        />
                        <Route exact path="/about" component={AboutUsPage} />
                        <Route
                          exact
                          path="/contact"
                          component={ContactUsPage}
                        />
                        <Route
                          exact
                          path="/privacy-policy"
                          component={PrivacyPolicyPage}
                        />
                        <Route
                          exact
                          path="/shipping-policy"
                          component={ShippingPolicyPage}
                        />
                        <Route
                          exact
                          path="/terms-and-conditions"
                          component={TermsAndConditionsPage}
                        />
                        <Route
                          exact
                          path="/returns-and-refunds"
                          component={ReturnsAndRefundPolicyPage}
                        />
                        <Route path="*" component={NotFoundPage} />
                      </Switch>
                    </div>
                  </Router>
                </CartProvider>
              </ProductsProvider>
            </SelectedCategoryIdProvider>
          </CategoriesProvider>
        </PincodesProvider>
      </UserProvider>
    </SplashProvider>
  );
}

export default App;
