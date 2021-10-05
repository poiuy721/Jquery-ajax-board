const upload=require('../../server');
module.exports = (app) => {
    const boardSql=require("../config/queries.js");
  
    var router = require("express").Router();
  
    // Create
    //router.post("/", boardSql.createBoard);
    router.post("/",upload.single('userfile'), boardSql.createBoardWithImage);
  
    // Read all
    router.get("/", boardSql.findAllBoards);
  
    // Read single board
    router.get("/:id", boardSql.findOneBoard);
  
    // Update a board with id
    router.put("/:id",upload.single('editUserfile'), boardSql.updateBoard);
  
    // Delete a board with id
    router.delete("/:id", boardSql.deleteBoard);
  
    // Delete all board
    //router.delete("/", board.deleteAll);
  
    app.use("/restapi/board", router);
  };
