import { Box, Button, Flex, Heading, HStack, Icon, IconButton, Img, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Select, Tab, Table, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react'
import Filter from 'components/Filter/Filter';
import React, { ChangeEvent, useRef, useState } from 'react'
import { FiSearch, FiFilter, FiChevronDown, FiRefreshCw, FiEdit3, FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
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
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const PriceMangementPage = () => {
    let cardColor = useColorModeValue("white", "gray.700");
    let borderColor = useColorModeValue("transparent", "gray.600");

    const [isEmpty, setIsEmpty] = useState<Boolean>(false);

    const [pageList, setPageList] = useState<number[]>([1]);

    const [totalPage, setTotalPage] = useState<number>(0);

    const tabs = [
        {
          id: 1,
          label: "Price List",
        },
        {
          id: 2,
          label: "Update Failed",
        },
      ];

    const { 
        isOpen: isOpenFilter, 
        onOpen: onOpenFilter, 
        onClose: onCloseFilter, 
    } = useDisclosure()

    const { 
        isOpen: isOpenDeleteAlert,
        onOpen: onOpenDeleteAlert, 
        onClose: onCloseDeleteAlert, 
    } = useDisclosure()

    const cancelRef = useRef(null)

    const history = useHistory();

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
                Price Management
            </Heading>

            <Flex flexDirection={{ md: "row", base: "column" }}>
                <Select
                onChange={handlePageSizeChange}
                w={{ base: "100%", lg: "40%", xl: "15%" }}
                >
                <option value="10">10 per page</option>
                <option value="25">25 per page</option>
                <option value="50">50 per page</option>
                </Select>

                <InputGroup
                mt={{ base: "3", sm: "0" }}
                ml={{ base: "0", md: "5" }}
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

                {/* <Box ml="auto" mr="5">
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
                                <MenuItem>Import Update Price</MenuItem>
                            </MenuGroup>

                            <MenuDivider />
                            
                            <MenuGroup title="Export">
                                <MenuItem>Export Selected</MenuItem>
                                <MenuItem>Export by Page</MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                </Box> */}

                <Button 
                    width={{ base: "100%", lg: "15%", xl: "20%" }}
                    mt={{ base: "3", sm: "0" }}
                    ml="auto"
                    leftIcon={<FiRefreshCw />}   
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
                    Sync Promotion
                </Button>
            </Flex>

            <Box
                mt="5"
                borderRadius="20px"
                p="1.5rem"
                bg={ cardColor }
                boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
                border="1px"
                borderColor={ borderColor }
            >
                <Tabs>
                    <TabList>
                        {tabs.map((tab, index) => {
                            return (
                                <Tab key={index}>
                                    {tab.label}
                                </Tab>
                            );
                        })}
                    </TabList>
            
                    <TabPanels>
                        <TabPanel>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Item</Th>
                                        <Th>Master SKU</Th>
                                        <Th>Default Price</Th>
                                        <Th>Store Name</Th>
                                        <Th>Price</Th>
                                        <Th>Create Time</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        isEmpty ?

                                            <Tr>
                                                <Td colSpan={11}>
                                                    <VStack justifyContent="center">
                                                        <Img src="box.svg" boxSize="50px" />
                                                        <Text>No Data</Text>
                                                    </VStack>
                                                </Td>
                                            </Tr>

                                        :
                                            <Tr>
                                                <Td>
                                                    <Flex alignItems="center">
                                                        <Img src="" boxSize="60px" mr="5" />
                                                        Demo Item
                                                    </Flex>
                                                </Td>
                                                <Td>Demo SKU</Td>
                                                <Td>23</Td>
                                                <Td>Demo Store</Td>
                                                <Td>50</Td>
                                                <Td>5 Oct 2021, 10:00am</Td>
                                            </Tr>
                                    }
                                    
                                </Tbody>
                            </Table>
                        </TabPanel>

                        <TabPanel>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Item</Th>
                                        <Th>Master SKU</Th>
                                        <Th>Store Name</Th>
                                        <Th>Price</Th>
                                        <Th>Failed Reason</Th>
                                        <Th>Create Time</Th>
                                        <Th>Action</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        isEmpty ?
                                            <Tr>
                                                <Td colSpan={11}>
                                                    <VStack justifyContent="center">
                                                        <Img src="box.svg" boxSize="50px" />
                                                        <Text>No Data</Text>
                                                    </VStack>
                                                </Td>
                                            </Tr>

                                        :
                                            <Tr>
                                                <Td>
                                                    <Flex alignItems="center">
                                                        <Img src="" boxSize="60px" mr="5" />
                                                        Demo Item
                                                    </Flex>
                                                </Td>
                                                <Td>Demo SKU</Td>
                                                <Td>Demo Store</Td>
                                                <Td>50</Td>
                                                <Td>Failed Reason</Td>
                                                <Td>5 Oct 2021, 10:00am</Td>
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
                                                            onClick={ onOpenDeleteAlert }
                                                        />
                                                    </HStack>
                                                </Td>
                                            </Tr>
                                    }
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
        </Flex>
    )
}

export default PriceMangementPage
