import "./App.css";
import { routes } from "./routes/routes";
import { useRoutes } from "react-router-dom";
import Notification from "./utils/Notification";
import Modal from "./components/modals/orderModal";

function App() {
  return (
    <div className="App">
      <Notification />
      <Modal></Modal>
      {useRoutes(routes)}
    </div>
  );
}

export default App;
