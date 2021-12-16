import {
  useColorModeValue,
  Box,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import CommissionSetting from "./CommissionSetting";
import ExportTemplate from "./ExportTemplate";
import LazadaInvoiceSettings from "./LazadaInvoiceSettings";
import ShippingSetting from "./ShippingSetting";

const OrderSettingPage = () => {
  let cardColor = useColorModeValue("white", "gray.700");
  let borderColor = useColorModeValue("transparent", "gray.600");

  const exportTemplateTabs = [
    {
      id: 1,
      label: "Export Template",
    },
    {
      id: 2,
      label: "Shipping Settings",
    },
    {
      id: 3,
      label: "Lazada Invoice Settings",
    },
    {
      id: 4,
      label: "Commission Settings",
    },
  ];

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "100px" }}>
      <Heading as="h4" size="md" mt="10" mb="5">
        Orders Settings
      </Heading>

      <Box
        mt="5"
        borderRadius="20px"
        p="1.5rem"
        bg={cardColor}
        boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.02)"
        border="1px"
        borderColor={borderColor}
      >
        <Tabs colorScheme="twitter">
          <TabList>
            {exportTemplateTabs.map((tab, index) => {
              return <Tab key={index}>{tab.label}</Tab>;
            })}
          </TabList>

          <TabPanels>
            {/* TAB 1: EXPORT TEMPLATE */}
            <TabPanel>
              <ExportTemplate />
            </TabPanel>

            {/* TAB 2: SHIPPING SETTINGS */}
            <TabPanel>
              <ShippingSetting />
            </TabPanel>

            {/* TAB 3: LAZADA INVOICE SETTINGS */}
            <TabPanel>
              <LazadaInvoiceSettings />
            </TabPanel>

            {/* TAB 4: COMMISSION SETTING */}
            <TabPanel>
              <CommissionSetting />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default OrderSettingPage;
