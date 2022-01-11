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
} from "@chakra-ui/react";
import { BranchApi } from "api/BranchApi";
import { CompanyApi } from "api/CompanyApi";
import { StoreApi } from "api/StoreApi";
import { logout } from "app/auth/authSlice";
import { saveCompany, saveCompanyBranch } from "app/company/companySlice";
import { useAppDispatch } from "app/hooks";
import { useEffect } from "react";
import { FiUser, FiDollarSign, FiUsers, FiShoppingCart } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { BranchState } from "types/BranchType";
import { CompanyState } from "types/CompanyType";

const DashboardPage = () => {
  let cardColor = useColorModeValue("white", "gray.700");
  let borderColor = useColorModeValue("transparent", "gray.600");
  const history = useHistory();
  const dispatch = useAppDispatch();
  useEffect(() => {
    getCompanyDetail();
    getBranch();
  }, []);

  const getCompanyDetail = async () => {
    const result = await CompanyApi.getCompanyDetail();
    console.log(result);
    if (result.status === 200 && result.data) {
      const company: CompanyState = {
        size: result.data.size,
        name: result.data.name,
        id: result.data.id,
        email: result.data.email,
      };
      console.log(company);
      console.log("already got");
      dispatch(saveCompany({ company }));
    } else if (result.status === 200) {
      history.push("/onboarding");
    } else if (result.status === 401) {
      dispatch(logout());
    }
  };
  const getBranch = async () => {
    const result = await BranchApi.getAllBranch();
    if (result.status === 200 && result.data && result.data.length > 0) {
      const branchs: BranchState[] = result.data;
      console.log(branchs);
      console.log("already got");
      dispatch(saveCompanyBranch({ branchs }));
    } else if (result.status === 401) {
      dispatch(logout());
    }
  };

  return (
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
          <Flex flexDirection="row" align="center" justify="center" w="100%">
            <Stat me="auto">
              <StatLabel
                fontSize="sm"
                color="gray.400"
                fontWeight="bold"
                pb=".1rem"
              >
                Today's Money
              </StatLabel>
              <Flex>
                <StatNumber fontSize="lg" color="blue-300">
                  RM 53,000
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
                  +55%
                </StatHelpText>
              </Flex>
            </Stat>
            <Box borderRadius="15px" h={"45px"} w={"45px"} bg="primary">
              <Flex justifyContent="center" alignItems="center">
                <Icon
                  as={FiDollarSign}
                  color="white"
                  h="24px"
                  w="24px"
                  mt="10px"
                />
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box
          border="1px"
          borderColor={borderColor}
          bg={cardColor}
          minH="83px"
          borderRadius="20px"
          p="1.2rem"
          boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
        >
          <Flex flexDirection="row" align="center" justify="center" w="100%">
            <Stat me="auto">
              <StatLabel
                fontSize="sm"
                color="gray.400"
                fontWeight="bold"
                pb=".1rem"
              >
                Today's Users
              </StatLabel>
              <Flex>
                <StatNumber fontSize="lg" color="blue-300">
                  2,300
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
                  +5%
                </StatHelpText>
              </Flex>
            </Stat>
            <Box borderRadius="15px" h="45px" w="45px" bg="primary">
              <Flex justifyContent="center" alignItems="center">
                <Icon as={FiUser} color="white" h="24px" w="24px" mt="10px" />
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box
          border="1px"
          borderColor={borderColor}
          bg={cardColor}
          minH="83px"
          borderRadius="15px"
          p="1.2rem"
          boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
        >
          <Flex flexDirection="row" align="center" justify="center" w="100%">
            <Stat>
              <StatLabel
                fontSize="sm"
                color="gray.400"
                fontWeight="bold"
                pb=".1rem"
              >
                New Clients
              </StatLabel>
              <Flex>
                <StatNumber fontSize="lg" color="blue-300">
                  +3,020
                </StatNumber>
                <StatHelpText
                  alignSelf="flex-end"
                  justifySelf="flex-end"
                  m="0px"
                  color="red.500"
                  fontWeight="bold"
                  ps="3px"
                  fontSize="md"
                >
                  -14%
                </StatHelpText>
              </Flex>
            </Stat>
            <Spacer />
            <Box borderRadius="15px" h={"45px"} w={"45px"} bg="primary">
              <Flex justifyContent="center" alignItems="center">
                <Icon as={FiUsers} color="white" h="24px" w="24px" mt="10px" />
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box
          border="1px"
          borderColor={borderColor}
          bg={cardColor}
          minH="83px"
          borderRadius="15px"
          p="1.2rem"
          boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
        >
          <Flex flexDirection="row" align="center" justify="center" w="100%">
            <Stat me="auto">
              <StatLabel
                fontSize="sm"
                color="gray.400"
                fontWeight="bold"
                pb=".1rem"
              >
                Total Sales
              </StatLabel>
              <Flex>
                <StatNumber fontSize="lg" color="blue-300" fontWeight="bold">
                  RM 173,000
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
                  +8%
                </StatHelpText>
              </Flex>
            </Stat>
            <Box borderRadius="15px" h={"45px"} w={"45px"} bg="primary">
              <Flex justifyContent="center" alignItems="center">
                <Icon
                  as={FiShoppingCart}
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

      <Box
        border="1px"
        borderColor={borderColor}
        borderRadius="20px"
        p="1.5rem"
        bg={cardColor}
        boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
      >
        <Box w="100%">
          <Flex
            flexDirection={{ base: "column", sm: "column", lg: "row" }}
            w="100%"
          >
            <Avatar w="60px" h="60px" mr="5" />
            <Flex
              flexDirection="column"
              h="100%"
              lineHeight="1.6"
              width={{ lg: "45%" }}
            >
              <Text
                fontSize="lg"
                fontWeight="bold"
                pb=".5rem"
                mt={{ base: "20px", lg: "0px" }}
              >
                Welcome Back, Johnny
              </Text>
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                We're very happy to see you again on your dashboard
              </Text>
            </Flex>

            <Flex direction="column" mt={{ base: "20px", lg: "0px" }}>
              <Flex alignItems="center">
                <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                  Profile Completeness
                </Text>
              </Flex>
              <Text fontSize="lg" fontWeight="bold" mb="6px" my="6px">
                20%
              </Text>
              <Progress
                colorScheme="twitter"
                borderRadius="12px"
                h="5px"
                value={20}
              />
            </Flex>

            <HStack
              ml={{ base: "0px", lg: "auto" }}
              mt={{ base: "20px", lg: "0px" }}
            >
              <Button
                onClick={() => history.push("/sales-report")}
                variant="outline"
              >
                View Report
              </Button>

              <Button
                bg="primary"
                color="white"
                _hover={{
                  bg: "blue.200",
                }}
                _active={{
                  bg: "blue.400",
                }}
                onClick={() => history.push("/integration")}
              >
                Manage Store
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Box>

      <Heading as="h4" size="md" mt="10">
        Recent Order
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
              <Th>Customer</Th>
              <Th>Date</Th>
              <Th isNumeric>Amount</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Jessica</Td>
              <Td>5 Oct 2021</Td>
              <Td isNumeric>RM 30.48</Td>
              <Td>
                <Badge borderRadius="50px" px="3" py="1" colorScheme="green">
                  Paid
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
                  View Order
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>Tifanny</Td>
              <Td>Oct 5, 2021</Td>
              <Td isNumeric>RM 30.48</Td>
              <Td>
                <Badge borderRadius="50px" px="3" py="1" colorScheme="green">
                  Paid
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
                  View Order
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>Alex</Td>
              <Td>Oct 5, 2021</Td>
              <Td isNumeric>RM 30.48</Td>
              <Td>
                <Badge borderRadius="50px" px="3" py="1" colorScheme="green">
                  Paid
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
                  View Order
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default DashboardPage;
