import {
  Flex,
  Stack,
  Img,
  Box,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAppDispatch } from "app/hooks";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import L, { LatLngBoundsLiteral } from "leaflet";

const AddDeskPage = () => {
  let cardColor = useColorModeValue("white", "gray.700");
  let borderColor = useColorModeValue("transparent", "gray.600");
  const history = useHistory();
  const dispatch = useAppDispatch();

  const image = "assets/floorplan.jpg";
  useEffect(() => {
    getCompanyDetail();
    var map = L.map("map", {
      crs: L.CRS.Simple,
    });
    var bounds: LatLngBoundsLiteral = [
      [0, 0],
      [500, 500],
    ];
    L.imageOverlay(
      "https://www.roomsketcher.com/wp-content/uploads/2017/11/RoomSketcher-Office-Floor-Plan-PID3529710-2D-bw-with-Labels.jpg",
      bounds
    ).addTo(map);
    map.fitBounds(bounds);
  }, []);

  const getCompanyDetail = async () => {};

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "100px" }}>
      <Box id="map" h="100vh"></Box>
    </Flex>
  );
};

export default AddDeskPage;
