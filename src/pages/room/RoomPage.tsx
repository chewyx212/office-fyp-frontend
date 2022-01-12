import {
  Flex,
  Button,
  Heading,
  useToast,
  Text,
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Badge,
  Icon,
  useColorModeValue,
  Spinner,
  FormHelperText,
  FormLabel,
  Input,
  FormControl,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Switch,
} from "@chakra-ui/react";
import { RoomApi } from "api/RoomApi";
import { logout } from "app/auth/authSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { RoomType } from "types/RoomType";

interface CreateRoomForm {
  name: string;
  detail: string;
  status: boolean;
}
const RoomPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateRoomForm>({
    defaultValues: { name: "", detail: "", status: false },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [roomList, setRoomList] = useState<RoomType[]>([]);
  let cardColor = useColorModeValue("white", "gray.700");
  let borderColor = useColorModeValue("transparent", "gray.600");
  const history = useHistory();
  const dispatch = useAppDispatch();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();
  const savedBranchs = useAppSelector((state) => state.company.selectedBranch);
  useEffect(() => {
    getAllRoom();
  }, []);

  const getAllRoom = async () => {
    setIsLoading(true);
    console.log("here");
    console.log(savedBranchs);
    if (savedBranchs) {
      const result = await RoomApi.getAllRoom(savedBranchs);
      console.log(result);
      if (result.status === 200 && result.data) {
        if (result.data.length > 0) {
          setRoomList(result.data);
        }
      } else if (result.status === 200) {
        history.push("/onboarding");
      } else if (result.status === 401) {
        dispatch(logout());
      } else if (result.status === 404) {
        console.log(result.data.message);
      }
    } else {
      history.push("/dashboard");
    }

    setIsLoading(false);
  };

  const onCloseAddModal = () => {
    setOpenAddModal(false);
    reset();
  };

  const onOpenEditModal = (room: RoomType) => {
    setOpenEditModal(true);
    setSelectedRoom(room.id);
    setValue("name", room.name);
    setValue("detail", room.detail);
    setValue("status", room.status);
  };

  const onCloseEditModal = () => {
    setOpenEditModal(false);
    reset();
  };

  const onSubmit = async (field: CreateRoomForm) => {
    const payload = {
      ...field,
      branchId: savedBranchs,
    };
    console.log(payload);
    const result = await RoomApi.createRoom(payload);
    console.log(result);
    if (result.status === 201) {
      toast({
        title: "Created Successfull!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      getAllRoom();
    } else {
      toast({
        title: "Something wrong...",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    onCloseAddModal();
  };
  const onEdit = async (payload: CreateRoomForm) => {
    const result = await RoomApi.editRoom(selectedRoom, payload);
    console.log(result);
    if (result.status === 200) {
      toast({
        title: "Edit Successfull!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      getAllRoom();
    } else {
      toast({
        title: "Something wrong...",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    onCloseEditModal();
  };

  return (
    <>
      {isLoading ? (
        <Flex
          pt={{ base: "120px", md: "100px" }}
          h="100%"
          w="100%"
          justify="center"
        >
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Flex flexDirection="column" pt={{ base: "120px", md: "100px" }}>
          {roomList.length <= 0 && (
            <Flex direction="row" align="center" justify="space-between">
              <Flex direction="column" flex={1}>
                <Text fontSize={32} fontWeight="bold">
                  Let's start to manage your Room.
                </Text>

                <Text fontSize={24}>Create your first room now!.</Text>
              </Flex>
              <Flex direction="column" flex={1} align="center">
                <Button
                  colorScheme="blue"
                  size="lg"
                  w="200px"
                  onClick={() => setOpenAddModal(true)}
                >
                  Create Room
                </Button>
              </Flex>
            </Flex>
          )}

          {roomList.length > 0 && (
            <>
              <Flex direction="row" justify="space-between" align="center">
                <Heading as="h4" size="md">
                  All Room
                </Heading>
                <Button
                  colorScheme="blue"
                  size="md"
                  w="200px"
                  onClick={() => setOpenAddModal(true)}
                >
                  New Room
                </Button>
              </Flex>
              <Box
                overflow="auto"
                border="1px"
                borderColor={borderColor}
                mt="5"
                borderRadius="20px"
                p="1.5rem"
                bg={cardColor}
                boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
              >
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>No</Th>
                      <Th>Name</Th>
                      <Th>Status</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {roomList.length > 0 &&
                      roomList.map((room: RoomType, index: number) => {
                        return (
                          <Tr key={room.id}>
                            <Td>{index + 1}</Td>
                            <Td>{room.name}</Td>
                            <Td>
                              {room.status ? (
                                <Badge
                                  borderRadius="50px"
                                  px="3"
                                  py="1"
                                  colorScheme="green"
                                >
                                  Active
                                </Badge>
                              ) : (
                                <Badge
                                  borderRadius="50px"
                                  px="3"
                                  py="1"
                                  colorScheme="red"
                                >
                                  Inactive
                                </Badge>
                              )}
                            </Td>
                            <Td>
                              <Button
                                fontSize="16px"
                                type="submit"
                                bg="primary"
                                h="45"
                                color="white"
                                _hover={{
                                  bg: "blue.200",
                                }}
                                _active={{
                                  bg: "blue.400",
                                }}
                                onClick={() => onOpenEditModal(room)}
                              >
                                <Icon
                                  as={FiEdit2}
                                  color="white"
                                  fontSize="20px"
                                />
                              </Button>
                            </Td>
                          </Tr>
                        );
                      })}
                  </Tbody>
                </Table>
              </Box>
            </>
          )}
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={openAddModal}
            onClose={onCloseAddModal}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create Room</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl>
                    <FormLabel>Room name</FormLabel>
                    <Input
                      placeholder="Room name"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <FormHelperText mt="0" color="red.500">
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Room Detail</FormLabel>
                    <Input
                      placeholder="Room Detail"
                      {...register("detail", { required: true })}
                    />
                    {errors.detail && (
                      <FormHelperText mt="0" color="red.500">
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    mt={5}
                    display="flex"
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <FormLabel>Active?</FormLabel>
                    <Switch size="md" {...register("status")} />
                  </FormControl>
                  <Flex justify="flex-end" mt={10}>
                    <Button onClick={onCloseAddModal}>Cancel</Button>
                    <Button ml={5} type="submit" colorScheme="blue" mr={3}>
                      Save
                    </Button>
                  </Flex>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={openEditModal}
            onClose={onCloseEditModal}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Room</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <form onSubmit={handleSubmit(onEdit)}>
                  <FormControl>
                    <FormLabel>Room name</FormLabel>
                    <Input
                      placeholder="Room name"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <FormHelperText mt="0" color="red.500">
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Room Detail</FormLabel>
                    <Input
                      placeholder="Room Detail"
                      {...register("detail", { required: true })}
                    />
                    {errors.detail && (
                      <FormHelperText mt="0" color="red.500">
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    mt={5}
                    display="flex"
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <FormLabel>Active?</FormLabel>
                    <Switch size="md" {...register("status")} />
                  </FormControl>
                  <Flex justify="flex-end" mt={10}>
                    <Button onClick={onCloseEditModal}>Cancel</Button>
                    <Button ml={5} type="submit" colorScheme="blue" mr={3}>
                      Save
                    </Button>
                  </Flex>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
      )}
    </>
  );
};

export default RoomPage;
