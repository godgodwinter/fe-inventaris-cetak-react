import {
  Page,
  Text,
  View,
  Document,
  Svg,
  Rect,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import Fungsi from "../../../helpers/FungsiCampur";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);

export const PdfGenerator = (props) => {
  const dataCetak = props.dataCetak;
  const ttd = props.ttd;
  const fontSize = props.fontSize;
  const preview = props.preview;
  return (
    <>
      <div className="p-4">
        <div className="p-4">
          {" "}
          {/* <button className="btn btn-sm btn-success"> */}
          <PDFDownloadLink
            document={
              <Fn_generate_pdf
                dataCetak={dataCetak}
                ttd={ttd}
                fontSize={fontSize}
              />
            }
            fileName={`cetak_nota_barang_masuk.pdf`}
            className="btn btn-sm btn-success"
          >
            {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
          </PDFDownloadLink>
          {/* </button> */}
        </div>
        <div>
          {/* !jika ingin menampikan view pdf, jika data banyak sebaiknya didisable kaarena akan no responding karena terlalu lama loadnya */}
          {preview ? (
            <PDFViewer style={{ width: "1300px", height: "800px" }}>
              <Fn_generate_pdf
                dataCetak={dataCetak}
                ttd={ttd}
                fontSize={fontSize}
              />
            </PDFViewer>
          ) : (
            ""
          )}
        </div>
        Data :
      </div>
    </>
  );
};

const Fn_generate_pdf = (dataCetak) => {
  // console.log("====================================");
  // console.log(dataCetak.dataCetak[0].detail);
  // console.log("====================================");
  if (dataCetak != null || dataCetak.length > 0) {
    return (
      <Document>
        {dataCetak.dataCetak
          //   .slice(dataCetak.startValue, dataCetak.endValue)
          .map((row, index) => (
            <Page
              key={index}
              size="A4"
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                paddingHorizontal: 20,
              }}
            >
              {/* <Text
                style={PageNumberstyles.pageNumbers}
                render={({ pageNumber, totalPages }) => {
                  return ""; // Jika nomor halaman adalah 1, 4, 7, 10, dst., nama akan kosong
                }}
                fixed
              /> */}
              <View
                style={{
                  //   ...tableIstStyle.tableRow,
                  marginTop: 3,
                  marginBottom: 3,
                  marginHorizontal: 2,
                }}
              >
                <View>
                  <Text
                    style={{
                      //   ...tableIstStyle.tableCell,
                      width: "98%",
                      textAlign: "center",
                      fontFamily: "Helvetica-Bold",
                      fontSize: dataCetak.fontSize,
                    }}
                  >
                    NAMA TOKO
                  </Text>
                </View>{" "}
                <View>
                  <Text
                    style={{
                      //   ...tableIstStyle.tableCell,
                      width: "98%",
                      textAlign: "center",
                      fontFamily: "Helvetica-Bold",
                      fontSize: dataCetak.fontSize,
                    }}
                  >
                    Jl ABCD No 9 Desa Nama Desa - Kecamatan - No Telp :
                    08512345678
                  </Text>
                </View>{" "}
              </View>
              <View
                style={{
                  display: "table",
                  width: "auto",
                  borderStyle: "solid",
                  borderWidth: 0,
                  marginTop: 0,
                  marginBottom: 0,
                  marginHorizontal: 0,
                  alignItems: "left",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    borderBottomWidth: 0,
                  }}
                >
                  <View
                    style={{
                      borderStyle: "solid",
                      borderWidth: 0,
                      paddingVertical: 2,
                      textAlign: "left",
                      width: "15%",
                      alignItems: "left",
                    }}
                  >
                    <Text
                      style={{
                        padding: 0,
                        fontSize: dataCetak.fontSize,
                        fontFamily: "Helvetica-Bold",
                      }}
                    >
                      KODE TRANSAKSI
                    </Text>
                  </View>
                  <View
                    style={{
                      borderStyle: "solid",
                      borderWidth: 0,
                      // borderLeftWidth: 0,
                      // borderTopWidth: 0,
                      paddingVertical: 2,
                      // borderRightWidth: 1,
                      textAlign: "left",
                      width: "20%",
                      alignItems: "left",
                    }}
                  >
                    <Text
                      style={{
                        padding: 0,
                        fontSize: dataCetak.fontSize,
                        fontFamily: "Helvetica-Bold",
                      }}
                    >
                      : {row.id}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    borderBottomWidth: 0,
                  }}
                >
                  <View
                    style={{
                      borderStyle: "solid",
                      borderWidth: 0,
                      paddingVertical: 2,
                      textAlign: "left",
                      width: "15%",
                      alignItems: "left",
                    }}
                  >
                    <Text
                      style={{
                        padding: 0,
                        fontSize: dataCetak.fontSize,
                        fontFamily: "Helvetica-Bold",
                      }}
                    >
                      TANGGAL
                    </Text>
                  </View>
                  <View
                    style={{
                      borderStyle: "solid",
                      borderWidth: 0,
                      // borderLeftWidth: 0,
                      // borderTopWidth: 0,
                      paddingVertical: 2,
                      // borderRightWidth: 1,
                      textAlign: "left",
                      width: "20%",
                      alignItems: "left",
                    }}
                  >
                    <Text
                      style={{
                        padding: 0,
                        fontSize: dataCetak.fontSize,
                        fontFamily: "Helvetica-Bold",
                      }}
                    >
                      : {moment(row.tgl).format("DD MMMM YYYY HH:mm:ss")}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  display: "table",
                  width: "auto",
                  borderStyle: "solid",
                  borderWidth: 1,
                  // borderRightWidth: 0,
                  // borderBottomWidth: 0,
                  marginTop: 2,
                  marginBottom: 4,
                  marginHorizontal: 0,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    borderBottomWidth: 1,
                  }}
                >
                  <View
                    style={{
                      borderStyle: "solid",
                      borderWidth: 0,
                      borderLeftWidth: 0,
                      borderTopWidth: 0,
                      paddingVertical: 2,
                      borderRightWidth: 1,
                      textAlign: "left",
                      width: "3%",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 0,
                        fontSize: dataCetak.fontSize,
                      }}
                    >
                      NO
                    </Text>
                  </View>
                  <View
                    style={{
                      borderStyle: "solid",
                      borderWidth: 0,
                      borderLeftWidth: 0,
                      borderTopWidth: 0,
                      paddingVertical: 2,
                      borderRightWidth: 1,
                      textAlign: "left",
                      width: "10%",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 0,
                        fontSize: dataCetak.fontSize,
                      }}
                    >
                      KODE BARANG
                    </Text>
                  </View>
                  <View
                    style={{
                      borderStyle: "solid",
                      borderWidth: 0,
                      borderLeftWidth: 0,
                      borderTopWidth: 0,
                      paddingVertical: 2,
                      borderRightWidth: 1,
                      textAlign: "left",
                      width: "30%",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 0,
                        fontSize: dataCetak.fontSize,
                      }}
                    >
                      NAMA BARANG
                    </Text>
                  </View>
                  <View
                    style={{
                      borderStyle: "solid",
                      borderWidth: 0,
                      borderLeftWidth: 0,
                      borderTopWidth: 0,
                      paddingVertical: 2,
                      borderRightWidth: 1,
                      textAlign: "left",
                      width: "20%",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 0,
                        fontSize: dataCetak.fontSize,
                      }}
                    >
                      HARGA
                    </Text>
                  </View>
                  <View
                    style={{
                      borderStyle: "solid",
                      borderWidth: 0,
                      borderLeftWidth: 0,
                      borderTopWidth: 0,

                      paddingVertical: 2,
                      borderRightWidth: 1,
                      textAlign: "left",
                      width: "10%",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 0,
                        fontSize: dataCetak.fontSize,
                      }}
                    >
                      JUMLAH BELI
                    </Text>
                  </View>
                  <View
                    style={{
                      borderStyle: "solid",
                      borderWidth: 0,
                      borderLeftWidth: 0,
                      borderTopWidth: 0,

                      paddingVertical: 2,
                      borderRightWidth: 0,
                      textAlign: "left",
                      width: "20%",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 0,
                        fontSize: dataCetak.fontSize,
                      }}
                    >
                      TOTAL
                    </Text>
                  </View>
                </View>
                {/* !data row */}
                {row.detail.map((row_list, index_list) => (
                  <View
                    key={index_list}
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      // borderBottomWidth: 1,
                    }}
                  >
                    <View
                      style={{
                        borderStyle: "solid",
                        borderWidth: 0,
                        borderLeftWidth: 0,
                        borderTopWidth: 0,
                        paddingBottom: 2,
                        borderRightWidth: 1,
                        textAlign: "left",
                        width: "3%",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          padding: 0,
                          fontSize: dataCetak.fontSize,
                        }}
                      >
                        {index_list + 1}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderStyle: "solid",
                        borderWidth: 0,
                        borderLeftWidth: 0,
                        borderTopWidth: 0,
                        paddingBottom: 2,
                        borderRightWidth: 1,
                        textAlign: "left",
                        width: "10%",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          padding: 0,
                          fontSize: dataCetak.fontSize,
                        }}
                      >
                        {row_list.barang_id}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderStyle: "solid",
                        borderWidth: 0,
                        borderLeftWidth: 0,
                        borderTopWidth: 0,
                        paddingBottom: 2,
                        borderRightWidth: 1,
                        textAlign: "left",
                        width: "30%",
                        alignItems: "left",
                        paddingHorizontal: 4,
                      }}
                    >
                      <Text
                        style={{
                          padding: 0,
                          fontSize: dataCetak.fontSize,
                        }}
                      >
                        {row_list?.barang?.nama}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderStyle: "solid",
                        borderWidth: 0,
                        borderLeftWidth: 0,
                        borderTopWidth: 0,
                        paddingBottom: 2,
                        borderRightWidth: 1,
                        textAlign: "left",
                        width: "20%",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          padding: 0,
                          fontSize: dataCetak.fontSize,
                        }}
                      >
                        {Fungsi.formatRupiah(row_list.harga_masuk)}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderStyle: "solid",
                        borderWidth: 0,
                        borderLeftWidth: 0,
                        borderTopWidth: 0,
                        paddingBottom: 2,
                        borderRightWidth: 1,
                        textAlign: "left",
                        width: "10%",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          padding: 0,
                          fontSize: dataCetak.fontSize,
                        }}
                      >
                        {row_list.jml}
                      </Text>
                    </View>
                    <View
                      style={{
                        borderStyle: "solid",
                        borderWidth: 0,
                        borderLeftWidth: 0,
                        borderTopWidth: 0,
                        paddingBottom: 2,
                        borderRightWidth: 0,
                        textAlign: "left",
                        width: "20%",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          padding: 0,
                          fontSize: dataCetak.fontSize,
                        }}
                      >
                        {Fungsi.formatRupiah(
                          row_list.jml * row_list.harga_masuk
                        )}
                      </Text>
                    </View>
                  </View>
                ))}
                {/* !data row-end */}
              </View>

              <View
                style={{
                  width: "100%",
                  marginBottom: 10,
                }}
              >
                {dataCetak.ttd != "false" && (
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        width: "70%",
                        border: "0px solid black",
                        padding: 5,
                      }}
                    ></View>
                    <View
                      style={{
                        border: "none",
                        padding: 5,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: dataCetak.fontSize,
                          marginTop: 2,
                        }}
                      >
                        Mengetahui {"\n"}
                        Pimpinan Nama Toko {"\n"}
                        {"\n"}
                        {"\n"}
                        {"\n"}
                        {"\n"}
                        {"\n"}
                        Drs. ABCD MAKMUR SEJAHTERA
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </Page>
          ))}
      </Document>
    );
  }
  return <>Data tidak ditemukan</>;
};
