import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: slips, error } = await supabase.from('slips').select('*')

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Boat Slip Listings</h1>
      
      {error && <p className="text-red-500">{error.message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slips?.map((slip) => (
          <div key={slip.id} className="bg-white border rounded-xl overflow-hidden shadow-sm">
            
            {/* SIMPLIFIED IMAGE LOGIC */}
            <div className="aspect-video bg-slate-200 flex items-center justify-center">
              {slip.image_url && slip.image_url.startsWith('http') ? (
                <img 
                  src={slip.image_url} 
                  alt="Boat Slip" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <span className="text-4xl">⚓</span>
                  <p className="text-slate-500 font-bold text-xs mt-2">NO IMAGE DATA</p>
                  <p className="text-[10px] text-slate-400 font-mono">Value: {JSON.stringify(slip.image_url)}</p>
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{slip.name || 'Unnamed'}</h2>
                <span className="text-blue-600 font-black">${slip.price}</span>
              </div>
              <p className="text-slate-500">{slip.location}</p>
              
              {/* STATUS CHECK */}
              <div className="mt-4 pt-4 border-t text-[10px] font-mono text-slate-400">
                Status: {slip.is_available ? 'TRUE (Available)' : 'FALSE (Unavailable)'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
