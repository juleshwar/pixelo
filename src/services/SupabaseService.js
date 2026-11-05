import { createClient } from "@supabase/supabase-js";

// The anon key is public by design: row-level security in supabase/schema.sql limits what it can do.
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

async function fetchPresetDrawings() {
  const { data, error } = await supabase
    .from("preset_drawings")
    .select("template")
    .order("id");
  if (error) throw error;
  return data.map((row) => row.template);
}

async function postPresetDrawing({ name, template }) {
  const { error } = await supabase
    .from("preset_drawings")
    .insert({ name, template });
  if (error) throw error;
}

export { fetchPresetDrawings, postPresetDrawing };
