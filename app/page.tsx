import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: slips, error } = await supabase.from('slips').select('*')

  if (error) return <div style={{ padding: '40px', color: 'red' }}>Error: {error.message}</div>

  return (
    <div style={{ backgroundColor: '#f1f5f9', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '30px', color: '#1e293b' }}>
          Current Listings <span style={{ fontSize: '18px', color: '#64748b' }}>({slips?.length})</span>
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
          {slips?.map((slip) => (
            <div key={slip.id} style={{ backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
              
              {/* Image Area */}
              <div style={{ height: '200px', backgroundColor: '#e2e8f0', position: 'relative' }}>
                {slip.image_url ? (
                  <img src={slip.image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                ) : (
                  <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>🚤</div>
                )}
                <div style={{ position: 'absolute', top: '15px', left: '15px', backgroundColor: slip.price > 2000 ? '#f97316' : '#10b981', color: 'white', padding: '4px 12px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {slip.price > 2000 ? 'Sale' : 'Rent'}
                </div>
              </div>

              {/* Text Area */}
              <div style={{ padding: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0', color: '#0f172a' }}>{slip.name || 'Boat Slip'}</h3>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: '0', fontSize: '22px', fontWeight: '900', color: '#2563eb' }}>${Number(slip.price).toLocaleString()}</p>
                    <p style={{ margin: '0', fontSize: '10px', color: '#94a3b8', fontWeight: 'bold' }}>{slip.price > 2000 ? 'TOTAL' : 'MONTHLY'}</p>
                  </div>
                </div>
                <p style={{ color: '#64748b', marginTop: '10px', fontSize: '14px' }}>📍 {slip.location}</p>
                <button style={{ width: '100%', marginTop: '20px', backgroundColor: '#1e293b', color: 'white', border: 'none', padding: '15px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
