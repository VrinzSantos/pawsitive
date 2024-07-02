import dayjs from "dayjs";
import { useFetchDailySales } from "@/hooks/generate.sales.hooks";
import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  Font,
  Image,
} from "@react-pdf/renderer";
import { dataItemTypes } from "../types";
import { formatMoney } from "../utils";
import { styles } from "./styles";

// Font registration
Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxP.ttf" },
    {
      src: "https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fBBc9.ttf",
      fontWeight: "bold",
    },
  ],
});

// Create styles

const SalesDataPDF = () => {
  const { data } = useFetchDailySales();

  // Get current date
  const currentDate = dayjs().format("YYYY-MM-DD");

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document title={`SALES REPORT ${currentDate}`}>
        <Page size={"A4"} style={styles.page}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                marginRight: "150px",
              }}
            />
            <Text style={styles.title}>Sales Report</Text>
            <Image
              style={styles.image}
              src="https://res.cloudinary.com/dwfznrat3/image/upload/v1715397963/Logo1_fepovs.png"
            />
          </View>
          <View>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", fontFamily: "Roboto" }}
            >
              Pawsitive
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                }}
              >
                2009 Gerardo Tuazon St, Sampaloc,{"\n"}Manila, 1008 Metro Manila
              </Text>
              <Text style={styles.currentDate}>
                Current Date: {currentDate}
              </Text>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.headerCell]}>Date</Text>
              <Text style={[styles.cell, styles.headerCell]}>
                Products/Services
              </Text>
              <Text style={[styles.cell, styles.headerCell]}>Total Amount</Text>
            </View>
            {data.map((sale: dataItemTypes, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.cell}>{sale.date}</Text>
                <Text style={styles.cell}>{sale.productName.join(", ")}</Text>
                <Text style={styles.cell}>
                  {"P"} {formatMoney(sale.totalAmount)}
                </Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default SalesDataPDF;
