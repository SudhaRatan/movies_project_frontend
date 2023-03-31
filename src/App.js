import DefaultRouter from "./Routing/Routes";

export const API = process.env.REACT_APP_API;

function App() {
  return (
    <div className="App">
    <DefaultRouter />
    </div>
  );
}

export default App;
