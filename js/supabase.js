let clientPromise;

export async function getSupabase() {
  if (!clientPromise) {
    clientPromise = fetch('/api/config')
      .then((response) => {
        if (!response.ok) throw new Error('Configuration Supabase indisponible');
        return response.json();
      })
      .then(({ url, key }) => {
        if (!url || !key) throw new Error('Variables Supabase manquantes');
        return window.supabase.createClient(url, key);
      });
  }
  return clientPromise;
}

export async function getProfile() {
  const supabase = await getSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null, profile: null };
  const { data: profile } = await supabase.from('profiles').select('id, full_name, role, created_at').eq('id', user.id).maybeSingle();
  return { supabase, user, profile };
}
