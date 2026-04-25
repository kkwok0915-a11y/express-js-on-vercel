import express from "express";
import supabase from "./database.js";

const dbRegistrationRouter = express.Router();

// Define route for users to register their details into DB
dbRegistrationRouter.post("/", async (req, res) => {
  // Get userEmail
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;
  const userName = req.body.userName;

  if (!userEmail || !userPassword) {
    return res.status(400).send({
      error: "Failed to create an user due to insufficient information",
    });
  }

  const { data, error } = await supabase.auth.signUp({
    email: userEmail,
    password: userPassword,
    options: userName ? { data: { fullName: userName } } : undefined,
  });

  if (error) {
    return res.status(400).send({ error: error });
  } else {
    return res.status(200).send(data);
  }
});

export default dbRegistrationRouter;
