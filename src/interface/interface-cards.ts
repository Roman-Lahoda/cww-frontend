export interface ICards {
    _id: string,
    word: string,
    translation: string,
    description: string,
    set: string,
    synonyms: string,
    createdAt: string,
    updatedAt: string
    owner: string
}

export interface IData {
    code: number,
    status: string,
    cardData: ICards | ICards[]
}
