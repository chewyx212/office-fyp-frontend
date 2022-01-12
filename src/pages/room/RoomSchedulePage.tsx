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
  Select,
} from "@chakra-ui/react";
import { RoomApi } from "api/RoomApi";
import { logout } from "app/auth/authSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { RoomScheduleType, RoomType } from "types/RoomType";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface form {
  roomId: string;
  duration: number;
}

const ScheduleRoomPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [roomScheduleList, setRoomScheduleList] = useState<RoomScheduleType[]>(
    []
  );
  const [roomList, setRoomList] = useState<RoomType[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  let cardColor = useColorModeValue("white", "gray.700");
  let borderColor = useColorModeValue("transparent", "gray.600");
  const history = useHistory();
  const dispatch = useAppDispatch();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();
  const savedBranchs = useAppSelector((state) => state.company.selectedBranch);
  useEffect(() => {
    getAllRoomSchedule();
    getAllRoom();
  }, []);

  const getAllRoomSchedule = async () => {
    setIsLoading(true);
    if (savedBranchs) {
      const result = await RoomApi.getAllRoomSchedule(savedBranchs);
      console.log(result);
      console.log("im iensaside");
      if (result.status === 200 && result.data) {
        if (result.data.length > 0) {
          setRoomScheduleList(
            result.data.map((schedule: any) => ({
              ...schedule,
              datetime: new Date(result.data[0].datetime).toLocaleString(),
            }))
          );
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

  const getAllRoom = async () => {
    setIsLoading(true);
    console.log("heeeaassasdasdasadaaasdasddqweqeasre");
    console.log(savedBranchs);
    if (savedBranchs) {
      const result = await RoomApi.getAllRoom(savedBranchs);
      console.log(result.data);
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
  const filterPassedTime = (time: any) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };
  const handleOnCalenderChange = (date: any) => {
    console.log(date);
    setStartDate(date);
  };

  const onCloseAddModal = () => {
    setOpenAddModal(false);
    setSelectedRoom("");
  };

  const onOpenEditModal = (room: RoomScheduleType) => {
    setOpenEditModal(true);
    setSelectedRoom(room.id);
  };

  const onCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const onSelectRoom = (id: string) => {
    getBookedSchedule(id);
  };

  const getBookedSchedule = async (id: string) => {
    const result = await RoomApi.getOneRoomSchedule(id);
    console.log(result);
    setSelectedRoom(id);
    setStartDate(new Date());
    setDuration(0);
    if (result.status === 200 && result.data.length > 0) {
      // setScheduledTime(result.data);
    }
  };

  const onSubmit = async () => {
    const payload = {
      roomId: selectedRoom,
      branchId: savedBranchs,
      datetime: startDate.toLocaleString(),
      duration: duration,
    };
    console.log(payload);
    const result = await RoomApi.scheduleRoom(payload);
    console.log(result);
    // if (result.status === 201) {
    //   toast({
    //     title: "Created Successfull!",
    //     status: "success",
    //     duration: 5000,
    //     isClosable: true,
    //   });
    //   getAllRoom();
    // } else {
    //   toast({
    //     title: "Something wrong...",
    //     status: "error",
    //     duration: 9000,
    //     isClosable: true,
    //   });
    // }
    // onCloseAddModal();
  };
  // const onEdit = async (payload: CreateRoomForm) => {
  //   const result = await RoomApi.editRoom(selectedRoom, payload);
  //   console.log(result);
  //   if (result.status === 200) {
  //     toast({
  //       title: "Edit Successfull!",
  //       status: "success",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //     getAllRoom();
  //   } else {
  //     toast({
  //       title: "Something wrong...",
  //       status: "error",
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //   }
  //   onCloseEditModal();
  // };

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
          <Flex direction="row" justify="space-between" align="center">
            <Heading as="h4" size="md">
              All Room Schedule
            </Heading>
            <Button
              colorScheme="blue"
              size="md"
              w="200px"
              onClick={() => setOpenAddModal(true)}
            >
              Schedule a room
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
            {roomScheduleList.length <= 0 && (
              <Flex align="center" justify="center">
                <Text>No Schedule Found.</Text>
              </Flex>
            )}
            {roomScheduleList.length > 0 && (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>No</Th>
                    <Th>Room</Th>
                    <Th>User</Th>
                    <Th>Date Time</Th>
                    <Th>Duration</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {roomScheduleList.length > 0 &&
                    roomScheduleList.map(
                      (schedule: RoomScheduleType, index: number) => {
                        return (
                          <Tr key={schedule.id}>
                            <Td>{index + 1}</Td>
                            <Td>{schedule.room.name}</Td>
                            <Td>{schedule.user.name}</Td>
                            <Td>{schedule.datetime}</Td>
                            <Td>{schedule.duration}</Td>
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
                                onClick={() => onOpenEditModal(schedule)}
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
                      }
                    )}
                </Tbody>
              </Table>
            )}
          </Box>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={openAddModal}
            onClose={onCloseAddModal}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Schedule a Room</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <form>
                  <FormControl>
                    <FormLabel>Room name</FormLabel>
                    <Select
                      placeholder="Select Room"
                      onChange={(e) => onSelectRoom(e.target.value)}
                    >
                      {roomList.map((room) => {
                        return (
                          <option key={room.id} value={room.id}>
                            {room.name}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>
                  {selectedRoom && (
                    <>
                      <FormControl mt={4}>
                        <FormLabel>Date & Time</FormLabel>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => handleOnCalenderChange(date)}
                          showTimeSelect
                          filterTime={filterPassedTime}
                          dateFormat="yyyy-MM-dd hh:mm"
                        />
                      </FormControl>
                      <FormControl mt={5}>
                        <FormLabel>Duration (in hour)</FormLabel>
                        <Input
                          type="number"
                          placeholder="Duration"
                          value={duration}
                          onChange={(event) =>
                            setDuration(parseFloat(event.target.value))
                          }
                        />
                      </FormControl>
                    </>
                  )}
                  <Flex justify="flex-end" mt={10}>
                    <Button onClick={onCloseAddModal}>Cancel</Button>
                    <Button ml={5} onClick={onSubmit} colorScheme="blue" mr={3}>
                      Create
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

export default ScheduleRoomPage;
