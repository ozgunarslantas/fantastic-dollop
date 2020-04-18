import React, { useState, useRef } from "react"
import { isEmail } from "validator"
import { Input, Stack, Flex, Heading, Button, Tooltip } from "@chakra-ui/core"

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("")
  const [favPetName, setFavPetName] = useState("")
  const [favPetNameRepeat, setFavPetNameRepeat] = useState("")

  const favPetNameRepeatBlurredAtLeastOnce = useRef(false)

  const validators = {
    email: isEmail(email),
    favPetName: favPetName.length > 2,
    favPetNameRepeat: favPetName === favPetNameRepeat && favPetNameRepeat.length > 2,
  }

  return (
    <Flex width={600} height={400} align="center" justify="center" bg="white">
      <Stack width={300} spacing={3}>
        <Heading size="sm">Email</Heading>
        <Input
          focusBorderColor={validators["email"] ? "lime" : "unset"}
          isInvalid={!validators["email"] && email.length > 0}
          errorBorderColor="crimson"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Heading size="sm">Favorite Pet's Name</Heading>
        <Input
          focusBorderColor={validators["favPetName"] ? "lime" : "unset"}
          isInvalid={!validators["favPetName"] && favPetName.length > 0}
          errorBorderColor="crimson"
          value={favPetName}
          onChange={e => setFavPetName(e.target.value)}
        />
        <Heading size="sm">Repeat Favorite Pet's Name</Heading>
        <Tooltip
          isOpen={
            favPetNameRepeatBlurredAtLeastOnce.current &&
            !validators["favPetNameRepeat"] &&
            validators["favPetName"]
          }
          hasArrow
          label="It feels like you don't love your pet enough"
          placement="bottom"
          bg="crimson"
        >
          <Input
            focusBorderColor={validators["favPetNameRepeat"] ? "lime" : "crimson"}
            isInvalid={!validators["favPetNameRepeat"]}
            errorBorderColor={favPetNameRepeatBlurredAtLeastOnce.current && "crimson"}
            value={favPetNameRepeat}
            onChange={e => {
              if (!favPetNameRepeatBlurredAtLeastOnce.current) {
                favPetNameRepeatBlurredAtLeastOnce.current = true
              }
              return setFavPetNameRepeat(e.target.value)
            }}
          />
        </Tooltip>
        <Button
          isDisabled={Object.values(validators).some(validator => !validator)}
          onClick={onSubmit}
          variantColor="purple"
          marginTop="48px"
        >
          Login
        </Button>
      </Stack>
    </Flex>
  )
}

const LoginQuiz = () => {
  return <div>easy peasy</div>
}

const LoginWithQuiz = () => {
  const [step, setStep] = useState("FORM")
  return step === "FORM" ? <LoginForm onSubmit={() => setStep("QUIZ")} /> : <LoginQuiz />
}

export default LoginWithQuiz
