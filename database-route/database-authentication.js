import express from "express";
import supabase from "./database.js";

const dbAuthRouter = express.Router();

// Define route for users to register their details into DB
dbAuthRouter.post("/", async (req, res) => {
  // Get userEmail
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;

  if (!userEmail || !userPassword) {
    return res.status(400).send({
      error: "Failed to create an user due to insufficient information",
    });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: userEmail,
    password: userPassword,
  });

  if (error) {
    return res.status(400).send({ error: error });
  } else {
    return res.status(200).send(data);
  }
});

export default dbAuthRouter;
