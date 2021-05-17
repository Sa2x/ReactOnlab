import React from "react";
import { shallow } from "enzyme";
import Home from "./Home";

import "../../../setupTests";

let title = "Watcherr";
let description = "Keep track of your favourite TV Shows";

let wrapped = shallow(<Home></Home>);

describe("HomePage", () => {
  it("Home Page should render correctly", () => {
    expect(wrapped).toMatchSnapshot();
  });

  it("contains the main texts", () => {
    expect(wrapped.find("h1").text()).toEqual(title);
    expect(wrapped.find("h3").text()).toEqual(description);
  });
});
