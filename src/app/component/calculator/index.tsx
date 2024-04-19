import { Screen } from "./screen";
import { Keyboard } from "./keyboard";

const Calculator = () => (
  <div className="flex flex-col">
    <Screen />
    <Keyboard />
  </div>
);

export { Calculator };