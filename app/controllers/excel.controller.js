var stream = require('stream');
// const { Customer_ } = require('../models/customer.model.js');
// var await = require('await')

const { Configs } = require('../config/db.config.js');
const { Customer } = require("../models/customer.model");
const { v4: uuidv4 } = require('uuid');
const excel = require('exceljs');

const readXlsxFile = require('read-excel-file/node');
const { fillphone } = require('../config/helper.js');
const Randomstring = require('randomstring');

exports.uploadFile = (req, res) => {

    try{
        let filePath = __basedir + "/uploads/" + req.file.filename;

        readXlsxFile(filePath).then(rows => {
            // `rows` is an array of rows
            // each row being an array of cells.   
            console.log(rows);
    
            // Remove Header ROW
            rows.shift();
            
            const customers = [];
    
            let length = rows.length;
    
            for(let i=0; i<length; i++){
                const ref = Randomstring.generate();
                let customer = {
                    nom: rows[i][1],
                    ref,
                    postnom: rows[i][2],
                    genre: rows[i][4],
                    password: rows[i][8],
                    isFake: rows[i][9],
                    phone: fillphone({phone:rows[i][10]}),
                }

                customers.push(customer)
                
                Customer.create({
                    nom: rows[i][1],
                    ref,
                    postnom: rows[i][2],
                    genre: rows[i][4],
                    password: rows[i][8],
                    isFake: rows[i][9],
                    phone: fillphone({phone:rows[i][10]}),
                })
                    .then(cust => {
                    if(cust instanceof Customer) customers.push(cust)
                    })
                    .catch(e => {
                    console.log(" Customer ", i, "Not saved !", e )
                    
                })
            }

            console.table(customers)
    
            return res.json({ status: 200, message: "Traitement en cours !" })
        });
    }catch(error){
        const result = {
            status: "fail",
            filename: req.file.originalname,
            message: "Upload Error! message = " + error.message
        }
        res.json(result);
    }
}

/** 
 * Upload multiple Excel Files
 *  
 * @param {*} req 
 * @param {*} res 
 */
exports.uploadMultipleFiles = async (req, res) => {
	const messages = [];

	for (const file of req.files) {
        try{
            let filePath = __basedir + "/uploads/" + file.filename;
            let rows = await readXlsxFile(filePath);
    
            // `rows` is an array of rows
            // each row being an array of cells.   
            console.log(rows);
    
            // Remove Header ROW
            rows.shift();
            
            const customers = [];
    
            let length = rows.length;
    
            for(let i=0; i<length; i++){
    
                let customer = {
                    id: rows[i][0],
                    name: rows[i][1],
                    address: rows[i][2],
                    age: rows[i][3]
                }
    
                customers.push(customer);
            }
    
            uploadResult = await Customer.bulkCreate(customers);
    
            // It will now wait for above Promise to be fulfilled and show the proper details
            console.log(uploadResult);
    
            if (!uploadResult){
                const result = {
                    status: "fail",
                    filename: file.originalname,				
                    message: "Can NOT upload Successfully",
                }
    
                messages.push(result);
            } else {
                const result = {
                    status: "ok",
                    filename: file.originalname,
                    message: "Upload Successfully!",
                }
                messages.push(result);
            }                   
        }catch(error){
            const result = {
                status: "fail",
                filename: file.originalname,				
                message: "Error -> " + error.message
            }

            messages.push(result);
        }
	}

	return res.json(messages);
}

exports.downloadFile = (req, res) => {
    Customer.findAll().then(objects => {
        var customers = [];
        let length = objects.length;

        for(let i=0; i<length; i++){
            let datavalues = objects[i].dataValues;
            let customer = {
                id: datavalues.id,
                name: datavalues.name,
                address: datavalues.address,
                age: datavalues.age
            } ;
            customers.push(customer);
        }

		console.log(customers);

        const jsonCustomers = JSON.parse(JSON.stringify(customers));

        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('Customers'); //creating worksheet

        worksheet.columns = [
            { header: 'Id', key: 'id', width: 10 },
            { header: 'Name', key: 'name', width: 30 },
            { header: 'Address', key: 'address', width: 30},
            { header: 'Age', key: 'age', width: 10, outlineLevel: 1}
        ];    

        // Add Array Rows
        worksheet.addRows(jsonCustomers);
    
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=' + 'customer.xlsx');

        return workbook.xlsx.write(res)
                .then(function() {
                    res.status(200).end();
                });
    });
}