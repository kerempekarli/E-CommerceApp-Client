import React from "react";
import { connect } from "react-redux";
import { openModal, closeModal } from "../../stores/modal/modalSlice";
import CheckoutForm from "../../components/stripeContainer";
const Modal = ({ modal, openModal, closeModal }) => {
  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div>
      {modal && (
        <div className="fixed inset-0 items-center justify-center z-10">
          <div className=" absolute -z-10 bg-slate-500 opacity-50 inset-0"></div>
          <div className="modal z-50 bg-white rounded-lg p-6">
            <CheckoutForm className="z-40"></CheckoutForm>{" "}
            <button
              onClick={handleCloseModal}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

const mapDispatchToProps = {
  openModal,
  closeModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
