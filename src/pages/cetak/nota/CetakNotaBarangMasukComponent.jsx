import { useEffect, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { PdfGenerator } from "./PdfGenerator";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  ? import.meta.env.VITE_API_BASE_URL
  : "http://localhost:8001/";

const queryClient = new QueryClient();
const dataFetch = [];
const dataCetak = [];

const fn_fetcher = async (key) => {
  try {
    const response = await fetch(
      `${VITE_API_BASE_URL}api/gues/transaksi_masuk/${key}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fn_masukkanData = async (datas) => {
  // console.log("====================================");
  // console.log(datas);
  // console.log("====================================");
  dataCetak.length = 0; //kosongkan
  // // !siapkan data untuk di cetak
  // //kopi data
  // datas.forEach((item) => {
  //   if (item) {
  //     dataCetak.push(item); //isi data yang sudah dikosongkan
  //   }
  // });
  dataCetak.push(datas);
};

function CallQuery(props) {
  const kode_trans = props.kode_trans;
  const ttd = props.ttd;
  const fontSize = props.fontSize;
  const preview = props.preview;
  // console.log("ttd ", ttd);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    setIsDataLoaded(dataFetch.length > 0);
  }, []);

  const params = kode_trans;
  const kelas_id = params.kelas_id;
  const { isLoading, data, error } = useQuery({
    queryKey: ["post", kelas_id],
    queryFn: () => fn_fetcher(kode_trans),
    // cacheTime: enableCache.value ? 120000 : 0, // Menggunakan cacheTime sesuai status cache
  });
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (data && data.data) {
    // console.log(data.data);
    fn_masukkanData(data.data);
    console.log(dataCetak);
    //jalankan  Fn_generate_pdf()
    return (
      <>
        <PdfGenerator
          dataCetak={dataCetak}
          kelas_id={parseInt(kelas_id)}
          ttd={ttd}
          fontSize={fontSize}
          preview={preview}
        />
      </>
    );
  }
  return (
    <>
      <div>Data kosong</div>
    </>
  );
  // return <div>{data.data[0].siswa.nama}</div>;
}
const IndexPdf = (props) => {
  const kode_trans = props.kode_trans;
  const ttd = props.ttd;
  const fontSize = props.fontSize;
  const preview = props.preview;
  return (
    <>
      {/* <div>
        {ttd} {fontSize} {preview}
      </div> */}
      <div>
        <QueryClientProvider client={queryClient}>
          <CallQuery
            ttd={ttd}
            fontSize={fontSize}
            kode_trans={kode_trans}
            preview={preview}
          />
        </QueryClientProvider>
      </div>
    </>
  );
};

export const CetakNotaBarangMasukComponent = (props) => {
  // console.log(props.kode_trans);
  const kode_trans = props.kode_trans;
  const ttd = "true";
  const [isTtdChecked, setIsTtdChecked] = useState(ttd == "true");
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [fontSize, setFontSize] = useState(7);
  const [isPreviewChecked, setIsPreviewChecked] = useState(true);

  const handleTtdToggle = () => {
    setIsTtdChecked((prevValue) => !prevValue);
  };

  const handleUpdateClick = () => {
    setShouldUpdate(true);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(Number(event.target.value));
  };

  const handlePreviewToggle = () => {
    setIsPreviewChecked((prevValue) => !prevValue);
  };

  return (
    <>
      <div className="md:grid grid-cols-5">
        <div className="space-y-2 p-10 grid-cols-1">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Tanda tangan : </span>
              <span className="label-text-alt text-red-500">
                {" "}
                <code>{isTtdChecked.toString()}</code>
              </span>
            </label>
            <input
              type="checkbox"
              className="toggle"
              checked={isTtdChecked}
              onChange={handleTtdToggle}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Font Size: </span>
              <span className="label-text-alt text-red-500">
                {" "}
                <code>{`${fontSize}px`}</code>
              </span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={fontSize}
              min="6"
              max="12"
              step="1"
              onChange={handleFontSizeChange}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Preview: </span>
              <span className="label-text-alt text-red-500">
                {" "}
                <code>{isPreviewChecked.toString()}</code>
              </span>
            </label>
            <input
              type="checkbox"
              className="toggle"
              checked={isPreviewChecked}
              onChange={handlePreviewToggle}
            />
          </div>

          {/* <div>
          <button className="btn btn-primary" onClick={handleUpdateClick}>
            Update
          </button>
        </div> */}
        </div>
        <div className="w-full px-1">
          <IndexPdf
            kode_trans={kode_trans}
            ttd={isTtdChecked.toString()}
            fontSize={`${fontSize}px`}
            preview={isPreviewChecked.toString()}
            key={shouldUpdate.toString()}
          />
        </div>
      </div>
    </>
  );
};
export default CetakNotaBarangMasukComponent;
