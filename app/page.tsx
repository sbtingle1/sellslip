import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: slips, error } = await supabase.from('slips').select('*')

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600 tracking-tight">SellMySlip</span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            + List a Slip
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 md:p-10">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Current <span className="text-blue-600">Listings</span>
          </h1>
        </header>

        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8">{error.message}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {slips?.map((slip) => (
            <div key={slip.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
              
              {/* IMAGE SECTION */}
             {/* IMAGE SECTION - UPDATED */}
<div className="aspect-video bg-slate-100 relative flex items-center justify-center overflow-hidden">
  {slip.image_url && slip.image_url.trim().length > 0 ? (
    <img 
      src={slip.image_url} 
      alt={slip.name} 
      className="w-full h-full object-cover"
      onError={(e) => {
        // If the URL is broken, hide the image and show the fallback
        e.currentTarget.style.display = 'none';
        e.currentTarget.nextElementSibling?.classList.remove('hidden');
      }}
    />
  ) : null}
  
  {/* The Fallback - This shows if image_url is null, empty, or fails to load */}
  <div className={`text-center p-4 ${slip.image_url && slip.image_url.trim().length > 0 ? 'hidden' : ''}`}>
    <div className="text-3xl mb-1 text-slate-300">⚓</div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
      Photo Coming Soon
    </p>
  </div>

  {/* Status Badge */}
  <div className="absolute top-3 left-3">
    <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm ${
      String(slip.is_available).toLowerCase() === 'true' 
      ? 'bg-emerald-500 text-white' 
      : 'bg-slate-400 text-white'
    }`}>
      {String(slip.is_available).toLowerCase() === 'true' ? 'Available' : 'Unavailable'}
    </span>
  </div>
</div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{slip.name || 'Boat Slip'}</h3>
                  <div className="text-right">
                    <p className="text-xl font-black text-blue-600">${slip.price?.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      {slip.price < 2000 ? 'per month' : 'total price'}
                    </p>
                  </div>
                </div>
                
                <p className="text-slate-500 text-sm mb-6 flex items-center capitalize">
                  <svg className="w-4 h-4 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {slip.location || 'Florida'}
                </p>

                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
