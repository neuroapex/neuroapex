import React from "react";

function Caret() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-caret-down fill-current stroke-current"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      style={{ height: "100%", width: "auto" }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 15l-6 -6l-6 6h12" transform="rotate(180 12 12)" />
    </svg>
  );
}

export default Caret;
