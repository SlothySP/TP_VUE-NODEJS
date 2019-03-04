const Calendrier = require("./classes/calendrier");
const Utilisateurs = require("./classes/utilisateurs");
const calendrier = new Calendrier();
const utilisateurs = new Utilisateurs();
const secret = "thisismysecret";

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

const jwtStrategy = new JwtStrategy(jwtOptions, function(payload, next) {
  const user = utilisateurs.getUser(payload.user);

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(jwtStrategy);

const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

app.use(cors({ credentials: true, origin: true }));

app.options("*", cors());

/*
Pour récupérer tous les evenements
 */
app.get("/events", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  res.setHeader("Content-Type", "application/json");
  res.send(calendrier.getAllEvent(req.user.id));
});

/*
Pour récupérer un evenement selon un id donné
 */
app.get(
  "/event/:id",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    let evenement = calendrier.getEvent(req.params.id, req.user.id);
    res.setHeader("Content-Type", "application/json");
    res.send(evenement);
  }
);

/*
Pour ajouter un evenement
 */
app.post(
  "/event",
  urlEncodedParser,
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    let nom = req.body.nom;
    let description = req.body.description;
    let dateDebut = req.body.dateDebut;
    let dateFin = req.body.dateFin;
    res.setHeader("Content-Type", "application/json");
    calendrier.addEvent(req.user.id, nom, description, dateDebut, dateFin);
    res.send(true);
  }
);

/*
Pour supprimer un evenement selon l'id passé
 */
app.post(
  "/delete-event",
  urlEncodedParser,
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    let id = req.body.id;
    let result = calendrier.deleteEvent(id, req.user.id);
    res.setHeader("Content-Type", "application/json");
    res.send(result);
  }
);

/*
Pour s'inscrire
 */
app.post("/inscription", urlEncodedParser, function(req, res) {
  res.setHeader("Content-Type", "application/json");
  const email = req.body.email;
  const mdp = req.body.mdp;

  if (!email || !mdp) {
    res.status(401).json({ error: "Email or password was not provided." });
    return;
  }

  const result = utilisateurs.addUser(email, mdp);
  res.send(result);
});

/*
Pour se connecter
 */
app.post("/login", urlEncodedParser, function(req, res) {
  const email = req.body.email;
  const mdp = req.body.mdp;

  if (!email || !mdp) {
    res.status(401).json({ error: "Email or password was not provided." });
    return;
  }

  const user = utilisateurs.getUser(email);

  if (!user || user.mdp !== mdp) {
    res.status(401).json({ error: "Email / password do not match." });
    return;
  }

  const userJwt = jwt.sign({ id: user.id, user: user.email }, secret);

  res.json({ jwt: userJwt, user });
});

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("API de calendrier lancée!");
});
