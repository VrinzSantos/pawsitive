import { TextInput } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/services/states/redux/hooks";
import { setCustomername } from "@/services/states/redux/slices/orderSlice";
const Customername = () => {
  const { customerName } = useAppSelector((state) => state.order);

  const dispatch = useAppDispatch();
  return (
    <TextInput
      label="Customer name"
      placeholder="Enter customer name"
      value={customerName}
      onChange={(event) => dispatch(setCustomername(event.target.value))}
    />
  );
};

export default Customername;
