import { useParams } from "@tanstack/react-router";
import CetakNotaBarangMasukComponent from "./CetakNotaBarangMasukComponent";

export const CetakNotaBarangMasuk = () => {
  const { kode_trans } = useParams();
  return (
    <>
      <CetakNotaBarangMasukComponent kode_trans={kode_trans} />
    </>
  );
};
export default CetakNotaBarangMasuk;
