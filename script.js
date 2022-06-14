const express = require("express");
const User = require("../models/user");
const readline = require("linebyline");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const { success } = require("consola");

const uploadFileToServerStorage = (file, name, storage) => {
  return new Promise((resolve, reject) => {
    file.mv(`./uploads${storage}/${name}`, async (err, data) => {
      if (err) reject(err.message);
      else {
        success({ message: `${name} uploaded successfully`, badge: true });
        resolve();
      }
    });
  });
};
const treatFile = async (file) => {
  await uploadFileToServerStorage(file, file.name, "VCF");
  var FILE_USER_PATH = path.join(
    __dirname,
    "../uploadsCSV/",
    file.name.split(".")[0] + ".csv"
  );
  var FILE_CHROMO_USER_PATH = path.join(
    __dirname,
    "../uploadsVCF/",
    file.name.split(".")[0] + ".vcf"
  );

  function countFileLines(filePath) {
    return new Promise((resolve, reject) => {
      let lineCount = 0;
      fs.createReadStream(filePath)
        .on("data", (buffer) => {
          let idx = -1;
          lineCount--;
          do {
            idx = buffer.indexOf(10, idx + 1);
            lineCount++;
          } while (idx !== -1);
        })
        .on("end", () => {
          resolve(lineCount);
        })
        .on("error", reject);
    });
  }
  const fileSize = await countFileLines(FILE_CHROMO_USER_PATH, "utf8");
  const userdata = fs.readFileSync(FILE_USER_PATH).toLocaleString();
  const rows = userdata.split("\n"); // SPLIT ROWS
  const Barcode = rows[0].split(";")[1];
  const Name = rows[4].split(";")[1];
  const ID_Passport = rows[5].split(";")[1];
  const Nationality = rows[6].split(";")[1];
  const Gender = rows[7].split(";")[1];

  const Date = rows[8].split(";")[1];
  const Email_address = rows[9].split(";")[1];
  const Contact_number = rows[10].split(";")[1];
  const Physical_Address = rows[11].split(";")[1];
  const Country_of_Origin = rows[14].split(";")[1];

  const Medical_Questions = [
    {
      Do_you_drink_Alcohol: {
        You: rows[16].split(";")[1],
        Father: rows[16].split(";")[2],
        MOther: rows[16].split(";")[3],
      },
      Have_you_ever_smoked: {
        You: rows[17].split(";")[1],
        Father: rows[17].split(";")[2],
        MOther: rows[17].split(";")[3],
      },
      Do_you_currently_smoke: {
        You: rows[18].split(";")[1],
        Father: rows[18].split(";")[2],
        MOther: rows[18].split(";")[3],
      },
    },
  ];
  const Family_Cancer_History = [
    {
      Breast_cancer: {
        You: rows[26].split(";")[1],
        MOther: rows[26].split(";")[2],
        Father: rows[26].split(";")[3],
        Child: rows[26].split(";")[4],
      },
      Colon_rectal_colorectal_cancer: {
        You: rows[27].split(";")[1],
        MOther: rows[27].split(";")[2],
        Father: rows[27].split(";")[3],
        Child: rows[27].split(";")[4],
      },
      Female_reproductive_cancer: {
        You: rows[28].split(";")[1],
        MOther: rows[28].split(";")[2],
        Father: rows[28].split(";")[3],
        Child: rows[28].split(";")[4],
      },
      Liver_cancer: {
        You: rows[29].split(";")[1],
        MOther: rows[29].split(";")[2],
        Father: rows[29].split(";")[3],
        Child: rows[29].split(";")[4],
      },
      Lung_cancer: {
        You: rows[30].split(";")[1],
        MOther: rows[30].split(";")[2],
        Father: rows[30].split(";")[3],
        Child: rows[30].split(";")[4],
      },

      Pancreatic_cancer: {
        You: rows[31].split(";")[1],
        MOther: rows[31].split(";")[2],
        Father: rows[31].split(";")[3],
        Child: rows[31].split(";")[4],
      },
      Prostate_cancer: {
        You: rows[32].split(";")[1],
        MOther: rows[32].split(";")[2],
        Father: rows[32].split(";")[3],
        Child: rows[32].split(";")[4],
      },

      Skin_cancer: {
        You: rows[33].split(";")[1],
        MOther: rows[33].split(";")[2],
        Father: rows[33].split(";")[1],
        Child: rows[33].split(";")[1],
      },
    },
  ];

  const Reproductive_history = [
    {
      Polycystic_ovarian_syndrome: {
        You: rows[35].split(";")[1],
        MOther: rows[35].split(";")[2],
        Father: rows[35].split(";")[3],
        Child: rows[35].split(";")[4],
      },

      Endometriosis: {
        You: rows[36].split(";")[1],
        MOther: rows[36].split(";")[2],
        Father: rows[36].split(";")[3],
        Child: rows[36].split(";")[4],
      },
      Problems_falling_pregnant: {
        You: rows[37].split(";")[1],
        MOther: rows[37].split(";")[2],
        Father: rows[37].split(";")[3],
        Child: rows[37].split(";")[4],
      },
      Past_miscarriages: {
        You: rows[38].split(";")[1],
        MOther: rows[38].split(";")[2],
        Father: rows[38].split(";")[3],
        Child: rows[38].split(";")[4],
      },
      Currently_pregnant: {
        You: rows[39].split(";")[1],
        MOther: rows[39].split(";")[2],
        Father: rows[39].split(";")[3],
        Child: rows[39].split(";")[4],
      },
      Menopausal: {
        You: rows[40].split(";")[1],
        MOther: rows[40].split(";")[2],
        Father: rows[40].split(";")[3],
        Child: rows[40].split(";")[4],
      },
      Post_menopausal: {
        You: rows[41].split(";")[1],
        MOther: rows[41].split(";")[2],
        Father: rows[41].split(";")[3],
        Child: rows[41].split(";")[4],
      },
    },
  ];
  const Category1 = [
    {
      a1: rows[34].split(";")[1],
      b1: rows[34].split(";")[2],
      c1: rows[34].split(";")[3],
      d1: rows[34].split(";")[4],
    },
  ];
  const Category2 = [
    {
      a2: rows[34].split(";")[1],
      b2: rows[34].split(";")[2],
      c2: rows[34].split(";")[3],
      d2: rows[34].split(";")[1],
    },
  ];
  const Category3 = [
    {
      a3: rows[34].split(";")[1],
      b3: rows[34].split(";")[1],
      c3: rows[34].split(";")[1],
      d3: rows[34].split(";")[1],
    },
  ];
  const Category4 = [
    {
      a4: rows[34].split(";")[1],
      b4: rows[34].split(";")[1],
      c4: rows[34].split(";")[1],
      d4: rows[34].split(";")[1],
    },
  ];
  const Category5 = [
    {
      a5: rows[34].split(";")[1],
      b5: rows[34].split(";")[1],
      c5: rows[34].split(";")[1],
      d5: rows[34].split(";")[1],
    },
  ];
  const Category6 = [
    {
      a6: rows[34].split(";")[1],
      b6: rows[34].split(";")[1],
      c6: rows[34].split(";")[1],
      d6: rows[34].split(";")[1],
    },
  ];

  const Category7 = [
    {
      a7: rows[34].split(";")[1],
      b7: rows[34].split(";")[1],
      c7: rows[34].split(";")[1],
      d7: rows[34].split(";")[1],
    },
  ];
  const Category8 = [
    {
      a8: rows[34].split(";")[1],
      b8: rows[34].split(";")[1],
      c8: rows[34].split(";")[1],
      d8: rows[34].split(";")[1],
    },
  ];
  const Category9 = [
    {
      a9: rows[34].split(";")[1],
      b9: rows[34].split(";")[1],
      c9: rows[34].split(";")[1],
      d9: rows[34].split(";")[1],
    },
  ];
  const Category10 = [
    {
      a10: rows[34].split(";")[1],
      b10: rows[34].split(";")[1],
      c10: rows[34].split(";")[1],
      d10: rows[34].split(";")[1],
    },
  ];
  const Category11 = [
    {
      a11: rows[34].split(";")[1],
      b11: rows[34].split(";")[1],
      c11: rows[34].split(";")[1],
      d11: rows[34].split(";")[1],
    },
  ];
  const Category12 = [
    {
      a12: rows[34].split(";")[1],
      b12: rows[34].split(";")[1],
      c12: rows[34].split(";")[1],
      d12: rows[34].split(";")[1],
    },
  ];
  let user1 = await User.findOne({ Barcode });

  if (user1) {
    console.log(user1);
  } else {
    user1 = await User.create({
      Barcode,
      Name,
      ID_Passport,
      Nationality,
      Gender,
      Date,
      Email_address,
      Contact_number,
      Physical_Address,
      Country_of_Origin,
      Medical_Questions,
      Family_Cancer_History,
      Reproductive_history,
      Category1,
      Category2,
      Category3,
      Category4,
      Category5,
      Category6,
      Category7,
      Category8,
      Category9,
      Category10,
      Category11,
      Category12,
    });
  }

  let normalizedCase = {
    CASE00: [],
    CASE01: [],
    CASE11: [],
    CASENS: [],
  };
  rl = readline(FILE_CHROMO_USER_PATH);
  rl.on("line", async (line, lineCount, byteCount) => {
    const CASE00 = "0/0:[1-14]*";
    const CASE01 = "0/1:[1-14]*";
    const CASE11 = "1/1:[1-14]*";
    if (line.split("\t")[0][0] !== "#") {
      console.log(
        "Processing line number: ",
        lineCount,
        "of ",
        fileSize,
        "| ",
        ((lineCount / fileSize) * 100).toFixed(2),
        "%"
      );
      let qualityScore = line.split("\t")[9];
      if (qualityScore.match(CASE00)) {
        normalizedCase.CASE00.push({
          ID: line.split("\t")[2],
          POS: line.split("\t")[1],
          GénoType: line.split("\t")[3] + " | " + line.split("\t")[3],
          Barcode: user1.Barcode,
        });
      } else if (qualityScore.match(CASE01)) {
        normalizedCase.CASE01.push({
          ID: line.split("\t")[2],
          POS: line.split("\t")[1],
          GénoType: line.split("\t")[3] + " | " + line.split("\t")[4],
          Barcode: user1.Barcode,
        });
      } else if (qualityScore.match(CASE11)) {
        normalizedCase.CASE11.push({
          ID: line.split("\t")[2],
          POS: line.split("\t")[1],
          GénoType: line.split("\t")[4] + " | " + line.split("\t")[4],
          Barcode: user1.Barcode,
        });
      } else {
        normalizedCase.CASENS.push({
          POS: line.split("\t")[1],
        });
      }
    }
  })
    .on("error", function (e) {
      console.log("error: ", e);
      next(e);
    })
    .on("end", async function () {
      const DELAY = 40;
      function secondsToTime(e) {
        var h = Math.floor(e / 3600)
            .toString()
            .padStart(2, "0"),
          m = Math.floor((e % 3600) / 60)
            .toString()
            .padStart(2, "0"),
          s = Math.floor(e % 60)
            .toString()
            .padStart(2, "0");
        return h + ":" + m + ":" + s;
      }
      function writeToDatabase(CASEXX, type) {
        console.log(
          `Saving ${normalizedCase[CASEXX].length} items to ${CASEXX} Database`
        );
        for (let i = 1; i <= normalizedCase[CASEXX].length; i++) {
          setTimeout(async function () {
            success({
              message: `Progress: ${i} item of ${
                normalizedCase[CASEXX].length
              } || ${((i * 100) / normalizedCase[CASEXX].length).toFixed(
                1
              )} % || estimated time: ${secondsToTime(
                (DELAY * normalizedCase[CASEXX].length - DELAY * i) / 1000
              )}`,
              badge: true,
            });
            await AnalyseGenetique.create({
              Barcode_User: normalizedCase[CASEXX][i - 1].Barcode,
              ID: normalizedCase[CASEXX][i - 1].ID,
              POS: normalizedCase[CASEXX][i - 1].POS,
              GénoType: normalizedCase[CASEXX][i - 1].GénoType,
              TYPE: type,
            });
          }, DELAY * i);
        }
      }
      writeToDatabase("CASE00", 0);
      writeToDatabase("CASE01", 1);
      writeToDatabase("CASE11", 2);
      fs.unlinkSync(FILE_USER_PATH);
      fs.unlinkSync(FILE_CHROMO_USER_PATH);
    });
};

router.post("/analyse", async (req, res, next) => {
  if (!req.files) {
    res.send("File was not found");
  }

  const { file } = req.files;
  const responses = [];
  try {
    const execute = async (file, responses) => {
      let response;
      const fileName = file.name.split(".")[0];
      const fileExtension = file.name.split(".")[1];

      if (fileExtension === "csv") {
        if (
          fs.existsSync(
            path.join(__dirname, "../uploadsCSV/", fileName + ".csv")
          )
        ) {
          response = `Un fichier du même nom appelé ${file.name} existe déjà !`;
        } else {
          uploadFileToServerStorage(file, file.name, "CSV");
          response = `Téléchargement du fichier CSV appelé ${file.name} au serveur...`;
        }
      } else if (fileExtension === "vcf") {
        if (
          fs.existsSync(
            path.join(__dirname, "../uploadsVCF/", fileName + ".vcf")
          )
        ) {
          response = `Un fichier du même nom appelé ${file.name} existe déjà!`;
        } else {
          if (
            fs.existsSync(
              path.join(__dirname, "../uploadsCSV/", fileName + ".csv")
            )
          ) {
            treatFile(file);
            response = `En cours d'analyse ${file.name} les fichiers ont démarré avec succès`;
          } else {
            response = `Le fichier CSV n'a pas encore été téléchargé ! Veuillez le télécharger avant de télécharger le fichier VCF appelé${file.name}!`;
          }
        }
      } else {
        response = `Extension de fichier invalide ${file.name}! accepter uniquement CSV ou VCF`;
      }
      responses.push(response);
    };
    if (Array.isArray(file)) {
      for (const f of file) {
        execute(f, responses);
      }
    } else {
      execute(file, responses);
    }
    return res.json({ message: responses });
  } catch (error) {
    next(error);
  }
});

router.get("/dataUser", async (req, res) => {
  try {
    const results = await User.find();
    res.send(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/dataGT", async (req, res) => {
  try {
    const results = await AnalyseGenetique.find();
    res.send(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
