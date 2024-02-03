import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const ProfileActions = () => {
  return (
    <section className="flex flex-col sm:flex-row gap-10 items-start">
      <button>
        <FontAwesomeIcon className="h-10 text-emerald-400" icon={faPlus} />
      </button>
      <button>
        <FontAwesomeIcon className="h-10 text-red-400" icon={faFlag} />
      </button>
    </section>
  );
};
