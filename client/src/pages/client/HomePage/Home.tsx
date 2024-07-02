import HeaderLayout from "@/layout/header";
import { Container, Title, Button, Text } from "@mantine/core";
import classes from "./HeroContentLeft.module.css";
import Feedback from "../Feedback/Feedback";
import AppointmentBooking from "../AppointmentBooking/AppointmentBooking";
import FooterLinks from "../Footer/FooterLinks";
import { Link } from "react-scroll";

const Home = () => {
  return (
    <HeaderLayout>
      <div className={classes.root}>
        <Container size="lg">
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                <Text fz="50" fw="bold" c={"white"}>
                  Your Vets Veterinary Clinic
                </Text>
              </Title>

              <Text
                className={classes.description}
                mt={10}
                style={{ color: "white" }}
              >
                Discover the Best Pet Services to Keep Your Furry Friend Happy
                and Healthy.
              </Text>

              <Link
                to="appointment-booking"
                spy={true}
                smooth={true}
                duration={1000}
              >
                <Button
                  size="lg"
                  bg={"#512b81"}
                  className={classes.control}
                  mt={20}
                  radius={50}
                >
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
      <Feedback />
      <AppointmentBooking />
      <FooterLinks />
    </HeaderLayout>
  );
};
export default Home;
