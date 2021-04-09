import MatrixField from "../common/place";

export default function DjikstraPathFindingVisualizer() {
  return (
    <div>
      <h1>Djikstra Path Finding Visualizer</h1>
      <MatrixField column={10} row={20}></MatrixField>
    </div>);
}