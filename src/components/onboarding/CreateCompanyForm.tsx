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
import { FileWithPath, useDropzone } from "react-dropzone";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  CheckCircleIcon,
  EmailIcon,
} from "@chakra-ui/icons";
import { useHistory } from "react-router";
import FileUploader from "components/FileUploader/FileUploader";
import { FiCamera } from "react-icons/fi";
import { CompanyApi } from "api/CompanyApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { CreateCompanyType } from "types/CompanyType";
import { useAppDispatch } from "app/hooks";
import { logout } from "app/auth/authSlice";
import { CountryCodeType } from "types/CommonType";

const content = <Flex py={4}>a</Flex>;
type CategoryType = {
  id: number;
  name: string;
  description: string;
};
type SubCategory = {
  id: number;
  name: string;
  description: string;
  parent_id: number;
};

type IProps = {
  submitForm: Function;
  gotCompany: Function;
};
const CreateCompanyForm: React.FC<IProps> = ({ submitForm, gotCompany }) => {
  let cardColor = useColorModeValue("white", "gray.700");

  const history = useHistory();

  const avatarRef = useRef<any>(null);

  const [file, setFile] = useState(null);
  const [companyCategory, setCompanyCategory] = useState<SubCategory[]>([]);
  const [companyType, setCompanyType] = useState<CategoryType[]>([]);
  const [countryList, setCountryList] = useState<CountryCodeType[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateCompanyType>();
  useEffect(() => {
    getCompany();
  }, []);

  const getCategoryAndCountryList = async () => {
    const { data } = await CompanyApi.getCategoryAndCategory();
    console.log(data);
    if (data.status === 0) {
      if (data.response.categories && data.response.types.length > 0) {
        setCompanyType(data.response.types);
      }
      if (data.response.categories && data.response.categories.length > 0) {
        setCompanyCategory(data.response.categories);
      }
      if (data.response.countries && data.response.countries.length > 0) {
        setSelectedCountryCode(data.response.countries[0].calling_code);
        setCountryList(data.response.countries);
      }
    }
  };

  const getCompany = async () => {
    const result = await CompanyApi.getCompanyDetail();
    if (result.data.status === 0 && result.data.response) {
      gotCompany(result.data.response);
    } else if (result.status === 401) {
      dispatch(logout());
    } else {
      getCategoryAndCountryList();
    }
  };

  const handleCountryChange = (value: string) => {
    let temp = countryList.find((country) => country.id === parseInt(value));
    if (temp) {
      setSelectedCountryCode(temp.calling_code);
    }
  };

  const onSelectCompanyType = (value: string) => {
    setSelectedType(value);
    console.log(value)
  };

  const onSubmit: SubmitHandler<CreateCompanyType> = async (form) => {
    console.log(form);
    const payload: CreateCompanyType = {
      ...form,
      whats_app: form.whats_app ? "https://wa.me/" + form.whats_app : "",
      instagram: form.instagram
        ? "https://instagram.com/" + form.instagram
        : "",
      facebook: form.facebook ? "https://facebook.com/" + form.facebook : "",
    };
    submitForm(payload);
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
          <Flex justifyContent="center">
            <Avatar w="100px" h="100px">
              <AvatarBadge
                cursor="pointer"
                borderWidth="0.5px"
                borderColor="gray.200"
                boxSize="2em"
                bg="white"
                // onClick={() => { avatarRef.current.click() }}
              >
                {/* <Input 
                  type="file" 
                  display="none" 
                  ref={avatarRef}  
                /> */}
                <Icon as={FiCamera} color="grey" />
              </AvatarBadge>
            </Avatar>
          </Flex>

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
                <FormLabel>Company Type</FormLabel>
                <Select
                  borderRadius="15px"
                  fontSize="sm"
                  mb="5"
                  size="lg"
                  placeholder="Select Company Type"
                  {...register("type_id", { required: true })}
                  onChange={(e) => onSelectCompanyType(e.target.value)}
                >
                  {companyType.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </Select>
              </Box>
            )}

            {companyCategory.find(
              (type) => type.parent_id === parseInt(selectedType)
            ) && (
              <Box>
                <FormLabel>Company Category</FormLabel>
                <Select
                  borderRadius="15px"
                  fontSize="sm"
                  mb="5"
                  size="lg"
                  placeholder="Select Company Category"
                  {...register("category_id")}
                  disabled={!selectedType}
                >
                  {companyCategory.map((category) => {
                    if (category.parent_id === parseInt(selectedType)) {
                      return (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      );
                    }
                  })}
                </Select>
                {errors.category_id && (
                  <FormHelperText mt="0" color="red.500">
                    This field is required
                  </FormHelperText>
                )}
              </Box>
            )}

            <Box>
              <FormLabel>Country</FormLabel>
              <Select
                borderRadius="15px"
                fontSize="sm"
                mb="5"
                size="lg"
                placeholder="Select Country / Region"
                {...register("country_id", { required: true })}
                onChange={(e) => handleCountryChange(e.target.value)}
              >
                {countryList.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </Select>
              {errors.country_id && (
                <FormHelperText mt="0" color="red.500">
                  This field is required
                </FormHelperText>
              )}
            </Box>
            <Box>
              <FormLabel>Phone Number</FormLabel>

              <InputGroup size="lg">
                <InputLeftAddon
                  children={selectedCountryCode}
                  fontSize="sm"
                  borderRadius="15px"
                />
                <Input
                  borderRadius="15px"
                  fontSize="sm"
                  mb="5px"
                  type="number"
                  placeholder="Company Phone Number"
                  {...register("phone_number", {
                    required: true,
                    pattern: /^(0?1)[02-46-9]-*[0-9]{7}$|^(0?1)[1]-*[0-9]{8}$/,
                  })}
                />
              </InputGroup>
              {errors.phone_number && (
                <FormHelperText mt="0" color="red.500">
                  Please enter a valid phone number.
                </FormHelperText>
              )}
            </Box>
          </SimpleGrid>

          <Box mt="40px">
            <FormLabel>WhatsApp</FormLabel>
            <InputGroup size="lg">
              <InputLeftAddon
                children="https://wa.me/"
                fontSize="sm"
                borderRadius="15px"
              />
              <Input
                borderRadius="15px"
                fontSize="sm"
                mb="5px"
                type="text"
                placeholder="WhatsApp"
                {...register("whats_app")}
              />
            </InputGroup>
          </Box>

          <Box mt="40px">
            <FormLabel>Facebook</FormLabel>
            <InputGroup size="lg">
              <InputLeftAddon
                children="https://facebook.com/"
                fontSize="sm"
                borderRadius="15px"
              />
              <Input
                borderRadius="15px"
                fontSize="sm"
                mb="5px"
                type="text"
                placeholder="Facebook"
                {...register("facebook")}
              />
            </InputGroup>
          </Box>

          <Box mt="40px">
            <FormLabel>Instagram</FormLabel>
            <InputGroup size="lg">
              <InputLeftAddon
                children="https://instagram.com/"
                fontSize="sm"
                borderRadius="15px"
              />
              <Input
                borderRadius="15px"
                fontSize="sm"
                mb="5px"
                type="text"
                placeholder="Instagram"
                {...register("instagram")}
              />
            </InputGroup>
          </Box>
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
