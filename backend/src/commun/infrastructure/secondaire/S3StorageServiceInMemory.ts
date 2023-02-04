export class S3StorageServiceInMemory {
    private fileMap = new Map();

    // @ts-ignore
    async copyFile(sourceFilePath: string, destinationFilePath: string): Promise<any> {

    }

    async deleteFile(filePath: string): Promise<any> {
        this.fileMap.delete(filePath);
    }

    async listFiles(predicate?: (file: any) => boolean): Promise<any> {
        // @ts-ignore
        return Array.from(this.fileMap, ([name, value]) => value).filter(predicate);
    }

    async readFile(filePath: string): Promise<any> {
        return this.fileMap.get(filePath);
    }

    async writeFile(filePath: string, fileContent: Buffer): Promise<any> {
        return this.fileMap.set(filePath, fileContent);
    }

}
