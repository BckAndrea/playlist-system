import * as yup from "yup";

const playlistSchema = yup.object().shape({
    name: yup
        .string()
        .required("Name is required!")
        .min(1, "Must be at least 1 characters!")
        .max(100, "Must be maximum 100 characters!"),
});

export default playlistSchema