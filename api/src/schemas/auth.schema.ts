import { object, string, TypeOf } from "zod";

export const loginSchema = object({
    body: object({
        email: string({
            required_error: "Email is required",
        }).email("The email is not valid"),
        password: string({
            required_error: "Password is required",
        })
        .min(1, "Password is required"),
    }),
});

export type LoginInput = TypeOf<typeof loginSchema>["body"];



export const registerSchema = object({
    body: object({
        email: string({
            required_error: "Email is required",
        }).email("Invalid email"),
        firstname: string({
            required_error: "Firstname is required",
        }).max(100, "Firstname is too long"),
        lastname: string({
            required_error: "Lastname is required",
        }).max(100, "Lastname is too long"),
        password: string({
            required_error: "Password is required",
        })
        .min(8, "Password must contain at least 8 characters")
        .max(100, "Password is too long")
        .regex(/[a-zA-Z]/, "The password must contain at least 1 letter")
        .regex(/[0-9]/, "The password must contain at least 1 number"),
    })
    .refine(body => body.firstname.length + body.lastname.length >= 5, "Fullname must have more than 5 characters"),
});

export type RegisterInput = TypeOf<typeof registerSchema>["body"];