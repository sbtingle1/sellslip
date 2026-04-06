import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: slips, error } = await supabase.from('slips').select('*')

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-2xl font-black text-blue-600 tracking-tighter uppercase">SellMySlip</span>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400 font-mono hidden md:block">UID: {slips?.[0]?.user_id?.slice(0,8) || 'No User'}</span>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
              + List Slip
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 md:p-10">
        <header className="mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-3">
            Explore <span className="text-blue-600">Dockage</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl">Find verified boat slips, docks, and moorings for your vessel.</p>
        </header>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-xl mb-8 shadow-sm">
            <p className="font-bold">Database Error</p>
            <p className="text-sm">{error.message}</p>
          </div>
        )}

        {/* The Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
  {slips?.map((slip) => (
    <div key={slip.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Image Section */}
      <div className="aspect-[16/9] bg-slate-100 relative">
        {slip.image_url ? (
          <img 
            src={slip.image_url} 
            alt="Slip" 
            className="w-full h-full object-cover"
            onError={(e) => {
              // If the URL is broken, show a message
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = '<div class="p-4 text-xs text-red-400 text-center">Image URL failed to load</div>';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">
            No image_url found
          </div>
        )}

        {/* Availability Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold bg-white shadow-sm border border-slate-100">
          {slip.is_available === true ? '✅ Available' : '❌ Not Available'}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{slip.name || 'Untitled'}</h3>
        <p className="text-blue-600 font-bold text-lg">${slip.price || '0'}</p>
        
        {/* --- DATA DEBUGGER (Remove this once it works) --- */}
        <div className="mt-6 pt-4 border-t border-dashed border-slate-100">
          <p className="text-[10px] font-black text-slate-300 uppercase mb-2">Database Debugger</p>
          <ul className="text-[10px] font-mono text-slate-500 space-y-1">
            <li><span className="text-slate-400">image_url:</span> {slip.image_url ? 'Has Value' : 'Empty'}</li>
            <li><span className="text-slate-400">is_available:</span> {String(slip.is_available)}</li>
            <li><span className="text-slate-400">user_id:</span> {slip.user_id ? 'Present' : 'Missing'}</li>
          </ul>
        </div>
      </div>
    </div>
  ))}
</div>

        {(!slips || slips.length === 0) && (
          <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-slate-200">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
               <span className="text-4xl text-slate-300">⚓</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">No listings found</h3>
            <p className="text-slate-400 mt-2">Start by adding your first boat slip to the database.</p>
          </div>
        )}
      </div>
    </main>
  )
}
