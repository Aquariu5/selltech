import {IData} from '../interfaces/Data';

export enum SortEnum {
    ID = 'id',
    POSITION = 'position',
    RELATION = 'relation'
}

export const sortArray = (sortVal: SortEnum) => {
    return function(item1: IData, item2: IData) {
        let value = 0;
        switch (sortVal) {
            case SortEnum.ID:
                value = item1.clientId - item2.clientId;
                break;
            case SortEnum.POSITION:
                if (item1.position < item2.position) {value =  -1;}
                if (item1.position > item2.position) {value =  1;}
                break;
            case SortEnum.RELATION:
                if (item1.relation < item2.relation) {value = -1;}
                if (item1.relation > item2.relation) {value = 1;}
                break;
            default:
                value = 0;
        }
        return value;
    }
}