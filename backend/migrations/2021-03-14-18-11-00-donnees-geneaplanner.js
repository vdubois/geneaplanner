const DynamoDBBuilder = require('aws-sdk-fluent-builder').DynamoDbBuilder;
const dynamoDBRepository = new DynamoDBBuilder()
    .createIfNotExists()
    .withTableName(`geneaplanner-${process.env.STAGE}-donnees`)
    .withPartitionKeyName("partitionKey")
    .build();

module.exports = {
    up: async () => {
        // Pour créer la table
        await dynamoDBRepository.findOneByPartitionKey('test');
    },
    down: async () => {

    }
}
