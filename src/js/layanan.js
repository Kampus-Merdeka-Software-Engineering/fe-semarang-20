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

  if (isValid) {
    console.log(isValid)
    e.preventDefault();
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
      }),
    });

    const response = await sendData.json();
    if (response.code == 201) {
      alert(
        `${response.message} \n Nomor resi anda: ${response.data.nomor_resi}`
      );
      document.querySelector("#berat-barang-input").value = null;
      document.querySelector("#alamat-input").value = null;
      closeModal();
    }
  } else {
    e.preventDefault()
  }
};

btnOrders.forEach((btnOrder) => {
  price = +btnOrder.getAttribute("data-price");
  type = btnOrder.getAttribute("data-type");
  btnOrder.addEventListener("click", () => openModal());
});
modalClose.addEventListener("click", () => closeModal());

orderForm.addEventListener("submit", async (e) =>
  sendOrderData(e, { price, type })
);
