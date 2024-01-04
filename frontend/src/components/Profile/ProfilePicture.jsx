import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const ProfilePicture = () => {
  return (
    <section>
      <FontAwesomeIcon icon={faUser} className="h-24 md:h-32 lg:h-44" />
    </section>
  );
};
