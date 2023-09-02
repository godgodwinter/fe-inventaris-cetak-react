import { useParams } from "@tanstack/react-router";

export const CetakNotaBarangMasuk = () => {
  const { kode_trans } = useParams();
  return <div>Hello from Cetak Nota! ini kode trans : {kode_trans}</div>;
};
export default CetakNotaBarangMasuk;
