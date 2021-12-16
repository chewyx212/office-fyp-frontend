
import {
  Box,
  VStack,
  useColorModeValue,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  Flex,
  Heading,
  Img,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  Select,
  Icon,
} from "@chakra-ui/react";
import Filter from "components/Filter/Filter";
import React, { ChangeEvent, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiFilter, FiSearch, FiTrash2 } from "react-icons/fi";
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
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const AbnormalOrderPage = () => {
  let cardColor = useColorModeValue("white", "gray.700");
  let borderColor = useColorModeValue("transparent", "gray.600");

  const [isEmpty, setIsEmpty] = useState<Boolean>(false);

  const [pageList, setPageList] = useState<number[]>([1]);

  const [totalPage, setTotalPage] = useState<number>(0);

  const {
    isOpen: isOpenFilter,
    onOpen: onOpenFilter,
    onClose: onCloseFilter,
  } = useDisclosure();

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
    setPageSize,
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
        Abnormal Orders
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
      </Flex>

      <Box
        mt="5"
        borderRadius="20px"
        p="1.5rem"
        bg={cardColor}
        boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
        border="1px"
        borderColor={borderColor}
        overflow="auto"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Failed Reason</Th>
              <Th>Orders</Th>
              <Th>Store Name</Th>
              <Th>Created At</Th>
              <Th>Update At</Th>
              <Th>Last Sync</Th>
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
                <Td>Demo reason</Td>
                <Td>OR #123456789</Td>
                <Td>Demo Store</Td>
                <Td>5 Oct 2021, 10:00am</Td>
                <Td>5 Oct 2021, 10:00am</Td>
                <Td>5 Oct 2021, 10:00am</Td>
              </Tr>
            )}
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
  );
};

export default AbnormalOrderPage;
