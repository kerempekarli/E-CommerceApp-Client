import "./App.css";
import { routes } from "./routes/routes";
import { useRoutes } from "react-router-dom";
import Notification from "./utils/Notification";

function App() {
  return (
    <div className="App">
      <Notification />
      {useRoutes(routes)}
    </div>
  );
}

export default App;
