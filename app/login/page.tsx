import { login, signup } from './actions'

interface Props {
  searchParams: Promise<{ error?: string; message?: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  const { error, message } = await searchParams

  return (
    <div style={{ backgroundColor: '#f1f5f9', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', width: '100%', maxWidth: '420px' }}>
        
        <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b', marginBottom: '8px', textAlign: 'center' }}>Welcome to SellSlip</h2>
        <p style={{ color: '#64748b', fontSize: '14px', textAlign: 'center', marginBottom: '30px' }}>Sign in or create an account to view and post slips</p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="email" style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase', marginBottom: '6px' }}>Email Address</label>
            <input id="email" name="email" type="email" required style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} placeholder="you@example.com" />
          </div>

          <div>
            <label htmlFor="password" style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase', marginBottom: '6px' }}>Password</label>
            <input id="password" name="password" type="password" required style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} placeholder="••••••••" />
          </div>

          {error && (
            <div style={{ backgroundColor: '#fef2f2', color: '#dc2626', padding: '12px', borderRadius: '8px', fontSize: '13px', border: '1px solid #fee2e2' }}>
              ❌ {error}
            </div>
          )}

          {message && (
            <div style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '12px', borderRadius: '8px', fontSize: '13px', border: '1px solid #dcfce7' }}>
              ✨ {message}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
            <button formAction={login} style={{ width: '100%', backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
              Log In
            </button>
            <button formAction={signup} style={{ width: '100%', backgroundColor: '#e2e8f0', color: '#1e293b', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
