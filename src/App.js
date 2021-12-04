import './App.css';
import '@coreui/coreui/dist/css/coreui.min.css'
import NavBar from './components/NavBar';
import Carousel from './components/Carousel';
import Forms from './components/Forms';
import {CFooter,CLink} from '@coreui/react';
function App() {
  return (
    <>
      <NavBar/>
      <Carousel/>
      <Forms/>
      <CFooter>
      <div>
        <CLink href="https://github.com/nouhRifai">GitHub Repos </CLink>
        <span> &copy; 2021 Educational and Personnal Projet by NOUH RIFAI.</span>
      </div>
      <div>
        <span>Connect me on </span>
        <CLink href="https://www.linkedin.com/in/nouh-rifai/"> LinkedIn </CLink>
      </div>
      </CFooter>
    </>
  );
}

export default App;
