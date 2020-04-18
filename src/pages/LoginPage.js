import React, { useState, useRef, useEffect } from "react"
import { isEmail } from "validator"
import { Input, Stack, Flex, Heading, Button, Tooltip, Text } from "@chakra-ui/core"
import { useCountdownTimer } from "use-countdown-timer"

import { HashLoader, ClockLoader } from "react-spinners"
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

const QuizWrongAnswer = ({ tryAgainOnClick }) => (
  <Flex direction="column" justify="center" maxWidth="400px">
    <Text color="cyan" textAlign="center" fontSize="xl" padding="8px" cursor="default">
      Sorry, cannot let you in.
    </Text>
    <Button variantColor="yellow" onClick={tryAgainOnClick}>
      Try Again.
    </Button>
  </Flex>
)

const Questions = ({ questions, selectAnswer, timesUpHandler }) => {
  const { countdown, start } = useCountdownTimer({
    timer: 1000 * 10,
    onExpire: () => timesUpHandler(),
  })
  useEffect(() => {
    start()
  }, [start])
  return (
    <Flex direction="column" justify="space-evenly">
      <Flex align="center" justify="center" marginBottom="8px">
        <ClockLoader size="36px" color="#d53f8c" />
        <Text color="#d53f8c" marginLeft="12px" width="32px" textAlign="center" fontSize="xl">
          {countdown / 1000}
        </Text>
      </Flex>
      <Flex justify="center" maxWidth="400px">
        <Text color="#202B33" textAlign="center" fontSize="xl" padding="8px" cursor="default">
          {decodeURIComponent(questions.question)}
        </Text>
      </Flex>

      <Flex direction="column" align="center" justify="center">
        {questions.possible_answers.map((option, index) => (
          <Button
            key={index}
            width="100%"
            padding="8px"
            marginBottom="8px"
            variantColor="teal"
            onClick={() => selectAnswer(option)}
          >
            {decodeURIComponent(option)}
          </Button>
        ))}
      </Flex>
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

  const handleSelectedAnswer = answer => {
    if (answer === questions.correct_answer.concat("*")) {
      alert("bravo")
    } else {
      setQuizState("WRONG_ANSWER")
    }
  }

  return quizState === "FETCHING_QUESTIONS" ? (
    <HashLoader size="150px" color="#3182ce" />
  ) : quizState === "WRONG_ANSWER" ? (
    <QuizWrongAnswer tryAgainOnClick={() => setQuizState("FETCHING_QUESTIONS")} />
  ) : (
    <Questions
      questions={questions}
      selectAnswer={handleSelectedAnswer}
      timesUpHandler={() => setQuizState("WRONG_ANSWER")}
    />
  )
}

const LoginWithQuiz = () => {
  const [step, setStep] = useState("FORM")
  return step === "FORM" ? <LoginForm onSubmit={() => setStep("QUIZ")} /> : <LoginQuiz />
}

export default LoginWithQuiz
