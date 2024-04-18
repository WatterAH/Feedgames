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
exports.readAllByIds = exports.getNotificationsById = exports.notify = void 0;
const connection_1 = require("./connection");
const notify = (userId, read, content, id_linked, text, type) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield connection_1.supabase.from("notify").insert([
        {
            id_user: userId,
            read,
            content,
            id_linked,
            text,
            type,
        },
    ]);
    return { error };
});
exports.notify = notify;
const getNotificationsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: notifications, error } = yield connection_1.supabase
        .from("notify")
        .select("*")
        .eq("id_user", id)
        .order("created_at", { ascending: false });
    return { notifications, error };
});
exports.getNotificationsById = getNotificationsById;
const readAllByIds = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield connection_1.supabase
        .from("notify")
        .update({ read: true })
        .in("id", ids);
    return { error };
});
exports.readAllByIds = readAllByIds;
