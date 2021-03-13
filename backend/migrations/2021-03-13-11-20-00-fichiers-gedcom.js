const S3Builder = require('aws-sdk-fluent-builder').S3Builder;
const espaceDeStockageDesFichiersGEDCOM = new S3Builder()
    .createIfNotExists()
    .withBucketName("geneaplanner-fichiers-gedcom")
    .asStorageService()
    .build();

module.exports = {
    up: async () => {
        // Pour créer le bucket
        await espaceDeStockageDesFichiersGEDCOM.listFiles();
    },
    down: async () => {

    }
}
