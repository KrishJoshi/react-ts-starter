import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import EditUserForm from ".";
import { useFormik } from "formik";
import { FormError } from "./styles";

afterEach(jest.clearAllMocks);

jest.mock("formik");

describe("EditUserForm", () => {
  let wrapper: ShallowWrapper;
  const mockSubmit = jest.fn();
  const defaultFormikProps = {
    isValid: true,
    values: {},
    errors: {},
    handleSubmit: mockSubmit,
  };
  const setup = (props: any, formikProps: any) => {
    (useFormik as jest.Mock).mockImplementation(() => formikProps);
    wrapper = shallow(<EditUserForm {...props} />);
  };

  it("should show loading if form is submitting", async () => {
    setup({ saving: true }, defaultFormikProps);
    expect(wrapper.find("Loading")).toHaveLength(1);
  });

  it("should disable submit form is not valid", async () => {
    setup({}, { ...defaultFormikProps, isValid: false });
    expect(wrapper.find("#form-submit").props().disabled).toBe(true);
  });

  it("should show errors", async () => {
    setup(
      { submit: mockSubmit, saving: false },
      { ...defaultFormikProps, errors: { first_name: "ERROR" } }
    );
    expect(wrapper.find(FormError).text()).toBe("ERROR");
  });
});
