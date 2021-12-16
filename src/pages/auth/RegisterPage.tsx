import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Button,
  Heading,
  useColorModeValue,
  FormHelperText,
  useToast,
  Text,
  Select,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  HStack,
  PinInput,
  PinInputField,
  Stack,
  InputGroup,
  IconButton,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router";
import { login } from "app/auth/authSlice";
import { useAppDispatch } from "app/hooks";
import { LoginForm } from "types/AuthType";
import { authApi } from "api/AuthApi";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { CommonApi } from "api/CommonApi";
import { CountryCodeType } from "types/CommonType";
import useCountryCode from "hook/useCountryCode";

type Inputs = {
  name: string;
  username: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
};

const RegisterPage: React.FC = () => {
  const history = useHistory();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<Boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [second, setSeconds] = useState<number>(60);
  const [isCountDown, setIsCountdown] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  // const [resendTimer, setResendTimer] = useState<number>(0);
  const [sendOtpPhone, setSendOtpPhone] = useState<string>("");
  const [pinInput, setPinIput] = useState<string>("");
  const [isConfirmPassword, setIsConfirmPassword] = useState<boolean>(true);
  const [savedFormData, setSavedFormData] = useState<Inputs>({
    name: "",
    username: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<Inputs>();
  const dispatch = useAppDispatch();
  const password = useRef({});
  password.current = watch("password", "");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    response: countryCodeList,
    loading: countryFetching,
    error: countryCodeError,
  } = useCountryCode();

  const onSubmit: SubmitHandler<Inputs> = async (form) => {
    if (form.password !== form.confirm_password) {
      setIsConfirmPassword(false);
    } else {
      setIsConfirmPassword(true);
      setIsSubmitting(true);
      let formattedPhone = "+60" + form.phone_number;
      if (form.phone_number[0] === "0") {
        formattedPhone = "+60" + form.phone_number.substring(1);
      }

      const { data } = await authApi.sendOtp(formattedPhone);
      if (data.status === 666) {
        setSendOtpPhone(formattedPhone);
        setSavedFormData({ ...form, phone_number: formattedPhone });
        setClicked(false);
        setIsCountdown(true);
        onOpen();
      } else if (data.status === 664) {
        console.log("bypass!");
        console.log(data.status);
        const payload = {
          ...form,
          phone_number: formattedPhone,
          pin: "123456",
        };
        const { data: res } = await authApi.userRegister(payload);
        if (res.status === 700) {
          toast({
            title: "Account Created.",
            description: res.MSG,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          history.push("/auth/login");
        } else if (res.status === 422) {
          if (res.response.errors.email?.length > 0) {
            toast({
              title: "Email Existed.",
              description: res.response.errors.email[0],
              status: "warning",
              duration: 9000,
              isClosable: true,
            });
            setError("email", {
              message: res.response.errors.email[0],
            });
          }
          if (res.response.errors.phone_number?.length > 0) {
            toast({
              title: "Phone Existed.",
              description: res.response.errors.phone_number[0],
              status: "warning",
              duration: 9000,
              isClosable: true,
            });
            setError("phone_number", {
              message: res.response.errors.phone_number[0],
            });
          }
          if (res.response.errors.username?.length > 0) {
            toast({
              title: "Username Existed.",
              description: res.response.errors.username[0],
              status: "warning",
              duration: 9000,
              isClosable: true,
            });
            setError("username", {
              message: res.response.errors.username[0],
            });
          }
        } else {
          toast({
            title: "Try again later.",
            description: "Something wrong, please try again later.",
            status: "info",
            duration: 9000,
            isClosable: true,
          });
        }
      } else if (!data.status) {
        toast({
          title: "Account Existed.",
          description: data.MSG,
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Something Wrong.",
          description: "Please try again later.",
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
      }
      setIsSubmitting(false);
    }
  };

  const resetSecond = () => {
    setSeconds(60);
  };
  useEffect(() => {
    if (isCountDown === true && second > 0) {
      setTimeout(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (second === 0) {
      setIsCountdown(false);
      setSeconds(0);
      resetSecond();
    }
  }, [second, isCountDown === true]);

  const resendOtp = async () => {
    setIsSubmitting(true);
    const result = await authApi.sendOtp(sendOtpPhone);
    console.log(result);
    setClicked(false);
    setIsCountdown(true);
    setIsSubmitting(false);
  };

  const registerHandler = async () => {
    setIsSubmitting(true);
    if (pinInput.length < 6) {
      return
    }
    const payload = {
      ...savedFormData,
      pin: pinInput,
    };
    const { data: res } = await authApi.userRegister(payload);
    if (res.status === 700) {
      toast({
        title: "Account Created.",
        description: res.MSG,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      history.push("/auth/login");
    } else if (res.status === 422) {
      if (res.response.errors.email?.length > 0) {
        toast({
          title: "Email Existed.",
          description: res.response.errors.email[0],
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
        setError("email", {
          message: res.response.errors.email[0],
        });
      }
      if (res.response.errors.phone_number?.length > 0) {
        toast({
          title: "Phone Existed.",
          description: res.response.errors.phone_number[0],
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
        setError("phone_number", {
          message: res.response.errors.phone_number[0],
        });
      }
      if (res.response.errors.username?.length > 0) {
        toast({
          title: "Username Existed.",
          description: res.response.errors.username[0],
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
        setError("username", {
          message: res.response.errors.username[0],
        });
      }
    } else {
      toast({
        title: "Try again later.",
        description: "Something wrong, please try again later.",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
    }
    setIsSubmitting(false);
  };

  return (
    <Flex
      h={{ sm: "initial", md: "75vh", lg: "85vh" }}
      w="100%"
      maxW="1044px"
      mx="auto"
      justifyContent="center"
      pt={{ sm: "100px", md: "0px" }}
    >
      <Flex
        alignItems="center"
        justifyContent="start"
        style={{ userSelect: "none" }}
        w={{ base: "100%", md: "50%", lg: "42%" }}
      >
        <Flex
          direction="column"
          w="100%"
          border="2px"
          borderColor="transparent"
          background="transparent"
          borderRadius="15px"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
          p="48px"
          mt={{ md: "150px", lg: "80px" }}
        >
          <Heading
            color={useColorModeValue("primary", "blue.200")}
            fontSize="32px"
            mb="10px"
          >
            Register
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={useColorModeValue("gray.400", "white")}
            fontWeight="bold"
            fontSize="16px"
          >
            Enter your phone number to sign up.
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              {/* <FormLabel mt="10px" ms="4px" fontSize="sm" fontWeight="normal">
                Phone Number
              </FormLabel> */}
              <Flex>
                <Select
                  id="countryCode"
                  borderRadius="15px"
                  fontSize="sm"
                  my="5px"
                  type="number"
                  // placeholder="Your phone number"
                  size="lg"
                  mr="2"
                  // w="50%"
                  flex="2"
                >
                  {!countryFetching && countryCodeList ? (
                    countryCodeList.map((country) => (
                      <option value="+60" key={country.calling_code}>
                        {country.calling_code}
                      </option>
                    ))
                  ) : (
                    <option value="">
                      {countryCodeError ? countryCodeError : "Loading..."}
                    </option>
                  )}
                </Select>
                <Input
                  flex="3"
                  id="phone_number"
                  borderRadius="15px"
                  fontSize="sm"
                  my="5px"
                  type="number"
                  placeholder="Your phone number"
                  size="lg"
                  {...register("phone_number", {
                    required: true,
                    pattern: /^(0?1)[02-46-9]-*[0-9]{7}$|^(0?1)[1]-*[0-9]{8}$/,
                  })}
                />
              </Flex>
              {errors.phone_number && (
                <FormHelperText mt="0" color="red.500">
                  {errors.phone_number.message
                    ? errors.phone_number.message
                    : "Please enter a valid phone number.*"}
                </FormHelperText>
              )}
              {/* <FormLabel mt="10px" ms="4px" fontSize="sm" fontWeight="normal">
                Username
              </FormLabel> */}
              <Input
                id="username"
                borderRadius="15px"
                fontSize="sm"
                my="5px"
                type="text"
                placeholder="Username"
                size="lg"
                {...register("username", {
                  required: true,
                })}
              />
              {errors.username && (
                <FormHelperText mt="0" color="red.500">
                  {errors.username.message
                    ? errors.username.message
                    : "Username is required*"}
                </FormHelperText>
              )}
              {/* <FormLabel mt="10px" ms="4px" fontSize="sm" fontWeight="normal">
                Email
              </FormLabel> */}
              <Input
                id="email"
                borderRadius="15px"
                fontSize="sm"
                my="5px"
                type="text"
                placeholder="Your email"
                size="lg"
                {...register("email", {
                  required: true,
                })}
              />
              {errors.email && (
                <FormHelperText mt="0" color="red.500">
                  {errors.email.message
                    ? errors.email.message
                    : "Please enter a valid email"}
                </FormHelperText>
              )}
              {/* <FormLabel mt="10px" ms="4px" fontSize="sm" fontWeight="normal">
                Full Name
              </FormLabel> */}
              <Input
                id="password"
                borderRadius="15px"
                fontSize="sm"
                type="text"
                placeholder="Your full name"
                size="lg"
                my="5px"
                {...register("name", {
                  required: true,
                })}
              />
              {errors.name && (
                <FormHelperText mt="0" color="red.500">
                  {errors.name.message
                    ? errors.name.message
                    : "Your full name is required*"}
                </FormHelperText>
              )}
              {/* <FormLabel mt="10px" ms="4px" fontSize="sm" fontWeight="normal">
                Password
              </FormLabel> */}
              <InputGroup size="lg" my="5px">
                <Input
                  id="password"
                  borderRadius="15px"
                  fontSize="sm"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                  })}
                />
                <InputRightElement>
                  <IconButton
                    variant="link"
                    color="blue.500"
                    aria-label="Call Sage"
                    icon={showPassword ? <FiEyeOff /> : <FiEye />}
                    onClick={() => setShowPassword(!showPassword)}
                    _active={{ color: "blue.500" }}
                    _focus={{ color: "blue.500", bg: "none" }}
                  />
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <FormHelperText mt="0" color="red.500">
                  {errors.password.message
                    ? errors.password.message
                    : "Minimum eight characters"}
                </FormHelperText>
              )}
              {/* <FormLabel mt="10px" ms="4px" fontSize="sm" fontWeight="normal">
                Confirm Password
              </FormLabel> */}
              <InputGroup my="5px" size="lg">
                <Input
                  id="password2"
                  borderRadius="15px"
                  fontSize="sm"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Your password"
                  {...register("confirm_password", {
                    required: true,
                    minLength: 8,
                  })}
                />

                <InputRightElement>
                  <IconButton
                    variant="link"
                    color="blue.500"
                    aria-label="Call Sage"
                    icon={showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    _active={{ color: "blue.500" }}
                    _focus={{ color: "blue.500", bg: "none" }}
                  />
                </InputRightElement>
              </InputGroup>
              {errors.confirm_password && (
                <FormHelperText mt="0" color="red.500">
                  This field is required*
                </FormHelperText>
              )}
              {!isConfirmPassword && (
                <FormHelperText mt="0" color="red.500">
                  The password does not match with previous one
                </FormHelperText>
              )}
              {isSubmitting ? (
                <Button
                  fontSize="16px"
                  disabled
                  bg="none"
                  w="100%"
                  h="45"
                  mb="20px"
                  borderColor="primary"
                  color="primary"
                  mt="20px"
                  _hover={{
                    bg: "blue.200",
                  }}
                  _active={{
                    bg: "blue.400",
                  }}
                >
                  Registering...
                </Button>
              ) : (
                <Button
                  fontSize="16px"
                  type="submit"
                  bg="primary"
                  w="100%"
                  h="45"
                  mb="20px"
                  color="white"
                  mt="20px"
                  _hover={{
                    bg: "blue.200",
                  }}
                  _active={{
                    bg: "blue.400",
                  }}
                >
                  REGISTER
                </Button>
              )}
            </FormControl>
          </form>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="0px"
          >
            <Text
              color={useColorModeValue("gray.400", "white")}
              fontWeight="medium"
            >
              Already have an account?
              <Link
                color={useColorModeValue("primary", "blue.200")}
                as="span"
                ms="5px"
                onClick={() => {
                  history.push("/auth/login");
                }}
                fontWeight="bold"
              >
                Login
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Modal
        isOpen={isOpen}
        size="sm"
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>OTP Verification</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel textAlign="center">
              OTP has been sent to {sendOtpPhone}
            </FormLabel>
            <Flex justifyContent="center">
              <Stack>
                <HStack>
                  <PinInput
                    otp
                    size="lg"
                    value={pinInput}
                    onChange={(e) => setPinIput(e)}
                  >
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
              </Stack>
            </Flex>

            <Flex justifyContent="center" marginTop="5">
              <Button
                color="primary"
                variant="link"
                onClick={resendOtp}
                disabled={isCountDown === true && clicked === false}
              >
                Resend
                {isCountDown === true && clicked === false ? `(${second})` : ""}
              </Button>
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button
              w="100%"
              h="45"
              color="white"
              bg="primary"
              _hover={{
                bg: "blue.200",
              }}
              _active={{
                bg: "blue.400",
              }}
              onClick={registerHandler}
              disabled={pinInput.length < 6}
            >
              Verify OTP
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default RegisterPage;
