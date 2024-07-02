import HeaderLayout from "@/layout/header";
import { Card, 
         Container, 
         Group, 
         SimpleGrid, 
         Title, 
         Text, 
         Avatar } from "@mantine/core";
import classes from "./DoctorsCards.module.css";
import { IconVaccine, IconFirstAidKit } from "@tabler/icons-react";
import FooterLinks from "../Footer/FooterLinks";
import React from "react";

  

const mockdata = [
  {
    title: 'Dr. Genevie Maalat',
    description:
      'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
      avatarSrc: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png',
    icon: IconVaccine,
  },
  {
    title: 'Dr. Crescia Paduano',
    description:
      'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
      avatarSrc: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png',
    icon: IconFirstAidKit,
  },
];


const Doctors = () => {
    const doctor = mockdata.map((doctor) => (
      
      <Card key={doctor.title} shadow="md"  className={classes.card} padding="xl" >
          <Avatar
            component="a"
            target="_blank"
            src={doctor.avatarSrc}
            size="100px"
            alt="User Avatar"
          />
        <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
          {doctor.title}
        </Text>
        <Text fz="sm" c="dimmed" mt="sm">
          {doctor.description}
        </Text>
      </Card>
    ));
  
    return (
      <HeaderLayout>
      <div style={{backgroundColor: '#D5E4F4'}}>
      <Container size="lg" py="xl" >
        <Group justify="center">
        </Group>
  
        <Title order={1} className={classes.title} ta="center" mt="sm" style={{color: '#512b81'}}>
          The Best Veterinarian's
        </Title>
  
        <Text className={classes.description} ta="center" mt="md" mx="auto">
        Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when
        hunger drives it to try biting a Steel-type Pokémon.
        </Text>

        <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="xl" mt={40}>
          {doctor}
        </SimpleGrid>
      </Container>
      </div>
      <FooterLinks/>
    </HeaderLayout>
  )
}

export default Doctors;
