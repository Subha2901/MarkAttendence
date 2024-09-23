import React, { useState } from "react";

export default function AlertModal() {
  const [alertTitle, setAlertTitle] = useState();
  const [alertMessage, setAlertMessage] = useState();
  return (
    <div>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        id="ApproveModalLauncher"
        style={{border: '0px', padding: '0px'}}
        onClick={() => {
          setAlertTitle("Can't be Approved");
          setAlertMessage(
            "Approved and Rejected dates can't be approved again. Please choose only pending dates to approve."
          );
        }}
      ></button>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        id="RejectModalLauncher"
        style={{border: '0px', padding: '0px'}}
        onClick={() => {
          setAlertTitle("Can't be Rejected");
          setAlertMessage(
            "Approved and Rejected dates can't be rejected again. Please choose only pending dates to reject."
          );
        }}
      ></button>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        id="DeleteModalLauncher"
        style={{border: '0px', padding: '0px'}}
        onClick={() => {
          setAlertTitle("Can't be Deleted");
          setAlertMessage(
            "Approved  dates can't be deleted. Please choose only pending and rejected dates to delete."
          );
        }}
      ></button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Not Approved!
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{alertMessage}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
