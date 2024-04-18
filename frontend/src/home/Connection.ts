import { createClient } from "@supabase/supabase-js";

// @ts-ignore
const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
// @ts-ignore
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseURL, supabaseKey);
