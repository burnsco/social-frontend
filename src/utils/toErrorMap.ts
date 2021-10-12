import { FieldError } from "@/generated/graphql"

const convertToErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {}
  errors.forEach(({ field, message }) => {
    errorMap[field] = message
  })

  return errorMap
}

export default convertToErrorMap
