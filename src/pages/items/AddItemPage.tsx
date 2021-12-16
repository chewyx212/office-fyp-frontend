import { ArrowBackIcon, ArrowForwardIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { Text, useColorModeValue, Avatar, AvatarBadge, Box, Button, Divider, Flex, FormControl, FormLabel, Heading, Icon, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Select, SimpleGrid, Stack, Textarea, Table, HStack, IconButton, Img, Tbody, Td, Th, Thead, Tr, VStack, InputGroup, InputLeftAddon, Tooltip, Switch, InputRightAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Badge } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import BasicInformationForm from 'components/addItem/BasicInformationForm';
import CostInformation from 'components/addItem/CostInformation';
import Delivery from 'components/addItem/Delivery';
import ProductInformation from 'components/addItem/ProductInformation';
import FileUploader from 'components/FileUploader/FileUploader';
import ImageUploader from 'components/FileUploader/ImageUploader';
import React, { useState } from 'react'
import { FiEdit3 } from 'react-icons/fi';

const AddItemPage = () => {

    let cardColor = useColorModeValue("white", "gray.700");
    let borderColor = useColorModeValue("transparent", "gray.600");
    let dividerColor = useColorModeValue("gray.200", "gray.600");
    let sectionColor = useColorModeValue("gray.50", "gray.800");

    const { nextStep, prevStep, reset, activeStep } = useSteps({
        initialStep: 0,
    })

    const [file, setFile] = useState(null);

    return (
        <Flex flexDirection="column" pt={{ base: "120px", md: "100px" }}>
            <Heading as="h4" size="md" mb="10">Add Item</Heading>
            <Steps colorScheme="twitter" activeStep={activeStep} mb="50px">
                <Step label="Step 1" description="Basic Information">
                    <BasicInformationForm />
                </Step>

                <Step label="Step 2" description="Product Information">
                    <ProductInformation />
                </Step>

                <Step label="Step 3" description="Media Settings">
                    <Box border="1px" borderColor={ borderColor } width="100%" borderRadius="15px" p="1.5rem" bg={ cardColor } boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)">
                        <Heading as="h4" size="md">Media Settings (Optional)</Heading>
                        <Divider my="1.5rem" borderColor={ dividerColor } />
                        <FormLabel>Product Image <Badge>Max 9</Badge></FormLabel>
                        <ImageUploader setFile={ setFile } />
                    </Box>
                </Step>

                <Step label="Step 4" description="Delivery">
                    <Delivery />
                </Step>

                <Step label="Step 5" description="Cost Information">
                    <CostInformation />
                </Step>
            </Steps>

            <Stack justifyContent="right" direction="row" spacing={4} mt="5">
                {
                    activeStep != 0 &&
                    <Button
                        leftIcon={<ArrowBackIcon />} 
                        color="primary" 
                        borderColor="primary" 
                        variant="outline"
                        onClick={ prevStep }
                    >
                        Back
                    </Button>
                }
                
                {
                    activeStep === 4 ?
                        <Button 
                            // rightIcon={<ArrowForwardIcon />} 
                            color="white" 
                            bg="primary" 
                            _hover={{
                                bg: "blue.200",
                            }}
                            _active={{
                                bg: "blue.400",
                            }}variant="solid"
                        >
                            Save
                        </Button>
                        :
                        <Button 
                            rightIcon={<ArrowForwardIcon />} 
                            color="white" 
                            bg="primary" 
                            _hover={{
                                bg: "blue.200",
                            }}
                            _active={{
                                bg: "blue.400",
                            }}variant="solid"
                            onClick={ nextStep }
                        >
                            Next
                        </Button>
                }
            </Stack>
        
            
        </Flex>
    )
}

export default AddItemPage
