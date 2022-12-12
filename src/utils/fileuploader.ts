import multer from "multer"
import fs from "fs"
if(!fs.existsSync("Products"))fs.mkdirSync("Products")
// if(!fs.existsSync("pro"))fs.mkdirSync("pro")
let storefile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Products/')
    },
    filename: (req, file, cb) => {
        const uniquename = `${Date.now()}_${file.originalname}`;
        cb(null, uniquename);
    }
})
export let uploadthing = multer({
    storage: storefile,
    // limits: { fileSize: 1000000 * 20 }
}).array('productimages');

// const storproject = multer.diskStorage({
//     destination: (req, file, cb) => {
//         console.log("here is from the destanation",req.files)
//         cb(null, 'pro/')
//     },
//     filename: (req, file, cb) => {
//         console.log(file)
//         const uniquename = `${Date.now()}_${file.originalname}`;
//         cb(null, uniquename);
//     }
// })
// export const projectfiles = multer({
//     storage: storproject,
//     // limits: { fileSize: 1000000 * 20 }
// }).array('requiredprojectfiles');
