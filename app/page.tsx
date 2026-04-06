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
            <div key={slip.id} className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              {/* Image Section */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                {slip.image_url ? (
                  <img 
                    src={slip.image_url} 
                    alt={slip.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300 italic text-sm">
                    No photo provided
                  </div>
                )}
                
                {/* Availability Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                  slip.is_available 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {slip.is_available ? '● Available Now' : '○ Rented'}
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{slip.name || 'Prime Slip'}</h3>
                    <p className="text-slate-400 text-sm font-medium mt-1 uppercase tracking-tighter italic">
                      {slip.location || 'Coastal Marina'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-slate-900">${slip.price || '0'}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">per month</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-6">
                  <button className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-slate-200">
                    Book Space
                  </button>
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
