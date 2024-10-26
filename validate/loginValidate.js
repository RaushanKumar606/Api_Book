const { z } = require("zod");

const loginSchema = z.object({

  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }) 
    .min(5, { message: "Email must be 5 or more characters long" })
    .max(30, { message: "Email must be 30 or fewer characters long" })
    .trim(),

  password: z
    .string({ required_error: "Password is required" })
    .min(5, { message: "Password must be 5 or more characters long" })
    .max(30, { message: "Password must be 30 or fewer characters long" })
    .trim(),
});

module.exports = loginSchema;