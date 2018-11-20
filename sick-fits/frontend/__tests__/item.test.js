import Item from "../components/Item";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

const fakeItem = {
  id: "abc123",
  title: "A cool item",
  price: 4000,
  description: "this item is really cool",
  image: "dog.jpg",
  largeImage: "largedog.jpg"
};

describe("<Item />", () => {
  it("renders and matches the snapshot", () => {
    const wrapper = shallow(<Item item={fakeItem} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  // it("renders the image properly", () => {
  //   const wrapper = shallow(<Item item={fakeItem} />);
  //   const img = wrapper.find("img");
  //   console.log(img.props());
  //   expect(img.props().src).toBe(fakeItem.image);
  //   expect(img.props().alt).toBe(fakeItem.title);
  // });

  // it("renders the price tag and title", () => {
  //   const wrapper = shallow(<Item item={fakeItem} />);
  //   const PriceTag = wrapper.find("PriceTag");
  //   console.log(PriceTag.dive().text());
  //   expect(PriceTag.children().text()).toBe("$50");
  //   expect(wrapper.find("Title a").text()).toBe(fakeItem.title);
  // });

  // it("renders out the buttons properly", () => {
  //   const wrapper = shallow(<Item item={fakeItem} />);
  //   const buttonList = wrapper.find(".buttonList");
  //   console.log(buttonList.children());
  //   expect(buttonList.children()).toHaveLength(3);
  //   expect(buttonList.find('Link').exists()).toHaveLength(1);
  //   expect(buttonList.find('Link').exists()).toBe(true);
  //   expect(buttonList.find("Link")).toBeTruthy();
  //   expect(buttonList.find("AddToCart").exists()).toBe(true);
  //   expect(buttonList.find("DeleteItem").exists()).toBe(true);
  // });
});
