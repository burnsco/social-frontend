import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  useColorModeValue
} from "@chakra-ui/react"
import { useField } from "formik"

type ChakraFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string
  textarea?: boolean
  label: string
  helperText?: string
  size?: string
}

export default function InputField({
  label,
  type,
  size,
  textarea = false,
  helperText,
  ...props
}: ChakraFieldProps) {
  const [field, { error, touched }] = useField(props)
  const bg = useColorModeValue("gray.100", "black")

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel fontSize={`${size}` || "sm"} htmlFor={props.name}>
        {label}
      </FormLabel>
      {textarea ? (
        <Textarea
          {...field}
          opacity={0.5}
          bg={bg}
          focusBorderColor="red.300"
          aria-describedby={`${props.id}-feedback ${props.id}-help`}
          type={type}
          id={field.name}
          placeholder={props.placeholder}
        />
      ) : (
        <Input
          {...field}
          {...props}
          focusBorderColor="red.300"
          aria-describedby={`${props.id}-feedback ${props.id}-help`}
          type={type}
          id={field.name}
          placeholder={props.placeholder}
        />
      )}

      {helperText && <FormHelperText>{helperText}</FormHelperText>}

      {error && touched ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  )
}
