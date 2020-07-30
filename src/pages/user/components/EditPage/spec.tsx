import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import EditPage from "../EditPage";
import useFetchUser from "../../hooks/useFetchUser";
import userFixture from "../../../../common/fixtures/userFixture";

jest.mock("../../hooks/useFetchUser");

afterEach(jest.clearAllMocks);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: 1,
  }),
}));

describe("EditPage", () => {
  let wrapper: ShallowWrapper;

  it("should show loading when user is being fetched", async () => {
    (useFetchUser as jest.Mock).mockReturnValue({
      loading: true,
    });
    wrapper = shallow(<EditPage />);
    expect(wrapper.find("Loading")).toHaveLength(1);
    expect(wrapper.find("EditUserForm")).toHaveLength(0);
  });

  it("should show form once user exists", async () => {
    (useFetchUser as jest.Mock).mockReturnValue({
      loading: false,
      user: userFixture,
    });
    wrapper = shallow(<EditPage />);
    expect(wrapper.find("Loading")).toHaveLength(0);
    expect(wrapper.find("EditUserForm")).toHaveLength(1);
  });
});
