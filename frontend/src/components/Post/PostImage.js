import React from "react";
export var PostImage = function (_a) {
    var publicUrl = _a.publicUrl, openModal = _a.openModal;
    var src = "https://zptrwdrgobouoriwsfoj.supabase.co/storage/v1/object/public/Images/images/".concat(publicUrl);
    return (React.createElement("img", { onClick: openModal, src: src, alt: "image", className: "rounded-md cursor-pointer" }));
};
