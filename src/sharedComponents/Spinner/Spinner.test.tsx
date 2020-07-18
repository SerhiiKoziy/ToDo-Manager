import React from "react";

import { configure, shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Spinner from "./Spinner";

configure({ adapter: new Adapter() });

describe("<Card />", () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<Spinner />);
  });
  it("should render the <Spinner /> with default size and color", () => {
    const svg = wrapper.find("#triangle");
    const polygon = wrapper.find("polygon");
    expect(svg.prop("width")).toEqual(50);
    expect(svg.prop("height")).toEqual(50);
    expect(polygon.prop("stroke")).toEqual("black");
  });
  it("should render the <Spinner /> with the size 100", () => {
    wrapper.setProps({ size: 100 });
    const svg = wrapper.find("#triangle");
    const polygon = wrapper.find("polygon");
    expect(svg.prop("width")).toEqual(100);
    expect(svg.prop("height")).toEqual(100);
    expect(polygon.prop("stroke")).toEqual("black");
  });
  it("should render the <Spinner /> of the red color", () => {
    wrapper.setProps({ color: "red" });
    const svg = wrapper.find("#triangle");
    const polygon = wrapper.find("polygon");
    expect(svg.prop("width")).toEqual(50);
    expect(svg.prop("height")).toEqual(50);
    expect(polygon.prop("stroke")).toEqual("red");
  });
});
