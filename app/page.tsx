import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: slips, error } = await supabase.from('slips').select('*')

  if (error) return <div className="p-10 text-red-500 font-sans">Error: {error.message}</div>

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Premium Navigation */}
      <nav className="bg-white border-b border-slate-200 px-8 py-5 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-blue-600 tracking-tighter uppercase italic">SellMySlip</span>
          </div>
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-600 transition-all shadow-md">
            List Your Slip
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8 md:p-12">
        <header className="mb-12">
          <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-4">
            Available <span className="text-blue-600">Dockage</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium">Showing {slips?.length || 0} verified listings in your area.</p>
        </header>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {slips?.map((slip) => (
            <div key={slip.id} className="group bg-white rounded-[2rem] border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              
              {/* Image / Placeholder Section */}
              <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                {slip.image_url ? (
                  <img 
                    src={slip.image_url} 
                    alt={slip.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200">
                    <span className="text-5xl mb-2 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all">🚤</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No Image Provided</span>
                  </div>
                )}
                
                {/* Type Badge (Sale vs Rent) */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                    slip.price > 2000 ? 'bg-orange-500 text-white' : 'bg-emerald-500 text-white'
                  }`}>
                    {slip.price > 2000 ? 'For Sale' : 'For Rent'}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                      {slip.name || 'Premium Boat Slip'}
                    </h3>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-tighter mt-1">
                      {slip.location || 'Coastal Region'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-slate-900 tracking-tighter">
                      ${Number(slip.price).toLocaleString()}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                      {slip.price > 2000 ? 'Total' : 'Monthly'}
                    </p>
                  </div>
                </div>

                <hr className="my-6 border-slate-100" />

                <button className="w-full bg-slate-50 text-slate-900 border border-slate-200 py-4 rounded-2xl font-bold group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 shadow-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
