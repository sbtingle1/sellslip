import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: slips, error } = await supabase.from('slips').select('*')

  return (
    <main className="min-h-screen bg-white p-10">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Direct Database View</h1>
      
      {error && <div className="p-4 bg-red-100 text-red-700 mb-4">{error.message}</div>}

      <div className="space-y-4">
        {slips?.map((slip) => (
          <div key={slip.id} className="p-6 border-2 border-slate-200 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-blue-500 transition-colors">
            
            {/* Left Side: Basic Info */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black uppercase bg-slate-100 px-2 py-1 rounded text-slate-500 tracking-tighter">
                  {slip.price > 5000 ? '💰 FOR SALE' : '⚓ FOR RENT'}
                </span>
                <h2 className="text-xl font-bold text-slate-900">{slip.name || "Unnamed Listing"}</h2>
              </div>
              <p className="text-slate-500 font-medium">{slip.location || "No Location Provided"}</p>
            </div>

            {/* Right Side: Price and Image Status */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-2xl font-black text-blue-600">${Number(slip.price).toLocaleString()}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {slip.image_url ? '✅ Image Link Found' : '❌ No Image URL'}
                </p>
              </div>
              
              {/* Mini Thumbnail or Anchor */}
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden border border-slate-100">
                {slip.image_url ? (
                   <img src={slip.image_url} className="w-full h-full object-cover" alt="" />
                ) : (
                   <span className="text-xl">⚓</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {(!slips || slips.length === 0) && (
        <p className="text-slate-400 italic">Database returned zero rows. Check your RLS policies.</p>
      )}
    </main>
  )
}
