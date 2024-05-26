import { log } from "console";
import { Request, Response } from "express";
import { auditModel } from "../model/user";

export async function addUser(req: Request, res: Response){
    try {
        const data = req.body;
        await auditModel.create(data);
        res.status(200).send("Logged in");
    } catch (error) {
        log(error)
        res.status(404).send("Login Failed!");
    }
}

export async function getUserDetails(req: Request, res: Response){
    try {
        const id = req.params.id;
        const data = await auditModel.find({mobile: parseInt(id)});
        res.send(data)
    } catch (error) {
        log(error);
        res.send("Error getting data")
    }
}

export async function getAll(req: Request, res: Response){
    try {
        const data = await auditModel.find();
        res.send(data);
    } catch (error) {
        log(error);
        res.send("Error getting all data");
    }
}