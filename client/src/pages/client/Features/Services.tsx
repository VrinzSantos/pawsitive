import {
    Badge,
    Group,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
    rem,
    useMantineTheme,
  } from '@mantine/core';
  import { IconVaccine, 
           IconFirstAidKit, 
           IconCheckupList, 
           IconScissors, 
           IconBuildingHospital, 
           IconTestPipe,
           } from '@tabler/icons-react';
  import classes from './FeaturesCards.module.css';
import HeaderLayout from '@/layout/header';
import FooterLinks from '../Footer/FooterLinks';
  
  const mockdata = [
    {
      title: 'Vaccination',
      description:
        'Vaccination involves the administration of vaccines to animals to stimulate their immune systems and provide protection against specific infectious diseases. Vaccinations are crucial for preventing the spread of diseases and maintaining the overall health of the animal population.',
      icon: IconVaccine,
    },
    {
      title: 'Medication',
      description:
        'Medication refers to the administration of drugs or Veterinarians substances to treat, alleviate, or prevent diseases, symptoms, or conditions in animals. Veterinarians may prescribe medications such as antibiotics, pain relievers, or anti-inflammatory drugs.',
      icon: IconFirstAidKit,
    },
    {
      title: 'Check Up',
      description:
        'A check-up, also known as routine examination, is a thorough physical examination of an animal conducted by a veterinarian. It is performed to assess the overall health of the animal, detect any potential issues early on, and discuss preventive care measures with the pet owner.',
      icon: IconCheckupList,
    },

    {
        title: 'Surgery',
        description:
          'Surgery in the veterinary context involves the use of operative procedures to treat or correct various medical conditions in animals. Veterinary surgeries can range from routine procedures such as spaying or neutering to more complex surgeries, including tumor removal, orthopedic procedures, and dental surgeries.',
        icon: IconScissors,
      },
      {
        title: 'Out-Patient',
        description:
          'Outpatient veterinary services cover routine check-ups, vaccinations, and minor treatments for pets, allowing them to return home on the same day. This approach is efficient for preventive care and addressing non-emergency health concerns, ensuring timely attention while prioritizing the well-being and comfort of the animals.',
        icon: IconBuildingHospital,
      },
      {
        title: 'Lab Test',
        description:
        'Lab tests involve the analysis of samples, such as blood, urine, or tissue, in a laboratory setting. In veterinary medicine, lab tests are conducted to diagnose diseases, assess organ function, and monitor overall health. Common veterinary lab tests include blood tests, urinalysis, and imaging studies.',
        icon: IconTestPipe,
      },
  ];
  
  const Feature = () =>{
    const theme = useMantineTheme();
    const features = mockdata.map((feature) => (
      
      <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl" >
        <feature.icon
          style={{ width: rem(50), height: rem(50) }}
          stroke={2}
          color={theme.colors.blue[6]}
        />
        <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
          {feature.title}
        </Text>
        <Text fz="sm" c="dimmed" mt="sm">
          {feature.description}
        </Text>
      </Card>
    ));
  
    return (
      <HeaderLayout>
      <div style={{backgroundColor: '#D5E4F4'}}>
      <Container size="xl" py="xl" >
        <Group justify="center">
          <Badge variant="filled" size="xl">
            Best Veterinary Clinic Ever
          </Badge>
        </Group>
  
        <Title order={1} className={classes.title} ta="center" mt="sm" style={{color: '#512b81'}}>
          Your Vet's Veterinary Clinic
        </Title>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
          {features}
        </SimpleGrid>
      </Container>
      </div>
      <FooterLinks/>
      </HeaderLayout>
    );
  }

  export default Feature;