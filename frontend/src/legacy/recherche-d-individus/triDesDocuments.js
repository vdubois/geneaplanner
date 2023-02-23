export const triDesDocuments = (document1, document2) => {
    const isNaissance = (doc) => doc.name.toLowerCase().includes("naissance");
    const isBapteme = (doc) => doc.name.toLowerCase().includes("bapteme");
    const isMariage = (doc) => doc.name.toLowerCase().includes("mariage") && !doc.name.toLowerCase().includes("publication");
    const isFiancailles = (doc) => doc.name.toLowerCase().includes("fiancailles") || doc.name.toLowerCase().includes("publication");
    const isDeces = (doc) => doc.name.toLowerCase().replaceAll("é", "e").replaceAll("è", "e").includes("deces");
    if (isNaissance(document1)
        && !isNaissance(document2)) {
        return -1;
    }
    if (isBapteme(document1)
        && isNaissance(document2)) {
        return 1;
    }
    if (isBapteme(document1)
        && !isBapteme(document2)) {
        return -1;
    }
    if (isFiancailles(document1)
        && (isNaissance(document2) || isBapteme(document2))) {
        return 1;
    }
    if (isFiancailles(document1)
        && (isMariage(document2) || isDeces(document2))) {
        return -1;
    }
    if (isMariage(document1)
        && (isNaissance(document2) || isBapteme(document2) || isFiancailles(document2))) {
        return 1;
    }
    if (isMariage(document1)
        && isDeces(document2)) {
        return -1;
    }
    if (isDeces(document1)
        && !isDeces(document2)) {
        return 1;
    }
    return 0;
}
