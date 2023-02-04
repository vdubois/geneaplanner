import {DynamoDbRepository} from "aws-sdk-fluent-builder";

export class DynamoDbRepositoryInMemory implements DynamoDbRepository {
    private data = new Map();

    deleteByPartitionKey(partitionKeyValue: string): Promise<any> {
        this.data.delete(partitionKeyValue);
        return Promise.resolve();
    }

    // @ts-ignore
    deleteByPartitionKeyAndSortKey(partitionKeyValue: string, sortKeyValue: string): Promise<any> {
        this.data.delete(partitionKeyValue);
        return Promise.resolve();
    }

    findAllByPartitionKey(partitionKeyValue: string): Promise<Array<any>> {
        return this.data.get(partitionKeyValue);
    }

    findOneByPartitionKey(partitionKeyValue: string): Promise<any> {
        return this.data.get(partitionKeyValue);
    }

    // @ts-ignore
    findOneByPartitionKeyAndSortKey(partitionKeyValue: string, sortKeyValue: string): Promise<any> {
        return this.data.get(partitionKeyValue);
    }

    save(entity: object): Promise<any> {
        // @ts-ignore
        this.data.set(entity.partitionKey, entity)
        return Promise.resolve(entity);
    }

    // @ts-ignore
    saveAll(entities: Array<object>, byChunkOf?: number): Promise<void> {
        for (const entity of entities) {
            // @ts-ignore
            this.data.set(entity.partitionKey, entity)
        }
        return Promise.resolve();
    }
}
