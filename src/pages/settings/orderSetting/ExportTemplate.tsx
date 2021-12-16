import { HStack } from '@chakra-ui/layout'
import { Table, Thead, Tr, Th, Tbody, Td, IconButton, useDisclosure, Button } from '@chakra-ui/react'
import React from 'react'
import { FiEdit3, FiPlus, FiTrash2 } from 'react-icons/fi'

const ExportTemplate = () => {

    const { 
        isOpen: isOpenDeleteAlert,
        onOpen: onOpenDeleteAlert, 
        onClose: onCloseDeleteAlert, 
    } = useDisclosure()

    return (
        <>  
            <Button
                my="20px"
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
                
            >
                Add Template
            </Button>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Template Name</Th>
                        <Th>Creator</Th>
                        <Th>Create Time</Th>
                        <Th>Update Time</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>Demo Template</Td>
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
        </>
    )
}

export default ExportTemplate
