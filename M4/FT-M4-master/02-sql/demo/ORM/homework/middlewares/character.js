const { Router } = require("express");
const { UPSERT } = require("sequelize/types/query-types");
const { Op, Character, Role } = require("../db");
const { validatePost } = require("./util");
const router = Router();

// /character implicito
// router.get("/algo")

// localhost:xxxx/character/algo
router.post("/", async (req, res) => {
  // validación
  const error = validatePost(req.body);
  if (error) return res.status(404).send("Falta enviar datos obligatorios");

  //   Character.create({ ...req.body })
  //     .then((pj) => res.status(201).json(pj))
  //     .catch((err) =>
  //       res.status(404).send("Error en alguno de los datos provistos")
  //     );

  try {
    const pj = await Character.create({ ...req.body });
    if (pj) return res.status(201).json(pj);
  } catch (error) {
    return res.status(404).send("Error en alguno de los datos provistos");
  }
});

router.get("/", async (req, res) => {
  const { race } = req.query;
  // req.query --> {race: "algo", "name"=true, age:true}
  //   const arreglo = Object.keys(req.query)
  // ["race", "name", "age"]

  try {
    if (!race) {
      return res.status(200).json(await Character.findAll());
    } else {
      const filtro = await Character.findAll({
        where: { race },
        // attributes: arreglo,
      });
      if (filtro.length > 0) return res.status(200).json(filtro);
    }
  } catch (error) {
    return res.status(400).json({ err: error });
  }
});

router.get("/:code", (req, res) => {
  const { code } = req.params;

  if (!code)
    return res.status(400).json({ err: "Falta enviar code por params" });
  else {
    Character.findByPk(code)
      .then((pj) => res.status(200).json(pj))
      .catch((err) => res.status(400).json({ err }));
  }
});

// const {personaje} = req.body
// ... await User.update({...personaje})

module.exports = router;
