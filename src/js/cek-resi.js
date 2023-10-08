import "../css/style.css";
const BASE_URL = "https://be-semarang-20-production.up.railway.app/api";

const receiptBox = document.querySelector("#receipt-box");
const checkBtn = document.querySelector("#check-btn");
const noResi = document.querySelector("#no-resi");
document.querySelector("#check-btn");
const namaPengirim = document.querySelector("#nama-pengirim");
const namaPenerima = document.querySelector("#nama-penerima");
const statusPengiriman = document.querySelector("#status-pengiriman");
const jenisLayanan = document.querySelector("#jenis-layanan");
const tanggalPengiriman = document.querySelector("#tanggal-pengiriman");
const cekResiInput = document.querySelector("#cek-resi");
const formCheckResi = document.querySelector("#form-cek-resi");
const cekResiError = document.querySelector("#cek-resi-error");

const templateError = (message) =>
  `<span class="text-xs text-primary">${message}</span>`;

const fetchData = async () => {
  const getData = await fetch(`${BASE_URL}/order/${cekResiInput.value}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await getData.json();
  return response.data;
};

formCheckResi.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log(cekResiInput.value)
  if (cekResiInput.value.trim() === "") {
    cekResiError.innerHTML = templateError("Cek resi tidak boleh kosong!");
    return;
  } else {
    cekResiError.innerHTML = ""
  }

  const data = await fetchData();
  receiptBox.classList.add("flex")
  receiptBox.classList.remove("hidden")

  noResi.innerHTML = data.nomor_resi
  namaPengirim.innerHTML = data.nama_pengirim
  namaPenerima.innerHTML = data.nama_penerima
  statusPengiriman.innerHTML = data.status
  jenisLayanan.innerHTML = data.jenis_layanan
  tanggalPengiriman.innerHTML = new Intl.DateTimeFormat("id-ID").format(new Date(data.tanggal_pengiriman))
});
