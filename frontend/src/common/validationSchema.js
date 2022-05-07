import * as yup from "yup";


export const PropertySchema = yup.object().shape({
    title: yup
        .string()
        .trim()
        .required("Title is required")
        .min(8, "Title should be at least 8 characters")
        .max(60, "Title should be at most 60 characters"),
    description: yup
        .string()
        .trim()
        .required("Discription is required")
        .min(8, "Discription should be at least 8 characters")
        .max(240, "Discription should be at most 240 characters"),
    sq_feet: yup
        .number()
        .typeError("Number is Required")
        .required("Size is required")
        .min(1, "Size should be at least 1")
        .max(10000, "Size should be at most 10000"),

    price: yup
        .number()
        .typeError("Price must be Number")
        .required("Price is required")
        .min(1, "Price should be at least 1")
        .max(10000, "Price should be at most 10000"),
    unit_type: yup
        .string()
        .required("Unit type is required"),

    furnished: yup
        .boolean()
        .required("Field is required"),

    bedrooms: yup
        .string()
        .required("Bedroom information is required."),

    bathrooms: yup
        .string()
        .required("bathroom infromation is required."),

    email: yup
        .string()
        .trim()
        .required("Email is required")
        .email("Please enter valid email"),

    phone_no: yup
        .string()
        .trim()
        .required("Phone number is required")
        .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "Invalid phone number"),
});
