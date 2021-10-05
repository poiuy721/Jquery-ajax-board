const Pool=require('pg').Pool
const pool= new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1234',
    port: 5432,
})
const fs=require('fs');
const ejs=require('ejs');


const findAllBoards=(req,res)=>{
    pool.query('SELECT * FROM boards',(error,results)=>{
        if(error){
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const findOneBoard=(req,res)=>{
    const id=parseInt(req.params.id)
        pool.query('SELECT * FROM boards WHERE id=$1',[id],(error,results)=>{
            if(error){
                throw error
            }
            res.status(200).json(results.rows)
        })
    }


const createBoard=(req,res)=>{
    const {title, content}=req.body

    pool.query('INSERT INTO boards (title, content,"createdAt"=now(),"updatedAt"=now()) VALUES ($1,$2)',[title,content],(error,results)=>{
        if(error){
            throw error
        }
        res.status(201).send(`board created`)
    })
}

const createBoardWithImage=(req,res)=>{
    
    const {rTitle, rContent}=req.body
    const {filename}=req.file
    pool.query('INSERT INTO boards (title, content, image,"createdAt","updatedAt") VALUES ($1,$2,$3,now(),now())',[rTitle,rContent,filename],(error,results)=>{
        if(error){
            throw error
        }
        res.status(201).send(`board created`)
    })
}

const updateBoard=(req,res)=>{
    const id=parseInt(req.params.id)
    const {title,content}=req.body
    const {filename}=req.file

    console.log(id);
    pool.query(
        `UPDATE boards SET title=$1, content=$2, image=$3, "updatedAt"=now() WHERE id=$4`,
        [title,content,filename,id],(error,results)=>{
            if(error){
                throw error
            }
            res.status(200).send(`Board modified with ID: ${id}`)
        }
    )
}

const deleteBoard =(req,res)=>{
    const id=parseInt(req.params.id)
    pool.query('DELETE FROM boards WHERE id=$1',[id],(error,results)=>{
        if(error){
            throw error
        }
        res.status(200).send(`Board deleted with ID: ${id}`)

    })
}

module.exports={
    createBoard,
    createBoardWithImage,
    findAllBoards,
    findOneBoard,
    updateBoard,
    deleteBoard,
}