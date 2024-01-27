import React from "react";
import { Tag } from "./Tag";
export var TagsList = function (_a) {
    var data = _a.data;
    var tags = data.tags;
    return (React.createElement("section", { className: "flex flex-wrap gap-2" }, tags.map(function (tag, index) { return (React.createElement(Tag, { text: tag, key: index })); })));
};
