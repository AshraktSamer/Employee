import express from "express"
import { EmployeeModel } from "../database/Employee"




 const getAllEmployee = async (req: express.Request, res: express.Response) : Promise<void> => {
    try {
        const employees = await EmployeeModel.find()
         res
            .status(200)
            .json({ status: ' success', data: employees })
    }
    catch (error) {
        console.log(error)
         res
            .status(400)
            .json({ status: 'failed', msg: " error occurred while fetching all empolyee" })

    }
}

export const getEmployee = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params
        const employee = await EmployeeModel.findById(id)
         res
            .status(200)
            .json({ status: ' success', data: employee })
    }
    catch (error) {
        console.log(error)
         res
            .status(400)
            .json({ status: 'failed', msg: " error occurred while getting the empolyee" })

    }
}


export const addNewEmployee = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { name, email, mobile, dob, doj } = req.body
        const NewEmployee = new EmployeeModel({
            name,
            email,
            mobile,
            dob,
            doj,
        })
        await NewEmployee.save()
         res
            .status(201)
            .json({ status: ' success', msg: ' employee created successfullly', data: NewEmployee })
    }
    catch (error) {
        console.log(error)
         res
            .status(400)
            .json({ status: 'failed', msg: " error occurred while creating new empolyee" })

    }
}

export const updateEmployee = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params
        const updateFields = { ...req.body }; // Only update fields provided in req.body
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate({_id : id},  { $set: updateFields }, { new: true })
        if (!updatedEmployee) {
             res.status(404).json({ status: 'failed', msg: "Employee not found" });
        }

         res
            .status(201)
            .json({ status: 'success', msg: ' employee updated successfullly', data: updatedEmployee })
    }
    catch (error) {
        console.log(error)
         res
            .status(400)
            .json({ status: 'failed', msg: " error occurred while updatig new empolyee" })

    }
}



export const deleteEmployee = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params
        const deletedEmployee = await EmployeeModel.findByIdAndDelete({_id : id})
        if (!deletedEmployee) {
             res.status(404).json({ status: 'failed', msg: "Employee not found" });
        }
         res
            .status(201)
            .json({ status: 'success', msg: ' employee deleted successfullly', data: deletedEmployee })
    }
    catch (error) {
        console.log(error)
         res
            .status(400)
            .json({ status: 'failed', msg: " error occurred while deleting new empolyee" })

    }
}

const employeeController = {
    getAllEmployee,
    getEmployee,
    addNewEmployee,
    updateEmployee,
    deleteEmployee
};

export default employeeController;
