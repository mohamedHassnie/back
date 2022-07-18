const express = require("express");

//const readline = require("linebyline");
const readline = require("readline");
const fs = require("fs");
const util = require("util");
const path = require("path");
const router = express.Router();
AnalyseGenetique = require("../models/BaseNucleotide");
const userCsv = require("../models/UserCsv");
const log = require("../models/log");
//api const liste =
const { success } = require("consola");
const uploadFileToServerStorage = (file, name, storage) => {
  return new Promise((resolve, reject) => {
    file.mv(`./uploads${storage}/${name}`, (err, data) => {
      if (err) reject(err.message);
      else {
        success({ message: `${name} uploaded successfully`, badge: true });
        resolve();
      }
    });
  });
};
const treatFile = async (file) => {
  try {
    uploadFileToServerStorage(file, file.name, "VCF");
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

    let user = await userCsv.findOne({ Barcode });
    if (user) {
      console.log("user deja existe");
    } else {
      await userCsv.create({
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
      });
    }
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input: fs.createReadStream(FILE_CHROMO_USER_PATH),
        crlfDelay: Infinity,
      });
      let normalizedCase = {
        CASENS: [],
      };
      const CASE00 = new RegExp(/0\/0:[1-14]*/gm);
      const CASE01 = new RegExp(/0\/1:[1-14]*/gm);
      const CASE11 = new RegExp(/1\/1:[1-14]*/gm);
      const CASE12 = new RegExp(/.\/.:[1-14]*/gm);
      rl.on("error", reject);
      lineCount = 0;

      rl.on("line", async (line) => {
        lineCount++;

        if (line.split("\t")[0][0] !== "#") {
          // console.log("Processing line number: ", lineCount);
          let qualityScore = line.split("\t")[9];
          switch (true) {
            case CASE00.test(qualityScore):
              await AnalyseGenetique.create({
                Barcode: user._id,
                ID: line.split("\t")[2],
                POS: line.split("\t")[1],
                GénoType: line.split("\t")[3] + " | " + line.split("\t")[3],
                type: "00",
              });
            case CASE01.test(qualityScore):
              await AnalyseGenetique.create({
                Barcode: user._id,
                ID: line.split("\t")[2],
                POS: line.split("\t")[1],
                GénoType: line.split("\t")[3] + " | " + line.split("\t")[4],
                type: "01",
              });
            case CASE11.test(qualityScore):
              await AnalyseGenetique.create({
                Barcode: user._id,
                ID: line.split("\t")[2],
                POS: line.split("\t")[1],
                GénoType: line.split("\t")[4] + " | " + line.split("\t")[4],
                type: "11",
              });
            // break;
            //else if (qualityScore.match(CASE12))
            case CASE12.test(qualityScore):
              await AnalyseGenetique.create({
                // Barcode: user._id,
                ID: line.split("\t")[2],
                POS: line.split("\t")[1],
                GénoType: line.split("\t")[4] + " | " + line.split("\t")[4],
                type: "information invalid",
              });
            // break;
            default:
              normalizedCase.CASENS.push({
                POS: line.split("\t")[1],
              });
              break;
          }
        }
      });
      //  rl.on("pause", async function () {
      //     paused = true;
      //   });
      //   rl.on("resume", () => {
      //     paused = false;
      //   });
      //   rl.on("end", function () {
      //     console.log("end");
      //   });

      rl.on("close", function () {
        console.log("end ", file.name);
        resolve();
        fs.unlinkSync(FILE_USER_PATH);
        fs.unlinkSync(FILE_CHROMO_USER_PATH);
      });
      //pathFile
    });
  } catch (error) {
    throw Error;
    //console.log("error: ", error);
    // reject(error);
    // throw Error;
  }
};

router.post("/api/analyse", async (req, res, next) => {
  if (!req.files) {
    res.send("File was not found");
  }

  const { file } = req.files;
  const responses = [];
  try {
    const execute = async (file, responses) => {
      console.log(file, "execute file");
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
            newPath = log.create({
              path: "../uploadsCSV/",
              name: fileName,
              description: "new file",
            });
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
      // for (const f of file) {
      //   console.log("file f est :", f);
      //   await execute(f, responses);

      //  recursivté
      console.log(file.length);
      let i = file.length;
      console.log(file[0].name, "nchoufou i");
      const executeAll = async (file, i) => {
        console.log(i, "i f recusersive");
        if (i < 0) return null;
        else {
          await execute(file[i], responses).then(() => {
            executeAll(file, i - 1);
          });
        }
      };
      executeAll(file, i - 1);
    } else {
      await execute(file, responses);
    }
    return res.json({ message: responses });
  } catch (error) {
    next(error);
    throw error;
  }
});

router.get("/dataUser", (req, res) => {
  try {
    const results = userCsv.find();
    res.send(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/dataGT", (req, res) => {
  try {
    const results = AnalyseGenetique.find();
    res.send(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/api/getCount", async (req, res) => {
  try {
    const readdir = util.promisify(fs.readdir);
    const FILE_USER_PATH = path.join(__dirname, "../uploadsCSV/");
    const FILE_CHROMO_USER_PATH = path.join(__dirname, "../uploadsVCF/");

    let UserfileCSV = 0;
    let UserfileVCF = 0;
    const UserfileVCFRes = await readdir(FILE_CHROMO_USER_PATH);
    if (!UserfileVCFRes)
      throw new Error("Error while checking number of VCF files!");
    else UserfileVCF = UserfileVCFRes.length - 1;
    const UserfileCSVRes = await readdir(FILE_USER_PATH);
    if (!UserfileCSVRes)
      throw new Error("Error while checking number of CSV files!");
    else UserfileCSV = UserfileCSVRes.length - 1;

    data = { UserfileCSV, UserfileVCF };
    res.status(200).json(data);
  } catch (error) {
    err = res.json({ error: error.message });
  }
});

module.exports = router;
