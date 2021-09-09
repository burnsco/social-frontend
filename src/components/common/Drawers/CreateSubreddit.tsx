import { ChakraField } from "@/components/common/index"
import { useCreateSubredditMutation } from "@/generated/graphql"
import { CategorySchema } from "@/types/Category/schemas"
import { CategoryInputType } from "@/types/Category/types"
import { convertToErrorMap } from "@/utils/index"
import { gql } from "@apollo/client"
import {
  Button,
  chakra,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useToast
} from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useRef } from "react"
import { MdCreateNewFolder } from "react-icons/md"

function CreateCategoryDrawer() {
  const drawerBG = useColorModeValue("whitesmoke", "gray.900")
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const buttonColor = useColorModeValue("purple", "blue")
  const [createCategory, { loading }] = useCreateSubredditMutation()
  const btnRef = useRef<HTMLButtonElement | null>(null)

  return (
    <>
      <Tooltip
        hasArrow
        label="Create Subreddit"
        fontSize="md"
        bg="black"
        color="whitesmoke"
      >
        <chakra.span>
          <IconButton
            variant="ghost"
            aria-label="Create a Subreddit"
            icon={<MdCreateNewFolder size="1.5em" />}
            ref={btnRef}
            size="md"
            onClick={onOpen}
          />
        </chakra.span>
      </Tooltip>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={drawerBG}>
          <DrawerCloseButton />
          <DrawerHeader>Create Subreddit</DrawerHeader>
          <Formik
            initialValues={CategoryInputType}
            validationSchema={CategorySchema}
            onSubmit={async (values, actions) => {
              actions.setSubmitting(false)
              let response
              try {
                response = await createCategory({
                  variables: {
                    data: {
                      name: values.name
                    }
                  },
                  update(cache, { data }) {
                    if (!data?.createCategory.errors) {
                      cache.modify({
                        fields: {
                          categories(existingCategories = []) {
                            const newCategoryRef = cache.writeFragment({
                              data: data?.createCategory.category,
                              fragment: gql`
                                fragment NewCategory on Category {
                                  id
                                  name
                                }
                              `
                            })
                            return [newCategoryRef, ...existingCategories]
                          }
                        }
                      })
                    }
                  }
                })
              } catch (ex) {
                throw new Error(ex)
              }

              if (response?.data?.createCategory?.category) {
                toast({
                  id: `${response.data.createCategory.category.name}-category`,
                  title: `${response.data.createCategory.category.name}!`,
                  description:
                    "Your subreddit/category was created successfully.",
                  status: "success",
                  duration: 9000,
                  isClosable: true
                })
                router.push(`/r/${response?.data.createCategory.category.name}`)
                onClose()
              } else if (response?.data?.createCategory.errors) {
                actions.setErrors(
                  convertToErrorMap(response.data.createCategory.errors)
                )
              }
            }}
          >
            {({ isSubmitting }) => {
              return (
                <Form>
                  <DrawerBody>
                    <ChakraField id="name" name="name" label="Name/Title" />
                  </DrawerBody>

                  <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      isLoading={isSubmitting || loading}
                      colorScheme={buttonColor}
                    >
                      Submit
                    </Button>
                  </DrawerFooter>
                </Form>
              )
            }}
          </Formik>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default CreateCategoryDrawer
