import {
  useColorModeValue,
  Flex,
  Heading,
  Img,
  Input,
  Tabs,
  Tab,
  Text,
  Badge,
  Box,
  Select,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  InputGroup,
  InputLeftElement,
  IconButton,
  HStack,
  Icon,
  useDisclosure,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  SimpleGrid,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import DeleteDialog from "components/Dialog/DeleteDialog";
import Filter from "components/Filter/Filter";
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
import { OrderApi } from "api/OrderApi";
import WholeScreenSpinner from "components/Spinner/WholeScreenSpinner";

const OrdersPage = () => {
  let cardColor = useColorModeValue("white", "gray.700");
  let borderColor = useColorModeValue("transparent", "gray.600");

  const tabs = [
    {
      id: 1,
      label: "All",
      number: 10,
    },
    {
      id: 2,
      label: "Pending Payment",
      number: 4,
    },
    {
      id: 3,
      label: "Paid",
      number: 6,
    },
    {
      id: 4,
      label: "Ready to Ship",
      number: 10,
    },
    {
      id: 5,
      label: "Shipping",
      number: 4,
    },
    {
      id: 6,
      label: "Delivered",
      number: 6,
    },
    {
      id: 7,
      label: "Cancelled",
      number: 10,
    },
    {
      id: 8,
      label: "Returned",
      number: 4,
    },
    {
      id: 9,
      label: "Failed",
      number: 6,
    },
  ];

  const {
    isOpen: isOpenDeleteAlert,
    onOpen: onOpenDeleteAlert,
    onClose: onCloseDeleteAlert,
  } = useDisclosure();

  const {
    isOpen: isOpenFilter,
    onOpen: onOpenFilter,
    onClose: onCloseFilter,
  } = useDisclosure();

  const {
    isOpen: isOpenDetail,
    onOpen: onOpenDetail,
    onClose: onCloseDetail,
  } = useDisclosure();

  const cancelRef = useRef(null);

  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [allOrder, setAllOrder] = useState<any[]>([]);
  const [showOrder, setShowOrder] = useState<any[]>([]);
  const [pageList, setPageList] = useState<number[]>([1]);

  useEffect(() => {
    getAllOrder();
  }, []);

  const getAllOrder = async () => {
    setIsLoading(true);
    const { data } = await OrderApi.getWCOrderList();
    console.log(data);
    if (data.status === 0) {
      let array: any[] = [];
      data.response.forEach((arrayItem: any[]) => {
        if (arrayItem.length > 0) {
          array.push(arrayItem);
        }
      });
      console.log(array);
      setAllOrder(array);
      setShowOrder(array[0]);
      let temp: number[] = [];
      let count: number = 0;
      for (let step = 1; step <= array.length; step++) {
        if (array[step - 1].length > 0) {
          temp.push(step);
          count++;
        }
      }
      setTotalPage(count);
      setPageList(temp);
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
    setIsLoading(false);
  };

  const {
    pages,
    pagesCount,
    offset,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
  } = usePagination({
    initialState: {
      pageSize: totalPage,
      currentPage: 1,
    },
  });
  useEffect(() => {
    setShowOrder(allOrder[currentPage - 1]);
  }, [currentPage]);

  // handlers
  const handlePageChange = (nextPage: number): void => {
    // -> request new data using the page number
    setCurrentPage(nextPage);
    console.log("request new data with ->", nextPage);
  };

  const handlePageSizeChange = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const pageSize = Number(event.target.value);

    setPageSize(pageSize);
  };

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "100px" }}>
      {isLoading ? (
        <WholeScreenSpinner />
      ) : (
        <>
          <Heading as="h4" size="md" mt="10" mb="5">
            Orders
          </Heading>

          <Flex flexDirection={{ md: "row", base: "column" }}>
            <InputGroup
              mt={{ base: "3", sm: "0" }}
              width={{ base: "100%", lg: "40%", xl: "20%" }}
            >
              <InputLeftElement
                pointerEvents="none"
                children={<FiSearch color="gray.300" />}
              />
              <Input type="tel" placeholder="Search" />
            </InputGroup>

            {/* <Button
            w={{ base: "100%", lg: "30%", xl: "15%" }}
            leftIcon={<FiFilter />}
            mt={{ base: "3", sm: "0" }}
            ml={{ base: "0", md: "5" }}
            fontSize="16px"
            bg="primary"
            color="white"
            _hover={{
              bg: "blue.200",
            }}
            _active={{
              bg: "blue.400",
            }}
            onClick={onOpenFilter}
        >
          Filters
        </Button> */}

            {/* <Box ml={{ sm: "auto" }}>
          <Menu>
            <MenuButton
              w={{ base: "100%" }}
              as={Button}
              rightIcon={<FiChevronDown />}
              fontSize="16px"
              bg="primary"
              color="white"
              _hover={{
                bg: "blue.200",
              }}
              _active={{
                bg: "blue.400",
              }}
            >
              Export
            </MenuButton>
            <MenuList p="16px 8px">
              <Flex flexDirection="column">
                <MenuItem borderRadius="8px" mb="10px">
                  Export by Selected
                </MenuItem>
                <MenuItem borderRadius="8px" mb="10px">
                  Export All
                </MenuItem>
                <MenuItem borderRadius="8px" mb="10px">
                  Export History
                </MenuItem>
              </Flex>
            </MenuList>
          </Menu>
        </Box> */}
          </Flex>

          <Box
            mt="5"
            borderRadius="20px"
            p="1.5rem"
            bg={cardColor}
            boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
            border="1px"
            borderColor={borderColor}
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
                        bg={selectedTab === tab.id ? "primary" : "gray.300"}
                        color={selectedTab === tab.id ? "white" : "gray.600"}
                      >
                        {tab.number}
                      </Badge>
                    </Tab>
                  );
                })}
              </TabList>
              <TabPanels>
                <TabPanel overflow="auto">
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Orders</Th>
                        <Th>Total</Th>
                        <Th>Buyer</Th>
                        <Th>Payment Method</Th>
                        <Th>Status</Th>
                        <Th>Created Time</Th>
                        <Th>Last Modified</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {isEmpty && (
                        <Tr>
                          <Td colSpan={8}>
                            <VStack justifyContent="center">
                              <Img src="box.svg" boxSize="50px" />
                              <Text>No Data</Text>
                            </VStack>
                          </Td>
                        </Tr>
                      )}
                      {!isEmpty &&
                        showOrder.map((order) => (
                          <Tr key={order.id}>
                            <Td>{order.id}</Td>
                            <Td>{order.currency_symbol + " " + order.total}</Td>
                            <Td>
                              {order.billing.first_name +
                                order.billing.last_name}
                            </Td>
                            <Td>{order.payment_method_title}</Td>
                            <Td>{order.status}</Td>
                            <Td>{order.date_created_gmt}</Td>
                            <Td>{order.date_modified_gmt}</Td>
                            <Td>
                              <HStack>
                                {/* <IconButton
                                                    colorScheme="blue"
                                                    aria-label="Search database"
                                                    icon={<FiEdit3 />}
                                                /> */}
                                <IconButton
                                  colorScheme="red"
                                  aria-label="Search database"
                                  icon={<FiTrash2 />}
                                  onClick={onOpenDeleteAlert}
                                />
                              </HStack>
                            </Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>

          {/* Pagination */}
          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          >
            <PaginationContainer align="center" p={4} w="full">
              <PaginationPrevious
                mr={5}
                w="40px"
                h="40px"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage + 1)}
                aria-label="Back"
              >
                <Icon
                  as={FiChevronLeft}
                  color="gray.600"
                  fontSize="20px"
                  ms={{ base: "12px", xl: "0px" }}
                  me="6px"
                />
              </PaginationPrevious>

              <PaginationPageGroup
                isInline
                align="center"
                separator={
                  <PaginationSeparator
                    onClick={() => console.log("Seperator")}
                    bg="gray.300"
                    fontSize="sm"
                    w={7}
                    jumpSize={11}
                  />
                }
              >
                {pageList.map((page: number) => (
                  <PaginationPage
                    width="40px"
                    h="40px"
                    bg="gray.200"
                    color="gray.600"
                    key={`pagination_page_${page}`}
                    page={page}
                    onClick={() => console.log("Page Number")}
                    fontSize="sm"
                    _current={{
                      bg: "primary",
                      color: "white",
                      fontSize: "sm",
                      w: "40px",
                    }}
                    _hover={{
                      bg: "blue.200",
                    }}
                  />
                ))}
              </PaginationPageGroup>

              <PaginationNext
                ml={5}
                w="40px"
                h="40px"
                disabled={currentPage === totalPage}
                onClick={() => handlePageChange(currentPage - 1)}
                aria-label="Next"
              >
                <Icon
                  as={FiChevronRight}
                  color="gray.600"
                  fontSize="20px"
                  ms={{ base: "12px", xl: "0px" }}
                  me="6px"
                />
              </PaginationNext>
            </PaginationContainer>
          </Pagination>

          {/* <Filter isOpen={ isOpenFilter } onClose={ onCloseFilter } /> */}

          {/* DELETE Alert Dialog */}
          <DeleteDialog
            title="Delete Order?"
            description="Are you sure you want to delete this order?"
            isOpen={isOpenDeleteAlert}
            onClose={onCloseDeleteAlert}
            cancelRef={cancelRef}
          />

          {/* ORDER DETAILS */}
          <Modal
            isCentered
            onClose={onCloseDetail}
            isOpen={isOpenDetail}
            motionPreset="slideInBottom"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>OR #123456789</ModalHeader>

              <ModalCloseButton />

              <ModalBody>
                <SimpleGrid spacingY={2}>
                  <Box
                    mb="2"
                    border="1px"
                    borderColor={borderColor}
                    bg={cardColor}
                    borderRadius="20px"
                    p="1.5rem"
                    boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.05)"
                  >
                    <Flex>
                      <Avatar
                        src="https://bit.ly/broken-link"
                        alignSelf="center"
                        mr="5"
                        w="60px"
                        h="60px"
                      />
                      <Flex flexDirection="column">
                        <Text fontWeight="bold">Jesicca Tan</Text>
                        <Text fontSize="sm">jessicatan@gmail.com</Text>
                        <Text fontSize="sm">0123456789</Text>
                      </Flex>
                    </Flex>
                  </Box>
                  <Flex>
                    <Text fontSize="sm">Payment Method</Text>
                    <Text fontSize="sm" ml="auto" fontWeight="bold">
                      Cash
                    </Text>
                  </Flex>

                  <Flex>
                    <Text fontSize="sm">Time</Text>
                    <Text fontSize="sm" ml="auto" fontWeight="bold">
                      5 Oct 2021, 10:00am
                    </Text>
                  </Flex>

                  <Flex>
                    <Text fontSize="sm">Status</Text>
                    <Badge
                      ml="auto"
                      borderRadius="50px"
                      px="3"
                      py="1"
                      colorScheme="green"
                    >
                      Paid
                    </Badge>
                  </Flex>

                  <Divider my="2" orientation="horizontal" />

                  <Heading as="h4" size="sm">
                    Order List
                  </Heading>
                  <Flex>
                    <Img src="" boxSize="50px" mr={5} />
                    <Text fontSize="sm" alignSelf="center">
                      Chicken Rice @RM 12 <Badge>x5</Badge>
                    </Text>
                    <Text fontSize="sm" alignSelf="center" ml="auto">
                      RM 60
                    </Text>
                  </Flex>

                  <Flex>
                    <Img src="" boxSize="50px" mr={5} />
                    <Text fontSize="sm" alignSelf="center">
                      Chicken Rice @RM 12 <Badge>x5</Badge>
                    </Text>
                    <Text fontSize="sm" alignSelf="center" ml="auto">
                      RM 60
                    </Text>
                  </Flex>

                  <Divider my="2" orientation="horizontal" />

                  <Flex>
                    <Text fontSize="xl" fontWeight="bold">
                      Total
                    </Text>
                    <Text fontSize="xl" ml="auto" fontWeight="bold">
                      RM 120
                    </Text>
                  </Flex>
                </SimpleGrid>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" onClick={onCloseDetail}>
                  Close
                </Button>
                {/* <Button variant="ghost">Secondary Action</Button> */}
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Flex>
  );
};

export default OrdersPage;
