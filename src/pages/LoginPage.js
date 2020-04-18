import React, { useState, useRef, useEffect } from "react"
import { isEmail } from "validator"
import { Input, Stack, Flex, Heading, Button, Tooltip, Text } from "@chakra-ui/core"

import { HashLoader } from "react-spinners"
import axios from "axios"
import { shuffle } from "../utils"

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
  const [quizState, setQuizState] = useState("FETCHING_QUESTIONS")
  const [questions, setQuestions] = useState(null)
  useEffect(() => {
    if (quizState === "FETCHING_QUESTIONS") {
      axios
        .get("https://opentdb.com/api.php?amount=1&difficulty=hard&type=multiple&encode=url3986")
        .then(function (response) {
          setQuestions(
            response.data.results.map(({ incorrect_answers, correct_answer, question }) => ({
              question,
              correct_answer,
              possible_answers: shuffle(incorrect_answers.concat(correct_answer.concat("*"))),
            }))[0],
          )
          setQuizState("AWAITING_ANSWER")
        })
    }
  }, [quizState])

  return quizState === "FETCHING_QUESTIONS" ? (
    <HashLoader size="150px" color="#3182ce" />
  ) : (
    <Flex direction="column" justify="space-evenly">
      <Flex justify="center" maxWidth="400px">
        <Text color="#202B33" textAlign="center" fontSize="xl" padding="8px" cursor="default">
          {decodeURIComponent(questions.question)}
        </Text>
      </Flex>

      <Flex direction="column" align="center" justify="center">
        {questions.possible_answers.map((option, index) => (
          <Button
            key={index}
            width="75%"
            maxWidth="400px"
            minWidth="300px"
            padding="8px"
            marginBottom="8px"
            variantColor="teal"
            onClick={() =>
              option === questions.correct_answer && alert(option === questions.correct_answer)
            }
          >
            {decodeURIComponent(option)}
          </Button>
        ))}
      </Flex>
    </Flex>
  )
}

const LoginWithQuiz = () => {
  const [step, setStep] = useState("FORM")
  return step === "FORM" ? <LoginForm onSubmit={() => setStep("QUIZ")} /> : <LoginQuiz />
}

export default LoginWithQuiz
