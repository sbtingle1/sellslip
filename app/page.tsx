import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  
  // Fetching every single row from the table
  const { data: slips, error } = await supabase.from('slips').select('*')

  return (
    <main className="min-h-screen bg-slate-50 p-10 text-slate-900">
      <h1 className="text-3xl font-black mb-8 text-blue-600">Inventory Status</h1>
      
      {error && <div className="p-4 bg-red-100 text-red-600 rounded-lg mb-4">{error.message}</div>}

      <div className="grid gap-4">
        {slips?.map((slip) => (
          <div key={slip.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{slip.name || 'Untitled Slip'}</h2>
              <p className="text-slate-500 font-medium">{slip.location || 'No Location'}</p>
              <p className="text-xs font-mono text-slate-400 mt-2">ID: {slip.id}</p>
            </div>
            
            <div className="text-right">
              <p className="text-2xl font-black text-slate-900">${slip.price}</p>
              {/* DEBUG LABELS */}
              <div className="flex gap-2 mt-2 justify-end">
                <span className={`text-[10px] px-2 py-1 rounded font-bold ${slip.image_url ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  IMAGE: {slip.image_url ? 'YES' : 'NULL'}
                </span>
                <span className={`text-[10px] px-2 py-1 rounded font-bold ${slip.is_available ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                  AVAIL: {String(slip.is_available).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {slips?.length === 0 && (
        <div className="p-10 border-2 border-dashed border-slate-300 rounded-3xl text-center text-slate-400">
          No rows returned from database. Check RLS policies.
        </div>
      )}
    </main>
  )
}
