import { Container, Title, Text} from '@mantine/core';
import HeaderLayout from '@/layout/header';
import './About.css';
import FooterLinks from '../Footer/FooterLinks';
import React from 'react';

const About = () => {
  return (
    <HeaderLayout>
    <div className="root">
      <Container size="lg">
        <div className="inner">
          <div className="content">
            <Title size={50} className="title" style={{color: '#512b81'}}>
              About Us
            </Title>

            <Text className="description" mt={10} style={{color: 'black'}}>
            Your Vets Animal Clinic is committed to providing comprehensive healthcare services for pets, prioritizing preventive care and personalized attention. 
            Their mission is to ensure the well-being and happiness of pets through expert veterinary services and a caring atmosphere. 
            They aim to be a compassionate partner in promoting the optimal health and joy of every cherished animal.
            </Text>
          </div>

        </div>
        
      </Container>
    </div>
    <FooterLinks/>
    </HeaderLayout>
  );
}

export default About;
