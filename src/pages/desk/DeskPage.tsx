import {
  Flex,
  Button,
  Heading,
  useToast,
  Text,
  Avatar,
  Box,
  HStack,
  Spacer,
  Progress,
  Img,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Badge,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Icon,
  useColorModeValue,
  Image,
  Spinner,
  FormHelperText,
  FormLabel,
  Input,
  FormControl,
} from "@chakra-ui/react";
import { AreaApi } from "api/AreaApi";
import { CompanyApi } from "api/CompanyApi";
import { StoreApi } from "api/StoreApi";
import { logout } from "app/auth/authSlice";
import { saveCompany } from "app/company/companySlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiUser, FiDollarSign, FiUsers, FiShoppingCart } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { CompanyState } from "types/CompanyType";

const DeskPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gettingStart, setGettingStart] = useState<boolean>(false);
  const [areaList, setAreaList] = useState<any[]>([]);
  let cardColor = useColorModeValue("white", "gray.700");
  let borderColor = useColorModeValue("transparent", "gray.600");
  const history = useHistory();
  const dispatch = useAppDispatch();

  const savedBranchs = useAppSelector((state) => state.company.selectedBranch);
  useEffect(() => {
    getAllArea();
  }, []);

  const getAllArea = async () => {
    setIsLoading(true);
    console.log(savedBranchs);
    if (savedBranchs) {
      const result = await AreaApi.getAllArea(savedBranchs);
      console.log(result);
      if (result.status === 200 && result.data) {
        if (result.data.length > 0) {
          setAreaList(result.data);
        }
      } else if (result.status === 200) {
        history.push("/onboarding");
      } else if (result.status === 401) {
        dispatch(logout());
      } else if (result.status === 404) {
        console.log(result.data.message);
      }
    }

    setIsLoading(false);
  };

  const onSubmit = async (field: any) => {
    const payload = {
      name: field.name,
      image: field.floorplan[0],
    };
    console.log(payload)
    const result = await AreaApi.createArea(payload);
    console.log(result);
  };

  return (
    <>
      {isLoading ? (
        <Flex
          pt={{ base: "120px", md: "100px" }}
          h="100%"
          w="100%"
          justify="center"
        >
          <Spinner size="xl" />
        </Flex>
      ) : areaList.length > 0 ? (
        <Flex flexDirection="column" pt={{ base: "120px", md: "100px" }}>
          <SimpleGrid mb="10" columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
            <Box
              border="1px"
              borderColor={borderColor}
              bg={cardColor}
              minH="83px"
              borderRadius="20px"
              p="1.5rem"
              boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
            >
              <Flex
                flexDirection="row"
                align="center"
                justify="center"
                w="100%"
              >
                <Stat me="auto">
                  <StatLabel
                    fontSize="sm"
                    color="gray.400"
                    fontWeight="bold"
                    pb=".1rem"
                  >
                    Today's Occupancy
                  </StatLabel>
                  <Flex>
                    <StatNumber fontSize="lg" color="blue-300" pr={2}>
                      20/71
                    </StatNumber>
                    <StatHelpText
                      alignSelf="flex-end"
                      justifySelf="flex-end"
                      m="0px"
                      color="green.400"
                      fontWeight="bold"
                      ps="3px"
                      fontSize="md"
                    >
                      55%
                    </StatHelpText>
                  </Flex>
                </Stat>
                <Box borderRadius="15px" h={"45px"} w={"45px"} bg="primary">
                  <Flex justifyContent="center" alignItems="center">
                    <Icon
                      as={FiUser}
                      color="white"
                      h="24px"
                      w="24px"
                      mt="10px"
                    />
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </SimpleGrid>

          <Heading as="h4" size="md" mt="10">
            Recent Scheduled Desk
          </Heading>
          <Box
            overflow="auto"
            border="1px"
            borderColor={borderColor}
            mt="5"
            borderRadius="20px"
            p="1.5rem"
            bg={cardColor}
            boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>User</Th>
                  <Th>Date</Th>
                  <Th isNumeric>Desk ID</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Jessica</Td>
                  <Td>5 Oct 2021</Td>
                  <Td isNumeric>A15</Td>
                  <Td>
                    <Badge
                      borderRadius="50px"
                      px="3"
                      py="1"
                      colorScheme="green"
                    >
                      Checked In
                    </Badge>
                  </Td>
                  <Td>
                    <Button
                      fontSize="16px"
                      type="submit"
                      bg="primary"
                      h="45"
                      color="white"
                      _hover={{
                        bg: "blue.200",
                      }}
                      _active={{
                        bg: "blue.400",
                      }}
                    >
                      View
                    </Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Tifanny</Td>
                  <Td>Oct 5, 2021</Td>
                  <Td isNumeric>A14</Td>
                  <Td>
                    <Badge
                      borderRadius="50px"
                      px="3"
                      py="1"
                      colorScheme="green"
                    >
                      Checked In
                    </Badge>
                  </Td>
                  <Td>
                    <Button
                      fontSize="16px"
                      type="submit"
                      bg="primary"
                      h="45"
                      color="white"
                      _hover={{
                        bg: "blue.200",
                      }}
                      _active={{
                        bg: "blue.400",
                      }}
                    >
                      View
                    </Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Alex</Td>
                  <Td>Oct 5, 2021</Td>
                  <Td isNumeric>A13</Td>
                  <Td>
                    <Badge
                      borderRadius="50px"
                      px="3"
                      py="1"
                      colorScheme="green"
                    >
                      Checked In
                    </Badge>
                  </Td>
                  <Td>
                    <Button
                      fontSize="16px"
                      type="submit"
                      bg="primary"
                      h="45"
                      color="white"
                      _hover={{
                        bg: "blue.200",
                      }}
                      _active={{
                        bg: "blue.400",
                      }}
                    >
                      View
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Flex>
      ) : !gettingStart ? (
        <Flex
          pt={{ base: "120px", md: "100px" }}
          h="70vh"
          flexDirection="column"
          justify="center"
          alignItems="center"
        >
          <Flex width="300px" flexDirection="column" s>
            <Heading>Arrange your desk with ease!</Heading>
            <Button
              onClick={() => setGettingStart(true)}
              mt={3}
              bg="blue.400"
              color="white"
              _hover={{ bg: "blue.500" }}
              variant="solid"
            >
              Getting Start
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Flex pt={{ base: "120px", md: "100px" }} flexDirection="column">
          <Text fontSize={22} fontWeight="bold">
            Create your first Area.
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <SimpleGrid mt="10" columns={{ base: 1 }} spacing={10}>
                <Box>
                  <FormLabel>Area Name</FormLabel>
                  <Input
                    borderRadius="15px"
                    fontSize="sm"
                    mb="5px"
                    type="text"
                    placeholder="Area Name"
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
                  <FormLabel>Floor Plan</FormLabel>
                  <Input
                    fontSize="sm"
                    mb="5px"
                    type="file"
                    placeholder="Area Floor Plan"
                    size="lg"
                    {...register("floorplan", { required: true })}
                  />
                  {errors.floorplan && (
                    <FormHelperText mt="0" color="red.500">
                      This field is required
                    </FormHelperText>
                  )}
                </Box>
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
        </Flex>
      )}
    </>
  );
};

export default DeskPage;
