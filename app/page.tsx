import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  
  // Fetch everything with no filters
  const { data: slips, error } = await supabase
    .from('slips')
    .select('*')

  return (
    <main className="p-10 font-mono text-xs">
      <h1 className="text-xl font-bold mb-4">Debug Mode: All Rows</h1>
      
      {error && <p className="text-red-500">Error: {error.message}</p>}

      <div className="space-y-8">
        {slips?.map((slip, index) => (
          <div key={index} className="border-b pb-4">
            <p><strong>Row #{index + 1}</strong></p>
            <p>Name: {slip.name}</p>
            <p>Location: {slip.location}</p>
            <p>Price: {slip.price}</p>
            <p>Image: {slip.image_url ? 'Link Present' : 'NULL/EMPTY'}</p>
          </div>
        ))}
      </div>

      {slips?.length === 0 && <p>The database returned 0 rows.</p>}
      
      <hr className="my-10" />
      <p className="text-slate-400">Total Count: {slips?.length || 0}</p>
    </main>
  )
}
