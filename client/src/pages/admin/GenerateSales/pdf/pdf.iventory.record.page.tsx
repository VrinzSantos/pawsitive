import dayjs from "dayjs";
import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  Font,
  Image,
} from "@react-pdf/renderer";
import { InventoryProductTypes } from "../types";
import { styles } from "./styles";
import { useFetchGeneratedInventory } from "@/hooks/inventory_hooks";

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

const InventoryPdfPage = () => {
  const { data } = useFetchGeneratedInventory();
  const currentDate = dayjs().format("YYYY-MM-DD");
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document title={`INVENTORY REPORT ${currentDate}`}>
        <Page size={"A4"} style={styles.page} orientation="landscape">
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
            <Text style={styles.title}>Inventory Record</Text>
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
              <Text style={[styles.inventoryCell, styles.inventoryHeaderCell]}>
                Product Category
              </Text>
              <Text style={[styles.inventoryCell, styles.inventoryHeaderCell]}>
                Product name
              </Text>
              <Text style={[styles.inventoryCell, styles.inventoryHeaderCell]}>
                Description
              </Text>
              <Text style={[styles.inventoryCell, styles.inventoryHeaderCell]}>
                Price
              </Text>
              <Text style={[styles.inventoryCell, styles.inventoryHeaderCell]}>
                Quantity
              </Text>
              <Text style={[styles.inventoryCell, styles.inventoryHeaderCell]}>
                Total Stocks
              </Text>
              <Text style={[styles.inventoryCell, styles.inventoryHeaderCell]}>
                Stocks Out
              </Text>
            </View>
            {data && data.length > 0 && (
              <>
                {data.map((item: InventoryProductTypes, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.inventoryCell}>
                      {item.productCategory}
                    </Text>
                    <Text style={styles.inventoryCell}>{item.productName}</Text>
                    <Text style={styles.inventoryCell}>
                      {item.productDescription}
                    </Text>
                    <Text style={styles.inventoryCell}>
                      P {item.productPrice}
                    </Text>
                    <Text style={styles.inventoryCell}>
                      {item.productQuantity}
                    </Text>
                    <Text style={styles.inventoryCell}>{item.stocksLeft}</Text>
                    <Text style={styles.inventoryCell}>{item.stocksOut}</Text>
                  </View>
                ))}
              </>
            )}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default InventoryPdfPage;
