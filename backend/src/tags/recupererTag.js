const {ok, notFound} = require("aws-lambda-utils");
const DynamoDbBuilder = require("aws-sdk-fluent-builder").DynamoDbBuilder;
const dynamoDbRepository = new DynamoDbBuilder()
    .withKeyName("tag")
    .withTableName(process.env.TAGS_TABLE)
    .build();

module.exports.handler = async event => {
    const nomDuTag = event.pathParameters.id;
    const tag = await dynamoDbRepository.findById(nomDuTag);
    if (tag) {
        return ok(tag);
    }
    return notFound(`Tag '${nomDuTag}' inexistant`);
}
