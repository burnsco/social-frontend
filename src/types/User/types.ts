import { EditUserInput, LoginInput, RegisterInput } from "@/generated/graphql"

export const LoginUserInputType: LoginInput = {
  email: "",
  password: ""
}

export const RegisterUserInputType: RegisterInput = {
  email: "",
  password: "",
  username: ""
}

export const EditUserInputType: EditUserInput = {
  username: "",
  about: "",
  email: "",
  password: "",
  avatar: ""
}
