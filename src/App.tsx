import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import { ThemeProvider } from "styled-components";
import { Light } from "./theme/variables";
import Home from "./components/Home";
import IssueDetails from "./components/IssueDetails";
import NotFound from "./components/404";

function App() {
  return (
    <ThemeProvider theme={Light}>
      <Wrapper>
        <Header id="header" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/issue/:id" element={<IssueDetails />} />
          <Route path="" element={<NotFound />} />
        </Routes>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
