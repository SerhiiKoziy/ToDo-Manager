import React from "react";

import { configure, shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TrimButton from "./TrimButton";

configure({ adapter: new Adapter() });

describe("<Card />", () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<TrimButton />);
  });
  it("should render the empty <TrimButton /> ", () => {
    const price = wrapper.find(".price");
    expect(wrapper.text()).toEqual("");
    expect(price.text()).toEqual("");
  });
  it("should render the <TrimButton /> with name", () => {
    const testName = "testName";
    wrapper.setProps({ name: testName });
    const name = wrapper.find("span");
    const price = wrapper.find(".price");
    expect(name.text()).toEqual(testName);
    expect(price.text()).toEqual("");
  });
  it("should render the <TrimButton /> with name and price", () => {
    const testName = "testName";
    const testPrice = "1000$";
    wrapper.setProps({ name: testName, price: testPrice });
    const name = wrapper.find("span");
    const price = wrapper.find(".price");
    expect(name.text()).toEqual(testName);
    expect(price.text()).toEqual(testPrice);
  });
  it("should render the active <TrimButton /> with name and price", () => {
    const testName = "testName";
    const testPrice = "1000$";
    wrapper.setProps({ name: testName, price: testPrice, active: true });
    const name = wrapper.find("span");
    const price = wrapper.find(".price");
    expect(name.text()).toEqual(testName);
    expect(price.text()).toEqual(testPrice);
    expect(wrapper.hasClass("activeTrimButton")).toBe(true);
  });
  it("should execute onClick event", () => {
    const mockCallBack = jest.fn();
    wrapper.setProps({ onClick: mockCallBack });
    expect(mockCallBack.mock.calls.length).toEqual(0);
    wrapper.simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
