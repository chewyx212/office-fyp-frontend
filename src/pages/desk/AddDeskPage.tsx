import { Flex, Stack, Img, Box, useColorModeValue } from "@chakra-ui/react";
import { useAppDispatch } from "app/hooks";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import L, { LatLngBoundsLiteral } from "leaflet";
import { MapContainer, ImageOverlay, useMapEvents, useMap } from "react-leaflet";

const AddDeskPage = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bounds, setBounds] = useState<LatLngBoundsLiteral>([
    [0, 0],
    [1000, 1000],
  ]);

  // useEffect(() => {
  //   getCompanyDetail();
  //   var map = L.map("map", {
  //     crs: L.CRS.Simple,
  //   });
  //   L.imageOverlay(
  //     "https://www.roomsketcher.com/wp-content/uploads/2017/11/RoomSketcher-Office-Floor-Plan-PID3529710-2D-bw-with-Labels.jpg",
  //     bounds
  //   ).addTo(map);
  //   map.fitBounds(bounds);
  // }, []);
  useEffect(() => {
    console.log(bounds);
    console.log(isLoading);
    setIsLoading(true);
    const { width, height } = getMeta(
      "https://www.roomsketcher.com/wp-content/uploads/2017/11/RoomSketcher-Office-Floor-Plan-PID3529710-2D-bw-with-Labels.jpg"
    );
    setBounds([
      [0, 0],
      [width, height],
    ]);
    setIsLoading(false);
  }, []);

  const getMeta = (url: string) => {
    let img = new Image();
    img.src = url;
    console.log(img.height);
    console.log({
      width: img.width,
      height: img.height,
    });
    return {
      width: img.width,
      height: img.height,
    };
  };

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        // setState your coords here
        // coords exist in "e.latlng.lat" and "e.latlng.lng"
        console.log(e.latlng.lat);
        console.log(e.latlng.lng);
      },
    });
    return null;
  };

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "100px" }}>
      {!isLoading && (
        <Flex w="100%" h="100%">
          <MapContainer
            zoom={0}
            center={[250, 250]}
            scrollWheelZoom={true}
            fitBounds={[
              [0, 0],
              [100, 100],
            ]}
            style={{ width: "100vw", height: "40vw" }}
            crs={L.CRS.Simple}
          >
            <ImageOverlay
              url={
                "https://www.roomsketcher.com/wp-content/uploads/2017/11/RoomSketcher-Office-Floor-Plan-PID3529710-2D-bw-with-Labels.jpg"
              }
              bounds={bounds}
            />
            <MapEvents />
          </MapContainer>
        </Flex>
      )}
    </Flex>
  );
};


export default AddDeskPage;
