import { Observer } from "../common/model";
import MatrixField from "../common/Place";
import DjikstraAlgorithm from "./algorithm";

export default function DjikstraPathFindingVisualizer() {

  const observer = new Observer();

  return (
    <div>
      <h1>Djikstra Path Finding Visualizer</h1>
      <button onClick={() => observer.notifyAll()}>Run maze finder</button>
      <MatrixField observer={observer}
        algorithm={DjikstraAlgorithm}
        width={1500}
        height={500} />
    </div>);
}