import {
  useColorModeValue,
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
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
  useDisclosure,
  VStack,
  Text,
  Button,
  Icon,
} from "@chakra-ui/react";
import DeleteDialog from "components/Dialog/DeleteDialog";
import Filter from "components/Filter/Filter";
import React, { ChangeEvent, useRef, useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiTrash2,
  FiEdit3,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator
} from "@ajna/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const PendingOrderPage = () => {
  let cardColor = useColorModeValue("white", "gray.700");
  let borderColor = useColorModeValue("transparent", "gray.600");

  const tabs = [
    {
      id: 1,
      label: "To be Accepted",
      number: 10,
    },
    {
      id: 2,
      label: "To be Delivered",
      number: 4,
    },
    {
      id: 3,
      label: "Process Failed",
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

  const cancelRef = useRef(null);

  const [selectedTab, setSelectedTab] = useState<Number>(1);

  const [isEmpty, setIsEmpty] = useState<Boolean>(true);

  const [pageList, setPageList] = useState<number[]>([1]);

  const [totalPage, setTotalPage] = useState<number>(0);

    // constants
    const outerLimit = 1;
    const innerLimit = 2;

    const {
        pages,
        pagesCount,
        offset,
        currentPage,
        setCurrentPage,
        setIsDisabled,
        isDisabled,
        pageSize,
        setPageSize
    } = usePagination({
      initialState: {
        pageSize: totalPage,
        currentPage: 1,
      },
    });

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
      <Heading as="h4" size="md" mt="10" mb="5">
        Pending Order
      </Heading>

      <Flex flexDirection={{ md: "row", base: "column" }}>
        <Select onChange={handlePageSizeChange} w={{ base: "100%", lg: "40%", xl: "15%" }}>
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
        </Select>

        <InputGroup mt={{ base: "3", sm: "0" }} ml={{ base: "0", md: "5" }} width={{ base: "100%", lg: "40%", xl: "20%" }}>
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
            <TabPanel overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Orders</Th>
                    <Th>Item Name</Th>
                    <Th>Quantity</Th>
                    <Th>Total</Th>
                    <Th>Buyer</Th>
                    <Th>Courier</Th>
                    <Th>Print Status</Th>
                    <Th>Store Name</Th>
                    <Th>Time</Th>
                    <Th>Last Sync</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>OR #123456789</Td>
                    <Td>Chicken Rice</Td>
                    <Td>3</Td>
                    <Td>RM 15.00</Td>
                    <Td>Jessica Tan</Td>
                    <Td>Demo Courier</Td>
                    <Td>
                      <Badge
                        borderRadius="50px"
                        px="3"
                        py="1"
                        colorScheme="green"
                      >
                        Paid
                      </Badge>
                    </Td>
                    <Td>Demo Store</Td>
                    <Td>5 Oct 2021, 10:00am</Td>
                    <Td>5 Oct 2021, 10:00am</Td>
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
                </Tbody>
              </Table>
            </TabPanel>

            <TabPanel overflow="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Orders</Th>
                    <Th>Item Name</Th>
                    <Th>Quantity</Th>
                    <Th>Total</Th>
                    <Th>Buyer</Th>
                    <Th>Courier</Th>
                    <Th>Print Status</Th>
                    <Th>Store Name</Th>
                    <Th>Time</Th>
                    <Th>Last Sync</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {isEmpty ? (
                    <Tr>
                      <Td colSpan={11}>
                        <VStack justifyContent="center">
                          <Img src="box.svg" boxSize="50px" />
                          <Text>No Data</Text>
                        </VStack>
                      </Td>
                    </Tr>
                  ) : (
                    <Tr>
                      <Td>OR #123456789</Td>
                      <Td>Chicken Rice</Td>
                      <Td>3</Td>
                      <Td>RM 15.00</Td>
                      <Td>Jessica Tan</Td>
                      <Td>Demo Courier</Td>
                      <Td>
                        <Badge
                          borderRadius="50px"
                          px="3"
                          py="1"
                          colorScheme="green"
                        >
                          Paid
                        </Badge>
                      </Td>
                      <Td>Demo Store</Td>
                      <Td>5 Oct 2021, 10:00am</Td>
                      <Td>5 Oct 2021, 10:00am</Td>
                      <Td>
                        <HStack>
                          <IconButton
                            colorScheme="blue"
                            aria-label="Edit"
                            icon={<FiEdit3 />}
                          />
                          <IconButton
                            colorScheme="red"
                            aria-label="Delete"
                            icon={<FiTrash2 />}
                            onClick={onOpenFilter}
                          />
                        </HStack>
                      </Td>
                    </Tr>
                  )}
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

      {/* FILTER Modal */}
      {/* <Filter isOpen={ isOpenFilter } onClose={ onCloseFilter } /> */}

      {/* DELETE Alert Dialog */}
      <DeleteDialog
          title="Delete Order?"
          description="Are you sure you want to delete this order?"
          isOpen={ isOpenDeleteAlert }
          onClose={ onCloseDeleteAlert }
          cancelRef={ cancelRef }
      />
    </Flex>
  );
};

export default PendingOrderPage;