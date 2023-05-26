import { Picture } from "./picture.model";

export interface Album {
    albumId: number;
    userId: number;
    userLastName: string;
    userFirstName: string;
    date: Date;
    title: string;
    pictures: Picture [];
}