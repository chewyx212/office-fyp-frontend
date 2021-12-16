import { HStack } from '@chakra-ui/layout';
import { useColorModeValue, useDisclosure, Tabs, TabList, Tab, TabPanels, TabPanel, Table, Thead, Tr, Th, Tbody, Td, IconButton } from '@chakra-ui/react';
import React from 'react'
import { FiEdit3, FiTrash2 } from 'react-icons/fi';

const LazadaInvoiceSettings = () => {

    let tabColor = useColorModeValue("gray.100", "gray.700");

    const lazadaInvoiceTabs = [
        {
            id: 1,
            label: "Invoice Rules",
        },
        {
            id: 2,
            label: "Store Management",
        },
    ]

    const { 
        isOpen: isOpenDeleteAlert,
        onOpen: onOpenDeleteAlert, 
        onClose: onCloseDeleteAlert, 
    } = useDisclosure()

    return (
        <Tabs variant="unstyled" my="20px">
            <TabList width="300px" borderRadius="10px" bg={ tabColor }>
                {
                    lazadaInvoiceTabs.map((tab: any) => {
                        return (
                            <Tab borderRadius="10px" _selected={{ color: "white", bg: "primary" }}>{ tab.label }</Tab>
                        )
                    })
                }
            </TabList>
            
            {/* Inner Tab 1: Invoice Rules */}
            <TabPanels>
                <TabPanel>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Rule Name</Th>
                                <Th>Rule Type</Th>
                                <Th>Prefix</Th>
                                <Th>Custom Number</Th>
                                <Th>Applicable Number of Stores</Th>
                                <Th>Create Time</Th>
                                <Th>Update Time</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Demo Rule</Td>
                                <Td>Demo Rule Type</Td>
                                <Td>Demo Prefix</Td>
                                <Td>123</Td>
                                <Td>123</Td>
                                <Td>7 Oct 2021, 2:00pm</Td>
                                <Td>7 Oct 2021, 2:00pm</Td>
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
                        </Tbody>
                    </Table>
                </TabPanel>

                {/* Inner Tab 2: Store Management */}
                <TabPanel>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Store Name</Th>
                                <Th>Invoice Rules</Th>
                                <Th>Rule Type</Th>
                                <Th>Creator</Th>
                                <Th>Create Time</Th>
                                <Th>Update Time</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Demo Store</Td>
                                <Td>Demo Invoice Rule</Td>
                                <Td>Demo Rule Type</Td>
                                <Td>Johnny</Td>
                                <Td>7 Oct 2021, 2:00pm</Td>
                                <Td>7 Oct 2021, 2:00pm</Td>
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
                        </Tbody>
                    </Table>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default LazadaInvoiceSettings
