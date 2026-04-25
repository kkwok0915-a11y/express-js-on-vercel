import { createClient } from "@supabase/supabase-js";

import "dotenv/config";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.databaseEndpoint,
  process.env.databaseSecretKey,
);

export default supabase;
