import { useState } from "react";
import "./App.css";
import Welcome from "./components/welcome";
import SurveyCards from "./components/survey-cards";
function App() {
  let [page, setPage] = useState("welcome");
  return (
    <>
      <div>
        {page == "welcome" ? <Welcome setPage={setPage} /> : <SurveyCards />}{" "}
        {/*using ternary operator to switch from welcome screen to survey screen*/}
      </div>
    </>
  );
}

export default App;
