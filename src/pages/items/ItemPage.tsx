import {
  Flex,
  useColorModeValue,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  VStack,
  Img,
  useDisclosure,
  Text,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  MenuGroup,
  Select,
  Avatar,
  Badge,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import DeleteDialog from "components/Dialog/DeleteDialog";
import Filter from "components/Filter/Filter";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiEdit3,
  FiTrash2,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useHistory } from "react-router";
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator,
} from "@ajna/pagination";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { ItemApi } from "api/ItemApi";
import WholeScreenSpinner from "components/Spinner/WholeScreenSpinner";

const ItemPage = () => {
  let cardColor = useColorModeValue("white", "gray.700");
  let borderColor = useColorModeValue("transparent", "gray.600");

  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allItem, setAllItem] = useState<any[]>([]);
  const [showItem, setShowItem] = useState<any[]>([]);
  const [pageList, setPageList] = useState<number[]>([1]);
  const [totalPage, setTotalPage] = useState<number>(0);

  const {
    isOpen: isOpenDeleteAlert,
    onOpen: onOpenDeleteAlert,
    onClose: onCloseDeleteAlert,
  } = useDisclosure();

  const {
    isOpen: isOpenDetail,
    onOpen: onOpenDetail,
    onClose: onCloseDetail,
  } = useDisclosure();

  const {
    isOpen: isOpenFilter,
    onOpen: onOpenFilter,
    onClose: onCloseFilter,
  } = useDisclosure();

  const cancelRef = useRef(null);

  const history = useHistory();
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
    getAllItem();
  }, []);

  const getAllItem = async () => {
    setIsLoading(true);
    const { data } = await ItemApi.getWCItemList();
    console.log(data);
    if (data.status === 0) {
      let array: any[] = [];
      data.response.forEach((arrayItem: any[]) => {
        if (arrayItem.length > 0) {
          array.push(arrayItem);
        }
      });
      console.log(array);
      setAllItem(array);
      setShowItem(array[0]);
      let temp: number[] = [];
      let count: number = 0;
      for (let step = 1; step <= array.length; step++) {
        if (array[step - 1].length > 0) {
          count++;
        }
      }
      for (let step = 1; step <= count; step++) {
        temp.push(step);
      }
      setTotalPage(count);
      setPageList(temp);
      setIsEmpty(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setShowItem(allItem[currentPage - 1]);
  }, [currentPage]);

  // handlers
  const handlePageChange = (nextPage: number): void => {
    // -> request new data using the page number
    setCurrentPage(nextPage);
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
            Item
          </Heading>

          <Flex flexDirection={{ md: "row", base: "column" }}>
            {/* <Select
          onChange={handlePageSizeChange}
          w={{ base: "100%", lg: "40%", xl: "15%" }}
        >
          <option value="10">10 per page</option>
          <option value="25">25 per page</option>
          <option value="50">50 per page</option>
        </Select> */}

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
                    leftIcon={ <FiFilter /> }
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
                    onClick={ onOpenFilter }
                >
                    Filters
                </Button> */}

            {/* <Box ml={{ sm: "auto" }} mr="5">
                    <Menu>
                        <MenuButton 
                            as={ Button }
                            rightIcon={<FiChevronDown />}   
                            fontSize="16px"
                            variant="outline"
                            borderColor="primary"
                            color="primary"
                        >
                            Import / Export
                        </MenuButton>
                        <MenuList p="16px 8px">
                            <MenuGroup title="Import">
                                <MenuItem>Import to Bind Item</MenuItem>
                                <MenuItem>Import to Create Item</MenuItem>
                                <MenuItem>Import to Edit Item</MenuItem>
                                <MenuItem>Update Auto-Bind Rules</MenuItem>
                            </MenuGroup>

                            <MenuDivider />
                            
                            <MenuGroup title="Export">
                                <MenuItem>Export Selected</MenuItem>
                                <MenuItem>Export by Page</MenuItem>
                                <MenuItem>Export All Auto-Bind Rules</MenuItem>
                                <MenuItem>Mass Operation History</MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                </Box> */}

            <Button
              width={{ base: "100%", lg: "15%", xl: "20%" }}
              mt={{ base: "3", sm: "0" }}
              ml="auto"
              leftIcon={<FiPlus />}
              fontSize="16px"
              bg="primary"
              color="white"
              _hover={{
                bg: "blue.200",
              }}
              _active={{
                bg: "blue.400",
              }}
              onClick={() => history.push("/add-item")}
            >
              Add Item
            </Button>
          </Flex>

          <Box
            overflowX="auto"
            mt="5"
            borderRadius="20px"
            p="1.5rem"
            bg={cardColor}
            boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
            border="1px"
            borderColor={borderColor}
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Item</Th>
                  <Th>Status</Th>
                  <Th>Available Stock</Th>
                  <Th>Price</Th>
                  <Th>Total Sale</Th>
                  <Th>Created Date</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {isEmpty && (
                  <Tr>
                    <Td colSpan={7}>
                      <VStack justifyContent="center">
                        <Img src="box.svg" boxSize="50px" />
                        <Text>No Data</Text>
                      </VStack>
                    </Td>
                  </Tr>
                )}

                {!isEmpty &&
                  showItem.map((item) => (
                    <Tr key={item.id}>
                      <Td>
                        <Flex alignItems="center">
                          <Img
                            src={item.images[0]?.src}
                            boxSize="60px"
                            mr="5"
                          />
                          {item.name}
                        </Flex>
                      </Td>
                      <Td>{item.stock_status}</Td>
                      <Td> 23</Td>
                      <Td>{item.price}</Td>
                      <Td>{item.total_sales}</Td>
                      <Td>{item.date_created_gmt}</Td>
                      <Td>
                        <HStack>
                          <IconButton
                            colorScheme="blue"
                            aria-label="Search database"
                            icon={<FiEdit3 />}
                          />
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
          </Box>

          {/* Pagination */}
          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          >
            <PaginationContainer align="center" p={4} w="full">
              <Button
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
              </Button>

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

              <Button
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
              </Button>
            </PaginationContainer>
          </Pagination>

          {/* <Filter isOpen={ isOpenFilter } onClose={ onCloseFilter } /> */}

          <DeleteDialog
            title="Delete Item?"
            description="Are you sure you want to delete this item?"
            isOpen={isOpenDeleteAlert}
            onClose={onCloseDeleteAlert}
            cancelRef={cancelRef}
          />

          {/* ITEM DETAILS */}
          <Modal
            isCentered
            onClose={onCloseDetail}
            isOpen={isOpenDetail}
            motionPreset="slideInBottom"
            size="xl"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Demo Item</ModalHeader>

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
                    <Flex alignItems="center">
                      <Img src="" boxSize="60px" mr="5" />
                      <Flex flexDirection="column">
                        <Text fontWeight="bold">
                          Demo Item <Badge>barcode123456</Badge>
                        </Text>
                        <Text fontSize="sm">Demo Category</Text>
                        <Text fontSize="sm">Lorem Ipsum Description</Text>
                      </Flex>
                    </Flex>
                  </Box>

                  <Heading as="h4" size="sm">
                    Package Size
                  </Heading>
                  <Flex>
                    <Text fontSize="sm">Length * Width * Height (cm)</Text>
                    <Text fontSize="sm" ml="auto" fontWeight="bold">
                      1 * 1 * 1
                    </Text>
                  </Flex>

                  <Flex>
                    <Text fontSize="sm">Weight (kg)</Text>
                    <Text fontSize="sm" ml="auto" fontWeight="bold">
                      5
                    </Text>
                  </Flex>

                  <Divider my="2" orientation="horizontal" />

                  {/* If no variation, just hide it */}
                  <Heading as="h4" size="sm">
                    Variation
                  </Heading>

                  <Box overflow="auto" bg={cardColor} borderColor={borderColor}>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          {/* Variation 1 */}
                          <Th>Color</Th>
                          {/* Variation 2 */}
                          <Th>Size</Th>
                          <Th>Default Price</Th>
                          <Th>
                            <Flex>
                              Available Stock
                              <Tooltip
                                hasArrow
                                label="The stock that can be sold in Channel, Available Stock = Warehouse Stock - Spare Stock - Locked Stock - Promotion Stock"
                                placement="top"
                              >
                                <InfoOutlineIcon
                                  cursor="pointer"
                                  ml="2"
                                  fontSize="md"
                                />
                              </Tooltip>
                            </Flex>
                          </Th>
                          <Th>Master SKU</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>Blue</Td>
                          <Td>S</Td>
                          <Td>RM 5</Td>
                          <Td>5</Td>
                          <Td>Demo SKU</Td>
                        </Tr>
                        <Tr>
                          <Td>Blue</Td>
                          <Td>M</Td>
                          <Td>RM 5</Td>
                          <Td>5</Td>
                          <Td>Demo SKU</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </Box>
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

export default ItemPage;
