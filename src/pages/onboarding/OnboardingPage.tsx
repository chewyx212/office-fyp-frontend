import {
  Flex,
  Text,
  Img,
  Box,
  Heading,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Stack,
  Button,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import React, { useState } from "react";
import { useHistory } from "react-router";
import CreateCompanyForm from "components/onboarding/CreateCompanyForm";
import { CompanyApi } from "api/CompanyApi";
import { CompanyState, CreateCompanyType } from "types/CompanyType";
import { useAppDispatch } from "app/hooks";
import { saveCompany } from "app/company/companySlice";
import MarketIntegration from "components/onboarding/MarketIntegration";

const content = <Flex py={4}>a</Flex>;

const OnboardingPage = () => {
  const history = useHistory();
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const dispatch = useAppDispatch();

  const OnSubmitCreateCompany = async (payload: CreateCompanyType) => {
    const result = await CompanyApi.postCreateCompany(payload);
    if (result.status === 201) {
      const company: CompanyState = {
        id: result.data.id,
        size: result.data.size,
        email: result.data.email,
        name: result.data.name,
      };
      console.log(company);
      nextStep();
      dispatch(saveCompany({ company }));
    }
  };
  const AlreadyGotCompanyHandler = (response: CompanyState) => {
    const company: CompanyState = {
      size: response.size,
      name: response.name,
      id: response.id,
      email: response.email,
    };
    console.log(company);
    console.log("already got");
    nextStep();
    dispatch(saveCompany({ company }));
  };

  const onSuccessSubmit = () => {
    nextStep();
  };

  const goBackPrevStep = () => {
    prevStep();
  };

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "100px" }}>
      <Steps colorScheme="twitter" activeStep={activeStep} mb="50px">
        <Step label="Step 1" description="Company Information">
          {/* <SimpleGrid columns={{ lg: 3, md: 2, base: 1 }} spacing={5}>
                        <FileUploader setFile={ setFile } />
                    </SimpleGrid> */}
          <CreateCompanyForm
            submitForm={OnSubmitCreateCompany}
            gotCompany={AlreadyGotCompanyHandler}
          />
        </Step>

        <Step label="Step 2" description="Add Branch">
          <Text>ADd branch form</Text>
          {/* <MarketIntegration
            type="first"
            nextStep={onSuccessSubmit}
            prevStep={goBackPrevStep}
          /> */}
        </Step>
        <Step label="Step 3" description="Select Package">
          <Text>hahahah</Text>
        </Step>

        <Step label="Step 3" description="Payment Details">
          <Img src="step-3.svg" boxSize="400px" />
          <Text fontWeight="bold">Congrats! You have done the steps! </Text>
          <Button
            w="full"
            borderColor="primary"
            color="primary"
            variant="outline"
            onClick={() => history.push("/")}
          >
            Get Started
          </Button>
        </Step>
      </Steps>

      {/* <Stack justifyContent="right" direction="row" spacing={4} mt="5">
        {activeStep != 0 && (
          <Button
            leftIcon={<ArrowBackIcon />}
            color="primary"
            borderColor="primary"
            variant="outline"
            onClick={prevStep}
          >
            Back
          </Button>
        )}

        {activeStep === 2 ? (
          <Button
            // rightIcon={<ArrowForwardIcon />}
            color="white"
            bg="primary"
            _hover={{
              bg: "blue.200",
            }}
            _active={{
              bg: "blue.400",
            }}
            variant="solid"
            onClick={() => history.push("/dashboard")}
          >
            Done
          </Button>
        ) : (
          <Button
            rightIcon={<ArrowForwardIcon />}
            color="white"
            bg="primary"
            _hover={{
              bg: "blue.200",
            }}
            _active={{
              bg: "blue.400",
            }}
            variant="solid"
            onClick={nextStep}
          >
            Next
          </Button>
        )}
      </Stack> */}
    </Flex>
  );
};

export default OnboardingPage;
