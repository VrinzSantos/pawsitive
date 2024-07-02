import { useState } from "react";
import {
  Container,
  Select,
  Button,
  Rating,
  Text,
  Textarea,
  Card,
  SimpleGrid,
  Avatar,
} from "@mantine/core";
import classes from "../Feedback/FeedbackCards.module.css";
import { useAppSelector } from "@/services/states/redux/hooks";
import axios from "axios";
const mockdata = [
  {
    title: "Bae Jinsol",
    description:
      "I am so grateful for the caring team at Your Vets. They always take the time to answer my questions and make my pet feel comfortable during every visit. Thank you for your excellent service!",
    avatarSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW_aH8rDEKcKXVjeCQIq2zNaC_YN9kzJ68nxHLhI-b1g&s",
    rating: 5,
  },
  {
    title: "Jang Kyujin",
    description:
      "The staff at Your Vets Animal Clinic are amazing! They treated my pet with such kindness and expertise. I appreciate the personalized attention they provide. Highly recommended!",
    avatarSrc:
      "https://i.pinimg.com/736x/5b/e8/bd/5be8bd7b44a81aa92b204c831b1bdf1d.jpg",
    rating: 5,
  },
  {
    title: "Sullyoon",
    description:
      "It has been bringing my pet to Your Vets for years, and the quality of care is excellent. The veterinarians are competent, and the entire staff is courteous and professional. Thank you for taking such fantastic care of my pet!",
    avatarSrc: "https://pbs.twimg.com/media/FNpLXOjX0AI0_fv.jpg",
    rating: 5,
  },
];

const Feedback = () => {
  const { token } = useAppSelector((state) => state.client);
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<string | null>("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      if (!category || !message) {
        alert("Please fill in all fields");
        return;
      }
      setIsLoading(true);
      const result = await axios.post(
        "http://localhost:5000/api/feedbacks/create",
        {
          category,
          feedback: message,
          ratings: rating,
        }
      );
      if (result.data.success) {
        alert(result.data.message);
        setMessage("");
        setRating(0);
        setCategory(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderStars = (_rating: number) => {
    const stars = [];
    {
      stars.push(
        <Rating
          style={{ color: "gold", width: "24px", height: "24px" }}
          defaultValue={5}
        />
      );
    }
    return stars;
  };

  const feedback = mockdata.map((data, index) => (
    <>
      <Card
        key={index}
        shadow="md"
        radius="lg"
        className={classes.card}
        padding="xl"
      >
        <Avatar
          component="a"
          target="_blank"
          src={data.avatarSrc}
          size={50}
          alt="User Avatar"
        />
        <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
          {data.title}
        </Text>

        <Text fz="sm" mt="sm">
          {data.description}
        </Text>
        <Text style={{ marginTop: 10 }}>{renderStars(5)}</Text>
      </Card>
    </>
  ));

  return (
    <div style={{ background: "#F8F9FA", padding: "40px 0" }}>
      <Text
        ta="center"
        style={{
          marginBottom: "5px",
          color: "#512b81",
          fontWeight: "bold",
          fontSize: "40px",
        }}
      >
        What our Client Say
      </Text>

      <Text ta="center" mr={200} ml={200} c="dimmed" mx="auto" fz="lg">
        What our clients say matters to us because it shapes the heart of Your
        Vets Animal Clinic. We value the voices of those who entrust us with the
        care of their beloved pets, and their feedback guides our commitment to
        excellence. Every testimonial is a testament to the trust placed in our
        team, emphasizing the importance of open communication and collaboration
        in your pet's healthcare journey.
      </Text>

      {/* Feedback */}
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm" mt={10} mb={10}>
        {feedback}
      </SimpleGrid>
      <Container size="sm">
        <Text
          ta="center"
          size="xl"
          style={{
            marginBottom: "10px",
            color: "#512b81",
            fontWeight: "bold",
            fontSize: "34px",
          }}
        >
          Send Us Feedback
        </Text>

        <Text ta="center" mt="10" mb="md" c="dimmed" mx="auto" fz="20">
          Your feedback shapes our care! Share thoughts on check-ups, meds,
          vaccinations. Help us enhance your vet services!
        </Text>

        <div
          style={{
            maxWidth: 600,
            margin: "auto",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Select
            data={[
              "Vaccination",
              "Lab Test",
              "Check Up",
              "Sugery",
              "Deworming ",
            ]}
            label="Category:"
            value={category}
            placeholder="Select category"
            onChange={setCategory}
            required
            style={{ marginTop: "20px" }}
          />
          <Textarea
            label="Message:"
            value={message}
            onChange={(event) => setMessage(event.currentTarget.value)}
            placeholder="Enter your feedback"
            required
            style={{ marginTop: "20px" }}
          />

          <Rating
            mt="10"
            variant="out-line"
            size="md"
            value={rating}
            onChange={setRating}
          />

          <Button
            fullWidth
            onClick={handleSubmit}
            loading={isLoading}
            radius={50}
            disabled={token === null}
            style={{
              marginTop: "20px",
              background: token === null ? "gray" : "#512b81",
            }}
          >
            Send Feedback
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Feedback;
