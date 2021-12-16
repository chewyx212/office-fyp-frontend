import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  useToast,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { SassApi } from "api/SassApi";
import { logout } from "app/auth/authSlice";
import { useAppDispatch } from "app/hooks";
import { PackageType } from "types/SassType";

function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
}

type IProps = {
  nextStep: Function;
  prevStep: Function;
};

const Pricing: React.FC<IProps> = ({ nextStep, prevStep }) => {
  const dispatch = useAppDispatch();
  const [packageList, setPackagetList] = useState<PackageType[]>([]);
  const toast = useToast()

  useEffect(() => {
    getSassList();
  }, []);
  const getSassList = async () => {
    const result = await SassApi.getSassList();
    console.log(result);
    if (result.status === 401) {
      dispatch(logout());
    } else if (
      result.data.status === 901 &&
      result.data.response.list.length > 0
    ) {
      setPackagetList(result.data.response.list);
    } else {
      toast({
        title: "Something wrong, try again later.",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const nextStepHandler = () => {
    nextStep();
  };
  let backColor = useColorModeValue("gray.50", "gray.700");

  return (
    <Box py={12}>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          Plans that fit your need
        </Heading>
        <Text fontSize="lg" color={"gray.500"}>
          Start with 14-day free trial. No credit card needed. Cancel at
          anytime.
        </Text>
      </VStack>
      <Stack
        direction={{ base: "column", md: "row" }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}
      >
        {packageList.length > 0 &&
          packageList?.map((sass) => (
            <PriceWrapper>
              <Box py={4} px={12}>
                <Text fontWeight="500" fontSize="2xl">
                  {sass.title}
                </Text>
                <HStack justifyContent="center">
                  <Text fontSize="3xl" fontWeight="600">
                    RM
                  </Text>
                  <Text fontSize="5xl" fontWeight="900">
                    {sass.monthly_price}
                  </Text>
                  <Text fontSize="3xl" color="gray.500">
                    /month
                  </Text>
                </HStack>
                  <Text fontSize="5xl" fontWeight="900">
                    {sass.annual_price}
                  </Text>
              </Box>
              <VStack bg={backColor} py={4} borderBottomRadius={"xl"}>
                <List spacing={3} textAlign="start" px={12}>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    unlimited build minutes
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Lorem, ipsum dolor.
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    5TB Lorem, ipsum dolor.
                  </ListItem>
                </List>
                <Box w="80%" pt={7}>
                  <Button
                    onClick={nextStepHandler}
                    w="full"
                    borderColor="primary"
                    color="primary"
                    variant="outline"
                  >
                    Get Started
                  </Button>
                </Box>
              </VStack>
            </PriceWrapper>
          ))}
      </Stack>
    </Box>
  );
};

export default Pricing;
