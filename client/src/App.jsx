import { Routes, Route } from 'react-router-dom';
import { Fragment, useState } from 'react';
import { catalogFunc, marketplaceFunc } from './utils/fetchData';
import Header from './components/Header/Header';
import Banner from './components/Home/Banner';
import Services from './components/Home/Services';
import OurLights from './components/Home/OurLights';
import Comments from './components/Home/Comments';
import About from './components/Main/About';
import ShowLights from './components/Main/ShowLights/ShowLights';
import Details from './components/Light/Details/Details';
import CreateLight from './components/Light/CreateLight/CreateLight';
import Login from './components/Main/Login/Login';
import Register from './components/Main/Register';
import Profile from './components/Main/Profile/Profile';
import Footer from './components/Footer/Footer';
import Copyright from './components/Footer/Copyright';
import NotFound from './components/Not Found/NotFound';
import ScrollTop from './ScrollTop';

function App() {
  const [userNav, setUserNav] = useState(false);

  return (
    <>
      <ScrollTop />
      <Header navValues={{userNav, setUserNav}}/>

      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <Banner />
              <Services />
              <OurLights />
              <Comments />
            </Fragment>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/catalog" element={<ShowLights props={{getDataFunc: catalogFunc, page: 'catalog'}}/>} />
        <Route path="/catalog/:id" element={<Details />} />
        <Route path="/marketplace" element={<ShowLights props={{getDataFunc: marketplaceFunc, page: 'marketplace'}} />} />
        <Route path="/marketplace/:id" element={<Details />} />
        <Route path="/createlight" element={<CreateLight />} />
        <Route path="/login" element={<Login setUserNav={ setUserNav }/>} />
        <Route path="/register" element={<Register setUserNav={ setUserNav }/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Copyright />
    </>
  );
}

export default App;
