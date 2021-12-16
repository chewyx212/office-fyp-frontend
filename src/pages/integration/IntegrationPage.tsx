import {
  useColorModeValue,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Img,
  Text,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useEffect, ChangeEvent, useState } from "react";
import { useHistory } from "react-router";
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator,
} from "@ajna/pagination";
import { StoreApi } from "api/StoreApi";
import WholeScreenSpinner from "components/Spinner/WholeScreenSpinner";
import useCountryCode from "hook/useCountryCode";
import { StoreDetailType } from "types/StoreType";

const IntegrationPage = () => {
  let cardColor = useColorModeValue("white", "gray.700");
  let borderColor = useColorModeValue("transparent", "gray.600");
  let tabColor = useColorModeValue("gray.100", "gray.700");

  const tabs = [
    {
      id: 1,
      label: "All",
      number: 10,
    },
    {
      id: 2,
      label: "Connected",
      number: 4,
    },
    {
      id: 3,
      label: "Authorization Expired",
      number: 6,
    },
  ];

  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allItem, setAllItem] = useState<any[]>([]);
  const history = useHistory();
  const { response: countryCodeList } = useCountryCode();

  useEffect(() => {
    getAllStore();
  }, []);

  const getAllStore = async () => {
    setIsLoading(true);
    const { data } = await StoreApi.getUserStore();
    console.log(data);
    if (data.status === 0) {
      let array: StoreDetailType[] = data.response.store.reverse();
      array.forEach((store: StoreDetailType) => {
        let search = countryCodeList?.find(
          (country) => country.id === store.country_id
        );
        if (search) {
          store.country_name = search.name;
        }
      });
      setAllItem(array);
      setIsEmpty(false);
      console.log(countryCodeList);
    }
    setIsLoading(false);
  };

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "100px" }}>
      {isLoading ? (
        <WholeScreenSpinner />
      ) : (
        <>
          <Heading as="h4" size="md" mt="10" mb="5">
            Integrations
          </Heading>
          <Flex>
            <Button
              w={{ base: "100%", lg: "30%", xl: "15%" }}
              leftIcon={<FiPlus />}
              ml="auto"
              fontSize="16px"
              bg="primary"
              color="white"
              _hover={{
                bg: "blue.200",
              }}
              _active={{
                bg: "blue.400",
              }}
              onClick={() => history.push("/add-store")}
            >
              Add Store
            </Button>
          </Flex>

          <Box
            border="1px"
            borderColor={borderColor}
            mt="5"
            borderRadius="20px"
            p="1.5rem"
            bg={cardColor}
            boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
          >
            <Tabs>
              <TabList overflowX="auto" overflowY="hidden">
                {tabs.map((tab, index) => {
                  return (
                    <Tab onClick={() => setSelectedTab(tab.id)} key={index}>
                      {tab.label}
                      <Badge
                        fontSize="sm"
                        ml="5px"
                        borderRadius="20px"
                        px="2"
                        bg={selectedTab === tab.id ? "primary" : "gray.100"}
                        color={selectedTab === tab.id ? "white" : "gray.600"}
                      >
                        {tab.number}
                      </Badge>
                    </Tab>
                  );
                })}
              </TabList>
              <Table variant="simple" overflow="auto">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Url</Th>
                    <Th>Country</Th>
                    <Th>Company</Th>
                    <Th>Email</Th>
                    <Th>Phone</Th>
                    <Th>Authorized Time</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {allItem.length > 0 &&
                    allItem.map((store) => (
                      <Tr>
                        <Td>{store.name}</Td>
                        <Td>{store.url}</Td>
                        <Td>{store.country_name}</Td>
                        <Td>{store.store_platform.name}</Td>
                        <Td>{store.store_platform.email}</Td>
                        <Td>{store.store_platform.phone_number}</Td>
                        <Td>{store.authorized_time}</Td>
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
                            View Store
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </Tabs>
          </Box>
        </>
      )}
    </Flex>
  );
};

export default IntegrationPage;
