import ReactSlider from "react-slider";
import "./style.css";

const Slider = () => {
  return (
    <ReactSlider
      className="horizontal-slider"
      thumbClassName="example-thumb"
      trackClassName="example-track"
      onChange = {(e,v) => (console.log([e, v]))}
    />
  );
};
export default Slider;