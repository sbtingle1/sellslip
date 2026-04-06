import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  // 1. Connect to Supabase
  const supabase = await createClient()
  
  // 2. Fetch the data from your "slips" table
  const { data: slips, error } = await supabase
    .from('slips')
    .select('*')

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Navigation Bar */}
      <nav className="border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600 tracking-tight">SellMySlip</span>
          <div className="space-x-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600 transition">Browse Slips</a>
            <a href="#" className="hover:text-blue-600 transition">List Your Slip</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-10">
        <header className="mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            Current <span className="text-blue-600">Boat Slips</span>
          </h1>
          <p className="text-lg text-slate-600">
            Real-time listings fetched directly from your database.
          </p>
        </header>
        
        {/* Error Handling */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm">
            <strong>Database Error:</strong> {error.message}
          </div>
        )}

        {/* The Data Display */}
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-inner">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Raw Database Output</h3>
          <pre className="text-sm font-mono text-slate-700 whitespace-pre-wrap">
            {slips && slips.length > 0 
              ? JSON.stringify(slips, null, 2) 
              : "Connection successful, but no data found. Add some rows to your 'slips' table in Supabase!"}
          </pre>
        </div>
      </div>
    </main>
  )
}
