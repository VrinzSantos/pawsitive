import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  currentDate: {
    fontSize: 12,
    marginBottom: 10,
    fontFamily: "Roboto",
  },
  table: {
    display: "flex",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  cell: {
    flex: 1,
    padding: 5,
    fontSize: 8.5,
    fontFamily: "Roboto",
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "#000",
  },
  headerCell: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "150px",
    height: "80px",
  },

  inventoryHeaderCell: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 8,
    backgroundColor: "#f0f0f0",
  },

  inventoryCell: {
    flex: 1,
    padding: 8,
    fontSize: 10,
    fontFamily: "Roboto",
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "#000",
  },
});
