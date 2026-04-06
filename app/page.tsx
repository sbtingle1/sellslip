import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: slips, error } = await supabase.from('slips').select('*')

  if (error) return <div className="p-10 text-red-500">Database Error: {error.message}</div>

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12 text-slate-900">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black mb-2 tracking-tight">Marketplace</h1>
        <p className="text-slate-500 mb-10">Total Listings Found: {slips?.length || 0}</p>

        <div className="grid gap-6">
          {slips?.map((slip, index) => {
            // Safety Check: If the row exists, we force it to show something
            return (
              <div key={slip.id || index} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">
                      {slip.price > 2000 ? 'Sale' : 'Rent'}
                    </span>
                    <h2 className="text-2xl font-bold">{slip.name || 'Untitled Listing'}</h2>
                  </div>
                  <p className="text-slate-500 flex items-center gap-1">
                    <span className="text-lg">📍</span> {slip.location || 'Location Not Provided'}
                  </p>
                </div>

                <div className="text-left md:text-right min-w-[150px]">
                  <p className="text-3xl font-black text-slate-900">
                    ${slip.price ? Number(slip.price).toLocaleString() : '0'}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                    Status: {String(slip.is_available).toUpperCase()}
                  </p>
                </div>

                <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl border border-slate-100">
                  {slip.image_url ? '📸' : '⚓'}
                </div>
              </div>
            )
          })}
        </div>

        {(!slips || slips.length === 0) && (
          <div className="text-center p-20 border-4 border-dashed rounded-[40px] text-slate-300">
            No data returned from Supabase.
          </div>
        )}
      </div>
    </main>
  )
}
