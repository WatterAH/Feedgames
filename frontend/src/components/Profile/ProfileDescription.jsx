import React from "react";

export const ProfileDescription = ({ userData }) => {
  const { details } = userData;
  return (
    <section>
      <p className="font-montserrat text-xs sm:text-sm md:text-base text-gray-600 mb-10">
        {details}
      </p>
    </section>
  );
};
