export const dateAsString = ({day, month, year}) => {
    if (!day && !month) {
        return `en ${year.value ? year.value : year}`;
    }
    let mois;
    switch (month) {
        case 1: mois = 'janvier'; break;
        case 2: mois = 'février'; break;
        case 3: mois = 'mars'; break;
        case 4: mois = 'avril'; break;
        case 5: mois = 'mai'; break;
        case 6: mois = 'juin'; break;
        case 7: mois = 'juillet'; break;
        case 8: mois = 'août'; break;
        case 9: mois = 'septembre'; break;
        case 10: mois = 'octobre'; break;
        case 11: mois = 'novembre'; break;
        case 12: mois = 'décembre'; break;
    }
    if (!day && month) {
        return `en ${mois} ${year.value ? year.value : year}`;
    }
    return `le ${day} ${mois} ${year.value ? year.value : year}`;
};

export const dateAsShortString = ({day, month, year}) => {
    if (!day && !month) {
        return year.value ? year.value : year;
    }
    if (!day && month) {
        return `${month < 10 ? `0${month}` : month}/${year.value ? year.value : year}`;
    }
    return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year.value ? year.value : year}`;
};
