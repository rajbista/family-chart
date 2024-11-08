import "./App.css";
import FamilyChart from "./FamilyChart";
import MovieComponent from "./MovieComponent";

function App() {
  function onNodeClick(nodeId) {
    // console.log("d3", d3.event);
    // alert("clicked " + nodeId);
  }

  return (
    <>
      <MovieComponent />
      <FamilyChart onNodeClick={onNodeClick} />
    </>
  );
}

export default App;
