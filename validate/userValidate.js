const { z } = require("zod");

const signUpSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(5, { message: "Must be 5 or more characters long" })
    .max(15, { message: "Must be 15 or fewer characters long" })
    .trim(),

  phone: z
    .string({ required_error: "Phone Number is required" })
    .min(10, { message: "Must be 10 or more digits long" })
    .max(15, { message: "Must be 15 or fewer digits long" })
    .trim(),

  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }) // This checks for valid email format
    .min(5, { message: "Email must be 5 or more characters long" })
    .max(30, { message: "Email must be 30 or fewer characters long" })
    .trim(),

  password: z
    .string({ required_error: "Password is required" })
    .min(5, { message: "Password must be 5 or more characters long" })
    .max(30, { message: "Password must be 30 or fewer characters long" })
    .trim(),
});

module.exports = signUpSchema;
