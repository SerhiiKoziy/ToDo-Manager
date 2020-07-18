import React from "react";

import { configure, shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ColorButton from "./ColorButton";

configure({ adapter: new Adapter() });

describe("<Card />", () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<ColorButton />);
  });
  it("should render the empty <ColorButton />", () => {
    const colorImg = wrapper.find(".colorImg");
    const title = wrapper.find(".title");
    const price = wrapper.find(".price");
    expect(colorImg.prop("src")).toEqual(undefined);
    expect(title.text()).toEqual("");
    expect(price.text()).toEqual("");
  });
  it("should render <ColorButton /> with colorImg", () => {
    const testUrl = "https://testImg.jpg";
    wrapper.setProps({ img: testUrl });
    const colorImg = wrapper.find(".colorImg");
    const title = wrapper.find(".title");
    const price = wrapper.find(".price");
    expect(colorImg.prop("src")).toEqual(testUrl);
    expect(title.text()).toEqual("");
    expect(price.text()).toEqual("");
  });
  it("should render <ColorButton /> with title", () => {
    const testTitle = "test";
    wrapper.setProps({ title: testTitle });
    const title = wrapper.find(".title");
    expect(title.text()).toEqual(testTitle);
  });
  it("should render <ColorButton /> with local price", () => {
    const localPrise = "5,000 kr";
    wrapper.setProps({ price: localPrise });
    const price = wrapper.find(".price");
    expect(price.text()).toEqual(localPrise);
  });
  it("should render active <ColorButton />", () => {
    wrapper.setProps({ active: true });
    expect(wrapper.hasClass("activeButton")).toBe(true);
  });
  it("should execute onClick event", () => {
    const mockCallBack = jest.fn();
    wrapper.setProps({ onClick: mockCallBack });
    expect(mockCallBack.mock.calls.length).toEqual(0);
    wrapper.simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
