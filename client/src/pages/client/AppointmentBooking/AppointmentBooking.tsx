import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Select,
  Textarea,
  ActionIcon,
  rem,
  Container,
  Paper,
  Button,
  Text,
  Anchor,
  Checkbox,
  Center,
} from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { IconCalendar, IconClock } from "@tabler/icons-react";
import { useAppSelector } from "@/services/states/redux/hooks";
import axios from "axios";
import { useFetchFullyBookedDates } from "@/hooks/appoinment_hooks";
const AppointmentBooking = () => {
  const { fullyBookedDates } = useFetchFullyBookedDates();
  console.log("🚀 ~ AppointmentBooking ~ data:", fullyBookedDates);
  // Ref for date and time pickers
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const { token } = useAppSelector((state) => state.client);
  const { id, email } = useAppSelector((state) => state.client);

  // states data
  const [service, setService] = useState<string | null>("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState(new Date().toISOString());
  const [checked, setChecked] = useState(false);

  // loading
  const [isLoading, setIsLoading] = useState(false);
  // Function to handle form submission

  const [disabledDates, setDisabledDates] = useState<Date[]>([]);

  useEffect(() => {
    if (fullyBookedDates) {
      if (fullyBookedDates.length > 0) {
        // Convert fullyBookedDates array to an array of dates without time
        const disabledDatesArray = fullyBookedDates.map(
          (dateString: string | number | Date) => new Date(dateString)
        );

        // Set disabled dates state
        setDisabledDates(disabledDatesArray);
      }
    }
  }, [fullyBookedDates]);

  // Callback function to determine whether the day should be disabled
  const excludeDate = (dateToCheck: Date) => {
    // Check if the dateToCheck is included in disabledDates array
    return disabledDates.some((disabledDate) =>
      isSameDay(disabledDate, dateToCheck)
    );
  };

  // Helper function to compare dates without time component
  const isSameDay = (dateA: Date, dateB: Date) => {
    return (
      dateA.getFullYear() === dateB.getFullYear() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getDate() === dateB.getDate()
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      if (
        service === "" ||
        description === "" ||
        date === null ||
        time === null
      ) {
        alert("Please fill in all fields");
        return;
      } else {
        const result = await axios.post(
          "http://localhost:5000/api/appointment/book-appointment",
          {
            userId: id,
            email: email,
            service,
            description,
            date,
            time,
          }
        );

        if (result.data.success) {
          alert(result.data.message);
        } else {
          alert(result.data.message);
        }
      }
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    } finally {
      setIsLoading(false);
    }

    // Process form submission here
  };

  // Controls for date and time pickers
  const dateControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => dateRef.current?.showPicker()}
    >
      <IconCalendar style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  const timeControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => timeRef.current?.showPicker()}
    >
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Access the new time value from the event.target.value
    const newTime = event.target.value;
    setTime(newTime);
  };

  return (
    <div
      id="appointment-booking"
      style={{
        backgroundColor: "#D5E4F4",
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "650px", width: "100%" }}>
        <Paper
          p="lg"
          shadow="sm"
          style={{
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: 20,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Container size="lg">
              <Text
                ta="center"
                style={{
                  marginBottom: "20px",
                  color: "#512b81",
                  fontWeight: "bold",
                  fontSize: "34px",
                }}
              >
                Make an Appointment
              </Text>
              {/* Servicetype */}
              <div style={{ marginBottom: "20px" }}>
                <label htmlFor="serviceType">Service Type</label>
                <Select
                  id="serviceType"
                  placeholder="Select Service Type"
                  data={[
                    "Vaccination",
                    "Lab Test",
                    "Check Up",
                    "Surgery",
                    "Deworming",
                  ]}
                  value={service}
                  onChange={setService}
                />
              </div>
              {/* Description */}
              <div style={{ marginBottom: "20px" }}>
                <label htmlFor="description">Description</label>
                <Textarea
                  id="description"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                {/* <DateInput
                  excludeDate={(date) =>
                    excludedDates.some(
                      (excludedDate) =>
                        date.toDateString() === excludedDate.toDateString()
                    )
                  }
                  label="Date input"
                  placeholder="Date input"
                /> */}
                <label htmlFor="selectedDate">Select Date</label>
                <DateInput
                  excludeDate={excludeDate}
                  minDate={new Date()}
                  id="selectedDate"
                  valueFormat="YYYY MMM DD"
                  placeholder="Select Date"
                  ref={dateRef}
                  value={date}
                  onChange={setDate}
                  rightSection={dateControl}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label htmlFor="selectedTime">Select Time</label>
                <TimeInput
                  id="selectedTime"
                  value={time}
                  onChange={handleTimeChange}
                  ref={timeRef}
                  rightSection={timeControl}
                />
              </div>
              {token ? (
                <>
                  <Checkbox
                    checked={checked}
                    onChange={(event) =>
                      setChecked(event.currentTarget.checked)
                    }
                    label={
                      <>
                        I accept{" "}
                        <Anchor target="_blank" inherit>
                          terms and conditions
                        </Anchor>
                      </>
                    }
                  />
                  <Button
                    fullWidth
                    disabled={!checked}
                    onClick={handleSubmit}
                    loading={isLoading}
                    style={{
                      marginTop: "20px",
                      background: checked ? "#512b81" : "gray",
                      color: "#fff",
                      padding: "10px 20px",
                    }}
                    radius={50}
                  >
                    Book Appointment
                  </Button>
                </>
              ) : (
                <Center>
                  <Text>Please login to book an appointment</Text>
                </Center>
              )}
            </Container>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default AppointmentBooking;
