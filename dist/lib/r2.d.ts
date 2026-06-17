export declare const generatePresignedUrl: (key: string, contentType: string) => Promise<{
    presignedUrl: string;
    publicUrl: string;
    storageKey: string;
}>;
