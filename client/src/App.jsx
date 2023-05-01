import styled from 'styled-components';
import Hero from './components/Hero.jsx';
import W from './components/W.jsx';
import Transactions from './components/Transactions.jsx';
import Contact from './components/Contact.jsx';

const Container = styled.div`
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
  color: white;
  background: url("../images/bg.jpeg");
  &::-webkit-scrollbar{
    display: none;
  }

`;

function App() {
  return (
    <div className="bg-primary-black overflow-hidden">
    <Container>
      <Hero />
      <W />
      <Transactions />
      <Contact />
    </Container>
    </div>
  );
}

export default App;






// import { Navbar, Welcome, Footer, Services, Transactions } from './components';

// const App = () => {
//   return (
//     <div className="min-h-screen">
//       <div className="gradient-bg-welcome">
//         <Navbar />
//         <Welcome />
//       </div>
//       <Services />
//       <Transactions />
//       <Footer />
//     </div>
//   );
// }

// export default App