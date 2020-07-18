import React from "react";

import { configure, shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Button from "./Button";

configure({ adapter: new Adapter() });

describe("<Card />", () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<Button />);
  });
  it("should render the empty <Button /> with default color", () => {
    expect(wrapper.children().exists()).toBe(false);
    expect(wrapper.hasClass("primaryButton")).toBe(true);
  });
  it("should render the transparent <Button />", () => {
    wrapper.setProps({ variant: "transparent" });
    expect(wrapper.hasClass("transparentButton")).toBe(true);
  });
  it("should render the <Button /> with child element and default color", () => {
    const testDivElement = <div className="test" />;
    wrapper.setProps({ children: testDivElement });
    expect(wrapper.children().exists()).toBe(true);
    expect(wrapper.children().contains(testDivElement)).toBe(true);
    expect(wrapper.children().hasClass("test")).toBe(true);
    expect(wrapper.hasClass("primaryButton")).toBe(true);
  });
  it("should execute onClick event", () => {
    const mockCallBack = jest.fn();
    wrapper.setProps({ onClick: mockCallBack });
    expect(mockCallBack.mock.calls.length).toEqual(0);
    wrapper.simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
