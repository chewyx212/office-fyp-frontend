import { Flex } from "@chakra-ui/react";
import MarketIntegration from "components/onboarding/MarketIntegration";
import React, { useState } from "react";

const AddStorePage = () => {
  const EmptyFunction = () => {};
  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "100px" }}>
      Repairing
      <MarketIntegration
        type="add"
        nextStep={EmptyFunction}
        prevStep={EmptyFunction}
      />
    </Flex>
  );
};

export default AddStorePage;
