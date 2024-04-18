"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProfile = void 0;
const connection_1 = require("./connection");
const editProfile = (id, username, name, details, pfp) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: user, error } = yield connection_1.supabase
        .from("users")
        .update({ username, name, details, pfp })
        .eq("id", id)
        .select("id, created_at, name, username, details")
        .single();
    return { user, error };
});
exports.editProfile = editProfile;
