export interface Update {
    id: number,
    idUser: number,
    userLastName: string,
    userFirstName: string,
    date: Date,
    idCategory: number,
    titleFr: string,
    contentFr: string,
    titleEn: string,
    contentEn: string,
    titleNl: string,
    contentNl: string,
    pictures: Picture
}

export interface Picture {
    id: number,
    name_picture: string
}
