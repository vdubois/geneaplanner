const {ok} = require("aws-lambda-utils");
const DynamoDbBuilder = require("aws-sdk-fluent-builder").DynamoDbBuilder;
const dynamoDbRepository = new DynamoDbBuilder()
    .withKeyName("tag")
    .withTableName(process.env.TAGS_TABLE)
    .build();

module.exports.handler = async () => {
    const tags = await dynamoDbRepository.findAll();
    return ok(tags);
}
