const router = require("express").Router();
const rootPath = require("../utils/path");
const dp = require("../database/dp");

router.put("/upload/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.files) {
      return res.status(400).json({ message: "Upload Failed...!" });
    } else {
      const targetFile = req.files.file;
      const fileName = Date.now() + "_" + targetFile.name;
      const uploadPath = rootPath + "/public/image" + fileName;
      targetFile.mv(uploadPath, (err) => {
        if (err) {
          return res.status(400).json({ message: err });
        }
      });
      await dp.manyOrNone(`UPDATE users_table SET image=$1 WHERE id=$2`, [
        fileName,
        id,
      ]);
      return res.status(200).json({ message: "File Uplaod SucessFully" });
    }
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
});

router.get("/getProfile/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getUser = await dp.manyOrNone(
      `SELECT image FROM users_table WHERE id=$1`,
      [id]
    );
    const userProfile = getUser[0];
    return res.status(200).json({ userProfile });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.put("/removeProfile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    await dp.manyOrNone(`UPDATE users_table SET image=$2 WHERE id=$1`, [
      id,
      data,
    ]);
    return res.status(200).json({ userProfile: null });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
