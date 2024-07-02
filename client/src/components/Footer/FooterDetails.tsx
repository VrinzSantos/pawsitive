import { getCurrentYear } from "@/utils";
import { Text, Center } from "@mantine/core";
const FooterDetails = () => {
  const currentYear = getCurrentYear();
  return (
    <>
      <Center>
        <Text c="white">© Pawsitive. {currentYear} - All rights reserved</Text>
      </Center>
    </>
  );
};

export default FooterDetails;
