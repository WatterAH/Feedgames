import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;

export const supabase = createClient(supabaseURL, supabaseKey);
