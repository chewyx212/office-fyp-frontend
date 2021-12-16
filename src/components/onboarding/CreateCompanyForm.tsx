import {
  Box,
  Heading,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Stack,
} from "@chakra-ui/layout";
import {
  Flex,
  FormLabel,
  Button,
  Select,
  Image,
  FormHelperText,
  Avatar,
  AvatarBadge,
  Divider,
  FormControl,
  Icon,
  Input,
  useColorModeValue,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import FileUploader from "components/FileUploader/FileUploader";
import { FiCamera } from "react-icons/fi";
import { CompanyApi } from "api/CompanyApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { CreateCompanyType } from "types/CompanyType";
import { useAppDispatch } from "app/hooks";
import { logout } from "app/auth/authSlice";

type IProps = {
  submitForm: Function;
  gotCompany: Function;
};
const CreateCompanyForm: React.FC<IProps> = ({ submitForm, gotCompany }) => {
  let cardColor = useColorModeValue("white", "gray.700");

  const history = useHistory();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateCompanyType>();
  useEffect(() => {
    getCompany();
  }, []);

  const companyType: { id: number; name: string }[] = [
    { id: 1, name: "1 - 20" },
    { id: 2, name: "21 - 50" },
    { id: 3, name: "51 - 100" },
    { id: 4, name: "101 - 300" },
    { id: 5, name: "301 - 500" },
    { id: 6, name: "500 - 1000" },
    { id: 7, name: "More than 1000" },
  ];

  const getCompany = async () => {
    const result = await CompanyApi.getCompanyDetail();
    if (result.status === 200 && result.data.name) {
      gotCompany(result.data);
    } else if (result.status === 401) {
      dispatch(logout());
    }
  };

  const onSubmit: SubmitHandler<CreateCompanyType> = async (form) => {
    submitForm(form);
  };
  return (
    <Box
      width="100%"
      borderRadius="15px"
      p="1.5rem"
      bg={cardColor}
      boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
    >
      <Heading as="h4" size="md">
        Company Information
      </Heading>
      <Divider my="1.5rem" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <SimpleGrid mt="10" columns={{ base: 1, md: 2 }} spacing={10}>
            <Box>
              <FormLabel>Company Name</FormLabel>
              <Input
                borderRadius="15px"
                fontSize="sm"
                mb="5px"
                type="text"
                placeholder="Company Name"
                size="lg"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <FormHelperText mt="0" color="red.500">
                  This field is required
                </FormHelperText>
              )}
            </Box>

            <Box>
              <FormLabel>Email</FormLabel>
              <Input
                borderRadius="15px"
                fontSize="sm"
                mb="5px"
                type="email"
                placeholder="Company Email"
                size="lg"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <FormHelperText mt="0" color="red.500">
                  This field is required
                </FormHelperText>
              )}
            </Box>
            {companyType.length > 0 && (
              <Box>
                <FormLabel>Company Size</FormLabel>
                <Select
                  borderRadius="15px"
                  fontSize="sm"
                  mb="5"
                  size="lg"
                  placeholder="Select Company Type"
                  {...register("size", { required: true })}
                >
                  {companyType.map((type) => (
                    <option key={type.id} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </Select>
              </Box>
            )}
          </SimpleGrid>
        </FormControl>
        <Button
          fontSize="16px"
          type="submit"
          bg="primary"
          w="100%"
          h="45"
          mt="40px"
          color="white"
          _hover={{
            bg: "blue.200",
          }}
          _active={{
            bg: "blue.400",
          }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CreateCompanyForm;
