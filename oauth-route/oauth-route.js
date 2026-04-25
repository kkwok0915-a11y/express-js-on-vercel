import express from "express";
import supabase from "./database.js";

const oauthRoute = express.Router();

// Define route for users to register their details into DB
oauthRoute.get('/auth/login', async (req, res) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github'
  });

  if (error) return res.status(500).json({ error: error.message });

  // Direct server-side redirect (Better than returning to frontend)
  res.redirect(data.url); 
});

// 2. The Callback Route
app.get('/auth/callback', async (req, res) => {
  const code = req.query.code;
  if (code) {
    // This swaps the temporary code for a session on the server
    await supabase.auth.exchangeCodeForSession(code);
  }
  // Now redirect the user back to your actual UI
  res.redirect('https://next-js-demo-lilac-one.vercel.app/dashboard');
});

export default oauthRoute;
