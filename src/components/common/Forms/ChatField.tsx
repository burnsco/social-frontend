import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon
} from "@chakra-ui/react"
import { useField } from "formik"

type ChakraFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label: string
  helperText?: string
  size?: string
}

export default function ChatField({
  label,
  type,
  size,
  helperText,
  ...props
}: ChakraFieldProps) {
  const [field] = useField(props)

  return (
    <FormControl>
      <FormLabel fontSize={`${size}` || "sm"} htmlFor={props.name || props.id}>
        {label}
      </FormLabel>
      <InputGroup size="lg">
        <Input
          {...field}
          {...props}
          width="full"
          variant="filled"
          focusBorderColor="blue.300"
          aria-describedby={`${props.id}-feedback ${props.id}-help`}
          id={field.name}
          placeholder={props.placeholder}
        />
        <InputRightAddon children="Submit" />
      </InputGroup>
    </FormControl>
  )
}
