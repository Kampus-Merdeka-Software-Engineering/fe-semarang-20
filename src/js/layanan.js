const BASE_URL = "https://be-semarang-20-production.up.railway.app/api";

// Modal
const modal = document.querySelector(".main-modal");
const btnOrders = document.querySelectorAll(".btn-order");
const orderForm = document.querySelector("#order-form");
const modalClose = document.querySelector("#modal-close");
let price, type;
modal.classList.remove("fadeIn");
modal.classList.add("fadeOut");
modal.classList.add("hidden");

const openModal = () => {
  modal.classList.remove("fadeOut");
  modal.classList.remove("hidden");
  modal.classList.add("fadeIn");
  modal.classList.add("flex");
  document.querySelector("body").classList.remove("overflow-auto");
  document.querySelector("body").classList.add("overflow-hidden");
};

const closeModal = () => {
  modal.classList.remove("fadeIn");
  modal.classList.add("fadeOut");
  modal.classList.add("hidden");
  document.querySelector("body").classList.add("overflow-auto");
  document.querySelector("body").classList.remove("overflow-hidden");
};

const templateError = (message) =>
  `<span class="text-xs text-primary">${message}</span>`;

const sendOrderData = async (e, { price, type }) => {
  let isValid = true;

  let beratBarangInput = document.querySelector("#berat-barang-input").value;
  const beratBarangError = document.querySelector("#berat-barang-error");

  if (isNaN(beratBarangInput) || parseInt(beratBarangInput) <= 0) {
    beratBarangError.innerHTML = templateError(
      "Berat barang harus berupa angka yang lebih dari 0"
    );
    isValid = false;
  } else {
    beratBarangError.innerHTML = "";
  }

  let alamatInput = document.querySelector("#alamat-input").value;
  const alamatError = document.querySelector("#alamat-error");

  if (alamatInput.trim() === "") {
    alamatError.innerHTML = templateError("Alamat tidak boleh kosong");
    isValid = false;
  } else {
    alamatError.innerHTML = "";
  }

  // Validate Nama Pengirim
  const namaPengirimInput = document.querySelector(
    "#nama-pengirim-input"
  ).value;
  const namaPengirimError = document.querySelector("#nama-pengirim-error");

  if (namaPengirimInput.trim() === "") {
    namaPengirimError.innerHTML = templateError(
      "Nama Pengirim tidak boleh kosong"
    );
    isValid = false;
  } else {
    namaPengirimError.innerHTML = "";
  }

  // Validate Nama Penerima
  const namaPenerimaInput = document.querySelector(
    "#nama-penerima-input"
  ).value;
  const namaPenerimaError = document.querySelector("#nama-penerima-error");

  if (namaPenerimaInput.trim() === "") {
    namaPenerimaError.innerHTML = templateError(
      "Nama Penerima tidak boleh kosong"
    );
    isValid = false;
  } else {
    namaPenerimaError.innerHTML = "";
  }

  // Validate Alamat Tujuan
  const alamatTujuanInput = document.querySelector(
    "#alamat-tujuan-input"
  ).value;
  const alamatTujuanError = document.querySelector("#alamat-tujuan-error");

  if (alamatTujuanInput.trim() === "") {
    alamatTujuanError.innerHTML = templateError(
      "Alamat Tujuan tidak boleh kosong"
    );
    isValid = false;
  } else {
    alamatTujuanError.innerHTML = "";
  }

  // Validate No Telepon
  const noTelponInput = document.querySelector("#no-telpon-input").value;
  const noTelponError = document.querySelector("#no-telpon-error");

  if (noTelponInput.trim() === "") {
    noTelponError.innerHTML = templateError("No Telepon tidak boleh kosong");
    isValid = false;
  } else {
    noTelponError.innerHTML = "";
  }

  if (isValid) {
    const sendData = await fetch(`${BASE_URL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jenis_layanan: type,
        berat_barang: +beratBarangInput,
        harga_pengiriman: price * +beratBarangInput,
        alamat: alamatInput,
        nama_pengirim: namaPengirimInput,
        nama_penerima: namaPenerimaInput,
        alamat_asal: alamatTujuanInput,
        no_telpon: noTelponInput,
      }),
    });

    const response = await sendData.json();
    if (response.code == 201) {
      alert(
        `${response.message} \n Nomor resi anda: ${response.data.nomor_resi}`
      );
      document.querySelector("#berat-barang-input").value = null;
      document.querySelector("#alamat-input").value = null;
      document.querySelector("#nama-pengirim-input").value = null;
      document.querySelector("#nama-penerima-input").value = null;
      document.querySelector("#alamat-tujuan-input").value = null;
      document.querySelector("#no-telpon-input").value = null;
      closeModal();
    }
  }
};

btnOrders.forEach((btnOrder) => {
  price = +btnOrder.getAttribute("data-price");
  type = btnOrder.getAttribute("data-type");
  btnOrder.addEventListener("click", () => openModal());
});
modalClose.addEventListener("click", () => closeModal());

orderForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  sendOrderData(e, { price, type });
});
