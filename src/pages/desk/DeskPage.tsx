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
} from "@chakra-ui/react";
import { AreaApi } from "api/AreaApi";
import { CompanyApi } from "api/CompanyApi";
import { StoreApi } from "api/StoreApi";
import { logout } from "app/auth/authSlice";
import { saveCompany } from "app/company/companySlice";
import { useAppDispatch } from "app/hooks";
import { useEffect } from "react";
import { FiUser, FiDollarSign, FiUsers, FiShoppingCart } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { CompanyState } from "types/CompanyType";

const DeskPage = () => {
  let cardColor = useColorModeValue("white", "gray.700");
  let borderColor = useColorModeValue("transparent", "gray.600");
  const history = useHistory();
  const dispatch = useAppDispatch();
  useEffect(() => {
    getAllArea();
  }, []);

  const getAllArea = async () => {
    const result = await AreaApi.getAllArea();
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
              <Flex
                justifyContent="center"
                alignItems="center"
                onClick={() => history.push("/desk/add-desk")}
              >
                <Icon as={FiUser} color="white" h="24px" w="24px" mt="10px" />
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
                <Badge borderRadius="50px" px="3" py="1" colorScheme="green">
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
                <Badge borderRadius="50px" px="3" py="1" colorScheme="green">
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
                <Badge borderRadius="50px" px="3" py="1" colorScheme="green">
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
  );
};

export default DeskPage;
