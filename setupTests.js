import { render } from "@testing-library/react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
configure({ adapter: new Adapter() });

global.renderWithRouter = (renderComponent, route) => {
  const history = createMemoryHistory();
  if (route) {
    history.push(route);
  }

  return {
    ...render(<Router history={history}>{renderComponent()}</Router>, history),
  };
};
