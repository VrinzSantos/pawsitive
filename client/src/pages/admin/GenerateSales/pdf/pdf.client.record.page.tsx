/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { styles } from "./styles";
import { useFetchClientRecord } from "@/hooks/client_record_hooks";
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

const ClientRecordsPDFPage = () => {
  const { data } = useFetchClientRecord();
  const currentDate = dayjs().format("YYYY-MM-DD");
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document title={`CLIENT RECORD ${currentDate}`}>
        <Page size={"A4"} orientation="landscape" style={styles.page}>
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
            <Text style={styles.title}>Client Records</Text>
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
              <Text style={[styles.cell, styles.inventoryHeaderCell]}>
                Fullname
              </Text>
              <Text style={[styles.cell, styles.inventoryHeaderCell]}>
                Address
              </Text>
              <Text style={[styles.cell, styles.inventoryHeaderCell]}>
                Contact
              </Text>
              <Text style={[styles.cell, styles.inventoryHeaderCell]}>
                Pet name
              </Text>
              <Text style={[styles.cell, styles.inventoryHeaderCell]}>
                Species
              </Text>
              <Text style={[styles.cell, styles.inventoryHeaderCell]}>
                Breed
              </Text>
              <Text style={[styles.cell, styles.inventoryHeaderCell]}>
                Pet Sex
              </Text>
              <Text style={[styles.cell, styles.inventoryHeaderCell]}>
                Pet Birthday
              </Text>
              <Text style={[styles.cell, styles.inventoryHeaderCell]}>
                Pet History
              </Text>
              <Text style={[styles.cell, styles.inventoryHeaderCell]}>
                Medical History Date
              </Text>
              <Text style={[styles.cell, styles.inventoryHeaderCell]}>
                Pet's Medication
              </Text>
              <Text style={[styles.cell, styles.inventoryHeaderCell]}>
                Medication Date
              </Text>
            </View>
            {data && data.length > 0 && (
              <>
                {data!.map((record: any, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.cell}>{record.fullName}</Text>
                    <Text style={styles.cell}>{record.address}</Text>
                    <Text style={styles.cell}>{record.contact}</Text>
                    <Text style={styles.cell}>{record.nameOfPet}</Text>
                    <Text style={styles.cell}>{record.species}</Text>
                    <Text style={styles.cell}>{record.petsBreed}</Text>
                    <Text style={styles.cell}>{record.petsSex}</Text>
                    <Text style={styles.cell}>
                      {dayjs(record.petsBirthdate).format("YYYY-MM-DD")}
                    </Text>
                    <Text style={styles.cell}>
                      {record.petsHistory.join(", ")}
                    </Text>
                    <Text style={styles.cell}>
                      {record.historyDate
                        .map((date: string) => dayjs(date).format("YYYY-MM-DD"))
                        .join(", ")}
                    </Text>
                    <Text style={styles.cell}>
                      {record.petsMedication.join(", ")}
                    </Text>
                    <Text style={styles.cell}>
                      {record.medicationDate
                        .map((date: string) => dayjs(date).format("YYYY-MM-DD"))
                        .join(", ")}
                    </Text>
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

export default ClientRecordsPDFPage;
