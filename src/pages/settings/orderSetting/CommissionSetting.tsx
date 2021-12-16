import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import React from 'react'

const CommissionSetting = () => {
    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>Channel</Th>
                    <Th>Store Name</Th>
                    <Th>Commision Percent (%)</Th>
                    <Th>Create Time</Th>
                    <Th>Update Time</Th>
                    <Th>Creator</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>Demo Channel</Td>
                    <Td>Demo Store</Td>
                    <Td>12</Td>
                    <Td>7 Oct 2021, 2:00pm</Td>
                    <Td>7 Oct 2021, 2:00pm</Td>
                    <Td>Johnny</Td>
                </Tr>
            </Tbody>
        </Table>
    )
}

export default CommissionSetting
