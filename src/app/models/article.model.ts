import { Picture } from "./picture.model";

export interface Article{
    id: number,
    idUser: number,
    userLastName: string,
    userFirstName: string,
    date: Date,
    idCategory: number,
    title: string,
    content: string,
    pictures: Picture[],
}