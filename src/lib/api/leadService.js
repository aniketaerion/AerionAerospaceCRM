import supabase from '@/lib/supabase/supabaseClient.ts'; // adjust path to your setup

export async function upsertLead(leadData) {
  const { phone_number, email, created_at = new Date().toISOString() } = leadData;

  // 1. Check if a lead already exists with this phone or email
  const { data: existingLead, error: fetchError } = await supabase
    .from("leads")
    .select("*")
    .or(`phone_number.eq.${phone_number},email.eq.${email}`)
    .maybeSingle(); // returns null if no match

  if (fetchError) throw new Error("Fetch error: " + fetchError.message);

  // 2. If exists, check created_at to decide whether to update or ignore
  if (existingLead) {
    const existingTime = new Date(existingLead.created_at);
    const newTime = new Date(created_at);

    if (newTime > existingTime) {
      const { error: updateError } = await supabase
        .from("leads")
        .update({ ...leadData })
        .eq("id", existingLead.id);

      if (updateError) throw new Error("Update error: " + updateError.message);

      return { status: "updated", id: existingLead.id };
    } else {
      return { status: "ignored", reason: "Older duplicate" };
    }
  }

  // 3. No duplicate → insert
  const { data: inserted, error: insertError } = await supabase
    .from("leads")
    .insert([{ ...leadData, created_at }])
    .select()
    .single();

  if (insertError) throw new Error("Insert error: " + insertError.message);

  return { status: "inserted", id: inserted.id };
}
