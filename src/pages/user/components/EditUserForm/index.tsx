import React from "react";
import { useFormik } from "formik";
import { Form, FormError, FormGroup, Input, Label, Submit } from "./styles";
import userValidationSchema from "./validations";
import Loading from "../../../../common/components/Loading";

interface Props {
  user: User;
  saving: boolean;
  onSubmit: (user: User) => void;
}

const EditUserForm = ({ user, saving, onSubmit }: Props) => {
  const { handleSubmit, errors, handleChange, values, isValid } = useFormik({
    initialValues: user,
    validationSchema: userValidationSchema,
    onSubmit,
  });

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="first_name">First Name</Label>
        <Input
          id="firstName"
          name="first_name"
          type="text"
          onChange={handleChange}
          value={values.first_name}
          required
        />
        {errors.first_name && <FormError>{errors.first_name}</FormError>}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="last_name">Last Name</Label>
        <Input
          id="lastName"
          name="last_name"
          type="text"
          onChange={handleChange}
          value={values.last_name}
          required
        />
        {errors.last_name && <FormError>{errors.last_name}</FormError>}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
          value={values.email}
          required
        />
        {errors.email && <FormError>{errors.email}</FormError>}
      </FormGroup>

      {saving ? (
        <Loading />
      ) : (
        <Submit disabled={!isValid} type="submit">
          Submit
        </Submit>
      )}
    </Form>
  );
};

export default EditUserForm;
