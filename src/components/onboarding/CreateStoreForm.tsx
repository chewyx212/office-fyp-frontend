import { FormControl, FormLabel } from '@chakra-ui/form-control'
import Icon from '@chakra-ui/icon'
import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/input'
import { Box, Heading, Divider, Flex, SimpleGrid } from '@chakra-ui/layout'
import { Avatar, AvatarBadge, Select, Button, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FiCamera } from 'react-icons/fi'

const CreateStoreForm = () => {

    const [description, setDescription] = useState<any>("");

    const handleInputChange = (e: any) => {
        let inputValue = e.target.value
        setDescription(inputValue)
    }

    return (
        <Box
            width="100%"
            borderRadius="15px"
            p="1.5rem"
            bg="white"
            boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
        >
            <Heading as="h4" size="md">
                Create Store
            </Heading>
            <Divider my="1.5rem" />

            <form>
                <FormControl>
                    <SimpleGrid mt="10" columns={{ base: 1, md: 2 }} spacing={10}>
                        <Box>
                            <FormLabel>Store Name</FormLabel>
                            <Input
                                borderRadius="15px"
                                fontSize="sm"
                                mb="5px"
                                type="text"
                                placeholder="Store Name"
                                size="lg"
                            />
                        </Box>

                        <Box>
                            <FormLabel>Store URL</FormLabel>
                            <InputGroup size="lg">
                            <InputLeftAddon
                                children="https://"
                                fontSize="sm"
                                borderRadius="15px"
                            />
                            <Input
                                borderRadius="15px"
                                fontSize="sm"
                                mb="5px"
                                type="text"
                                placeholder="Store URL"
                            />
                            </InputGroup>
                        </Box>
                    </SimpleGrid>

                    <Box mt="40px">
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            value={ description } 
                            onChange={ handleInputChange } 
                            placeholder="Write some desription about your store"
                            size="lg"
                            fontSize="sm"
                            borderRadius="15px"
                        />
                    </Box>

                    <SimpleGrid mt="10" columns={{ base: 1, md: 2 }} spacing={10}>
                        <Box>
                            <FormLabel>Scope</FormLabel>
                            <Select
                                borderRadius="15px"
                                fontSize="sm"
                                mb="5"
                                size="lg"
                                placeholder="Select Scope"
                            >
                                <option>Read</option>
                            </Select>
                        </Box>

                        <Box>
                            <FormLabel>Store Platform</FormLabel>
                            <Select
                                borderRadius="15px"
                                fontSize="sm"
                                mb="5"
                                size="lg"
                                placeholder="Select Store Platform"
                            >
                                <option>Shopee</option>
                            </Select>
                        </Box>

                        <Box>
                            <FormLabel>App Name</FormLabel>
                            <Input
                                borderRadius="15px"
                                fontSize="sm"
                                mb="5px"
                                type="text"
                                placeholder="App Name"
                                size="lg"
                            />
                        </Box>

                    </SimpleGrid>

                </FormControl>

                <Button
                    fontSize="16px"
                    type="submit"
                    bg="primary"
                    w="100%"
                    h="45"
                    mt="40px"
                    color="white"
                    _hover={{
                        bg: "blue.200",
                    }}
                    _active={{
                        bg: "blue.400",
                    }}
                >
                Submit
                </Button>
            </form>
        </Box>
    )
}

export default CreateStoreForm
