import React from "react";
// import { useHistory } from "react-router-dom";

function Logout() {
  // let history = useHistory();

  function logout() {
    localStorage.clear();
    window.open("/login", "_self");
    // history.push("/login");
  }

  return (
    <div className="text-center">
      <button
        type="button"
        className="btn btn-danger"
        onClick={() =>
          window.confirm("Are you sure you want to logout?") && logout()
        }
      >
        Logout{" "}
      </button>
    </div>
  );
}

export default Logout;
