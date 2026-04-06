'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [slips, setSlips] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  // 1. Fetch data from Supabase
  const fetchSlips = async () => {
    const { data } = await supabase.from('slips').select('*');
    if (data) setSlips(data);
  };

  // 2. Auth Listener & Initial Session Check
  useEffect(() => {
    fetchSlips();

    // Check session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for sign-in/out events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 3. Auth Actions
  const handleSignUp = async () => {
    const email = prompt("Enter your email:");
    const password = prompt("Enter a password:");
    if (email && password) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert(error.message);
      else alert("Check your email for a confirmation link!");
    }
  };

  const handleSignIn = async () => {
    const email = prompt("Enter your email:");
    const password = prompt("Enter your password:");
    if (email && password) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  // 4. Create Listing Action
  const handleAddSlip = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert("You must be logged in to post a listing.");
      return;
    }

    const { error } = await supabase
      .from('slips')
      .insert([
        { 
          location, 
          price: parseInt(price), 
          description, 
          owner_id: user.id 
        }
      ]);

    if (error) {
      alert(error.message);
    } else {
      setLocation('');
      setPrice('');
      setDescription('');
      fetchSlips();
    }
  };

  return (
    <main style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
    <h1 className="text-8xl font-black text-blue-600 bg-slate-100 p-20 text-center uppercase tracking-tighter">
  V4 Active
</h1>

      {/* --- AUTH HEADER --- */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '15px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ fontSize: '14px', color: '#64748b' }}>
          {user ? `Logged in as: ${user.email}` : "Not logged in"}
        </div>
        <div>
          {!user ? (
            <>
              <button onClick={handleSignIn} style={{ marginRight: '10px', padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer' }}>Sign In</button>
              <button onClick={handleSignUp} style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', backgroundColor: '#3b82f6', color: 'white', cursor: 'pointer' }}>Sign Up</button>
            </>
          ) : (
            <button onClick={handleSignOut} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #ef4444', color: '#ef4444', cursor: 'pointer' }}>Sign Out</button>
          )}
        </div>
      </header>

      {/* --- FORM SECTION --- */}
      <section style={{ marginBottom: '40px', padding: '20px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginTop: 0 }}>List a New Boat Slip</h3>
        <form onSubmit={handleAddSlip} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input placeholder="Location (e.g. Miami Marina, FL)" value={location} onChange={(e) => setLocation(e.target.value)} required style={{ padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          <input placeholder="Price (USD)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          <input placeholder="Status (e.g. Rent or For Sale)" value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          <button type="submit" disabled={!user} style={{ padding: '12px', backgroundColor: user ? '#3b82f6' : '#94a3b8', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: user ? 'pointer' : 'not-allowed' }}>
            {user ? 'Post Listing' : 'Login to Post'}
          </button>
        </form>
      </section>

      <hr style={{ border: '0', borderTop: '1px solid #e2e8f0', margin: '40px 0' }} />

      {/* --- LISTINGS DISPLAY --- */}
      <h2 style={{ color: '#1e293b' }}>Current Listings</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {slips.length > 0 ? (
          slips.map((slip) => (
            <div key={slip.id} style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', backgroundColor: 'white', color: '#1e293b' }}>
              <span style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 'bold', textTransform: 'uppercase' }}>
                {slip.description || 'Listing'}
              </span>
              <h3 style={{ margin: '10px 0', fontSize: '1.25rem', color: '#0f172a' }}>{slip.location}</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', margin: '0' }}>
                ${slip.price}
              </p>
            </div>
          ))
        ) : (
          <p>No slips found. Use the form above to add one!</p>
        )}
      </div>
    </main>
  );
}
