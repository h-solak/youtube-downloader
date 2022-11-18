import { Row, Col } from "reactstrap";
import Downloader from "./components/Downloader";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Row className="app-container m-0 flex-center">
        <Downloader />
      </Row>
    </>
  );
}

export default App;
